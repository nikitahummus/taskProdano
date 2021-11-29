import React from 'react'
import { useGameContext } from '../../contexts/gameContext'
import CardList from '../CardList/CardList'

export default function Container() {
  const {game} = useGameContext()
  return (
    <div className="container">
      {!game.finished ? 
      <>
      <div>ходов: {game.count}</div>
      <CardList/> </> : 
      <div> Я могу отличить губернаторов
      за {game.count} ходов!
      Хотя сделать это очень сложно</div>}
    </div>
  )
}

