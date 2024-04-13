export default function GameOver({winner, handleRematch}){
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>You won, {winner}!</p>}
            {!winner && <p>It's a draw!</p>}
            <button onClick={handleRematch}>Rematch!</button>
        </div>
    );
}