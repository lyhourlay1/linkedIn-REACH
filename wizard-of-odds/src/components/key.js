import React, { useContext } from "react";
import {AppContext} from "../App"

function Key({keyVal}){
    const {onEnter, onDelete, selectNumber} = useContext(AppContext);
    function handleClick (){
        if(keyVal==='ENTER'){
            onEnter()
        }else if(keyVal === 'DELETE'){
            onDelete()
        }
        else{
            selectNumber(keyVal)
        }
    }

    return (
        <div className="key" onClick={handleClick}>{keyVal} </div>
    )
}

export default Key