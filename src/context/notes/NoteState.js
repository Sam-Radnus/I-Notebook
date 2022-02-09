import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
export const NoteState=(props)=>{
    const s1={
        "name":"Sam",
        "class":"8A"
    }
    const [state,setState]=useState(s1)
    const update=()=>{
        setTimeout(()=>{
             setState({
                 "name":"Larry",
                 "class":"10b"
             })
        },1000);
    }
    return (
      <NoteContext.Provider value={{state,update}}>
          {props.children}
      </NoteContext.Provider>
    )
}
