import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

function GameContextProvider({ children }) {
  const [info, setInfo] = useState({active: false,
  guber: null})
  const [game, setGame] = useState({
    count: 0,
    gameState: [],
    finished: false
  });
  const gameState = game.gameState;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  function makeField(gubers) {
    const doubleGubers = JSON.parse(JSON.stringify(gubers));
    doubleGubers.forEach(item => item.id = item.id * 20);
    const allGubers = gubers.concat(doubleGubers);
    shuffle(allGubers);
    return allGubers
  }

  function play(currentCard, id, guber) {
    console.log(info)
    setGame(prev => {
      return {
        ...prev,
        gameState: prev.gameState.map((item) => {
          if (item.id === currentCard.id) {
            return { ...item, opened: true }
          } else {
            return item
          }
        }),
      }
    });

    if (!info.guber) {
      setInfo({active: false,
          guber: {id: id, name: guber.name}})
      } else {
      if (info.guber.name === currentCard.name) {
        if (gameState.filter(item => !item.status).length === 2) {
          setTimeout(() => setGame(prev => {
            return { ...prev, finished: true }
          }), 1200)
        }
        setTimeout(() => setGame(prev => {
          return {
            ...prev,
            gameState: prev.gameState.map((item) => {
              if (item.id === info.guber.id || item.id === currentCard.id) {
                return { ...item, status: true }
              } else {
                return item
              }
            }),
            count: prev.count + 1
          }
        }), 900)
        setTimeout(()=> {
          setInfo(prev=>{
            return {...prev, active: true}
          });
        },
         1100);
      } else {
        setTimeout(() => {setGame(prev => {
          return {
            ...prev,
            gameState: prev.gameState.map((item) => {
              if (item.id === info.guber.id || item.id === currentCard.id) {
                return { ...item, opened: false }
              } else {
                return item
              }
            }),
            count: prev.count + 1
          }
        });
      setInfo({active: false, guber: null})}, 1500);
      }
    }
  }

  return (
    <GameContext.Provider value={{ makeField, game, gameState, setGame, play, info, setInfo }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
export const useGameContext = () => useContext(GameContext);
