import React from 'react'
import { useGameContext } from '../../contexts/gameContext'

export default function Info() {
  const { game, setInfo, info } = useGameContext()
  if(info.active)
  {const guber = game.gameState.find(item => item.id === info.guber.id)
  const img = guber.img.replace('s', 'l')
  console.log(game)
  return (
    <div className="info">
    {info.guber? <>
      
      <img src={`Archive/large/${img}`} alt="" />
      <div className="name">{guber.name}</div>
      <p className="subtitle">{guber.subtitle}</p>
      <div className="description">{guber.description}</div>
      <button type="button" onClick={() => {
        setInfo({active: false, guber: null})}}>Дальше</button>
    
  </> : null}
  </div>
  )} 
  return null
}
