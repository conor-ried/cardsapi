import React, { useState, useEffect } from "react";
import Card from "./Card";

const Deck = () => {
  const [deckId, setDeckId] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    fetchNewDeck();
  }, []);

  const fetchNewDeck = async () => {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await response.json();
    setDeckId(data.deck_id);
    setRemaining(data.remaining);
  };

  const drawCard = async () => {
    if (remaining === 0) {
      alert("Error: no cards remaining!");
      return;
    }

    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();
    setCurrentCard(data.cards[0]);
    setRemaining(data.remaining);
  };

  const startDrawing = () => {
    setIsDrawing(true);
    setTimerId(setInterval(drawCard, 1000));
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    clearInterval(timerId);
  };

  return (
    <div>
      {currentCard && <Card card={currentCard} />}
      {remaining > 0 ? (
        <button onClick={isDrawing ? stopDrawing : startDrawing}>
          {isDrawing ? "Stop drawing" : "Start drawing"}
        </button>
      ) : (
        <button disabled>No cards remaining</button>
      )}
    </div>
  );
};

export default Deck;