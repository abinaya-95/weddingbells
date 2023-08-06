import "./SingleCard.css";
import React, { Component } from 'react';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }
    return (
        <div key={card.id} className="card">
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} className="front" alt='card front' />
                <img src="image/cover-1.jpg" alt='card back' className='back'
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}