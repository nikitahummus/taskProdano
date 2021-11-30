import React from 'react'
import { useGameContext } from '../../contexts/gameContext'
import CardList from '../CardList/CardList'
import Info from '../Info/Info'

export default function Container() {
  const {game, info} = useGameContext()
  return (
    <div className="container">
      {!game.finished ? 
      <>
      <div>ходов: {game.count}</div>
      <CardList/> 
      <Info/>
      </> :
      (info.active ? <Info/> : 
      <div> Я могу отличить губернаторов
      за {game.count} ходов!
      Хотя сделать это очень сложно</div>)}
    </div>)
}

