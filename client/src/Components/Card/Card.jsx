import { useGameContext } from '../../contexts/gameContext'


export default function Card({ guber, id }) {
  const { game, play} = useGameContext();
  const currentCard = game.gameState.find(item => item.id === id);
  return (
    <div id={id} className={currentCard.status ? "card guessed" : (currentCard.opened ? "card flip" : "card")}
      onClick={() => {
        play(currentCard, id, guber)}}>
      <div className="front-face">
        <img src={`Archive/small/${guber.img}`} alt="" />

      </div>
      <div className="back-face">
        <img src="Archive/рубашка.png" alt="" />
      </div>
    </div>
  )
}
