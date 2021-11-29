import { createContext, useContext, useRef, useState } from 'react';
import Card from '../Components/Card/Card';



const GameContext = createContext();



function GameContextProvider({ children }) {

  const [game, setGame] = useState({
    count: 0,
    gameState: [],
    opened: null,
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
    shuffle(allGubers)
    return allGubers
  }

  function play(currentCard, id, guber) {
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
    setTimeout(() => {
      if (!game.opened) {
        setGame(prev => {
          return {
            ...prev,
            opened: { id: id, name: guber.name }
          }
        })
      } else {
        if (game.opened.name === currentCard.name) {
          setGame(prev => {
            return {
              ...prev,
              gameState: prev.gameState.map((item) => {
                if (item.id === game.opened.id || item.id === currentCard.id) {
                  return { ...item, status: true }
                } else {
                  return item
                }
              }),
              opened: null,
              count: prev.count + 1
            }
          });
        } else {
          setGame(prev => {
            return {
              ...prev,
              gameState: prev.gameState.map((item) => {
                if (item.id === game.opened.id || item.id === currentCard.id) {
                  return { ...item, opened: false }
                } else {
                  return item
                }
              }),
              opened: null,
              count: prev.count + 1
            }
          })
        }
      }
    }, 500);
  }

  return (
    <GameContext.Provider value={{ makeField, game, gameState, setGame, play }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
export const useGameContext = () => useContext(GameContext);
