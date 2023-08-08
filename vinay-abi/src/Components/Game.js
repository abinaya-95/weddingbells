import './Game.css';
import React from 'react';
import { useEffect, useState } from 'react';
import SingleCard from './SingleCard'

const cardImages = [
    { "src": "/image/bat-1.png", matched: false },
    { "src": "/image/chocolate-1.jpg", matched: false },
    { "src": "/image/game-1.jpg", matched: false },
    { "src": "/image/harry-1.jpg", matched: false }
  ];
  

export default function Game(){
    const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [matchcounter, setMatchcounter] = useState(0);
  const [pagenum, setpagenum] = useState(1)

    // shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
    
          .sort(() => Math.random() - 0.5)
          .map((card) => ({ ...card, id: Math.random() }))
    
        setCards(shuffledCards)
      }
    
      // handle a selected card
    
      const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
      }
    
      //comapre the selected cards
      useEffect(() => {
        if (choiceOne && choiceTwo) {
          setDisabled(true)
          if (choiceOne.src === choiceTwo.src) {
            setCards(prevCards => {
              return prevCards.map(card => {
                if (card.src === choiceOne.src) {
                  setMatchcounter(matchcounter + 1)
                  return { ...card, matched: true }
                }
                else {
                  return card
                }
              })
            })
            setTimeout(() => resetState(), 1000)
          }
          else {
            setTimeout(() => resetState(), 1000)
          }
        }
      }, [choiceOne, choiceTwo])
    
      // reset the usestates
    
      const resetState = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
      }
      return(
        <div>
                    <button className='game' onClick={shuffleCards}>Lets Go</button>
            {matchcounter < 4 ? <div>
        <div id='card-grid'>
          {
            cards.map(card => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                disabled={disabled}
              />
            ))
          }
        </div>
      </div>
        : ""}
      {matchcounter == 4 ?
        <div className='page'>
          <img className='inviteimg' src="/image/invite.png" />
        </div>
        : ""}
        </div>
      )
}
