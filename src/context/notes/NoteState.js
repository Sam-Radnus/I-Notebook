import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
export const NoteState=(props)=>{
    const notesInitial=[
        {
          "_id": "61fdf8b2b7cc9778430906ad",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Today",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "61fdf8b3b7cc9778430906b1",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Tomorrow",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "61fdf8b2b7cc9778430906ad",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Today",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "61fdf8b2b7cc9778430906ad",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Today",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "61fdf8b2b7cc9778430906ad",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Today",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "61fdf8b2b7cc9778430906ad",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Today",
          "tag": "personal",
          "__v": 0
        }

      ]
      const[notes,setNotes]=useState(notesInitial)
    return (
      <NoteContext.Provider value={{notes,setNotes}}>
          {props.children}
      </NoteContext.Provider>
    )
}
