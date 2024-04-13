import { useState } from "react";

export default function Player({name, symbol, isActive, handlePlayerNameChange}) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(event){
    setPlayerName(event.target.value);
  }
  function btnClick(){
    setIsEditing((wasEditing)=> !wasEditing);
   if(isEditing){
    handlePlayerNameChange(symbol,playerName);
   }
  }
  let editablePlayerName=<span className="player-name">{playerName}</span>;
  if(isEditing){
    editablePlayerName=<input type="text" required value={playerName} onChange={handleChange}></input>;
  }
    return (<>
    <li className={isActive?'active':undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={btnClick}>{!isEditing?"Edit":"Save"}</button>
      </li>
    </>);
}