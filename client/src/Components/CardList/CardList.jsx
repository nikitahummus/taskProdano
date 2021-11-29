import React, { useEffect } from 'react'
import { useGameContext } from '../../contexts/gameContext';
import gubers from '../../data';
import Card from '../Card/Card';

export default function CardList() {
  const { makeField, gameState, setGame } = useGameContext();
  const guberList = makeField(gubers)
  
  useEffect(() => {
    setGame(prev => {
      return {
        ...prev,
        gameState: guberList
      }
    })
  }, [])

  return (

    <div className="game">
      {gameState.map(item => <Card key={item.id} id={item.id} guber={item} />)}
    </div>

  )
}
