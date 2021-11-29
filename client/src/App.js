import './App.css';
import Container from './Components/Container/Container';
import GameContextProvider from './contexts/gameContext';

function App() {
  return (
    <div className="App">
      <GameContextProvider>
      <Container/>
      </GameContextProvider>
    </div>
  );
}

export default App;
