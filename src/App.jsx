import { useState } from "react";
import GameBoard from "./components/GameBoard"
import GameOver from "./components/GameOver";
import Logs from "./components/Logs";
import Player from "./components/Player";
import {WINNING_COMBINATIONS} from "./winning-combinations";
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]];
const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2',
};
function deriveActivePlayer(gameTurns) {
  let currActivePlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currActivePlayer = "O";
  }
  return currActivePlayer;
}
function deriveWinner(gameBoard, players){
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = players[firstSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = deriveGameBoard(gameTurns);
  const [players, setPlayers] = useState(PLAYERS);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const activePlayer = deriveActivePlayer(gameTurns);
  function handleRestart(){
    console.log("restart called");
    setGameTurns([]);
  }
  
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currActivePlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currActivePlayer }, ...prevTurns,]
      return updatedTurns
    });
  }
  function handlePlayerNameChange(symbol, newName){
    setPlayers((prevPlayers)=>{
      return {
        ...prevPlayers, 
      [symbol]:newName
      }});
  }
  return (
    <main>
      <div id="game-container">
        
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} handlePlayerNameChange={handlePlayerNameChange}></Player>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} handlePlayerNameChange={handlePlayerNameChange}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} handleRematch={handleRestart}></GameOver>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} ></GameBoard>
      </div>
      <Logs turns={gameTurns}></Logs>
    </main>
  )
}

export default App
