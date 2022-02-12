import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
export const NoteState=(props)=>{
   
    const notesInitial=[
        {
          "_id": "61fdf8b2b7cc9778430ncv906ad1",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Today",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "61fdf8b3b7cc977qw8430906b1",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Tomorrow",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "61fdf8b2b7cc97wer78430906ad2",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Today",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "61fdf8b2b7cc97asd78430906ad3",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Today",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "61fdf8b2b7cc97afsg78430906ad4",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Today",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "61fdf8b2b7cc97784309gr06ad5",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Today",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "61fdf8b2b7cc9778430asd906ad6",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Today",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "61fdf8b2b7cc9778430906ad7",
          "user": "61f8f0806568b351509a1341",
          "title": "My Title",
          "description": " Please wake up early Today",
          "tag": "personal",
          "__v": 0
        }

      ]
     
      const[notes,setNotes]=useState(notesInitial)
      
      //Add a Note
      const[_id,setId]=useState(1);
      const addNote=(title,description,tag)=>{
        console.log("Adding a new note");
      
        const  note={
          "_id": `61fqdfasd8b2banbj7cc9778430906ad7${_id}`,
          "user": "61f8f08065da68b351509a1341",
          "title": title,
          "description": description,
          "tag": tag,
          "__v": 0
         };
        
         note._id=note._id+_id;
         console.log(note._id);
         setId(_id+5)
         setNotes(notes.concat(note))
      }
      //Delete a Note
      const deleteNote=()=>{

      }
      //Edit a Note
      const editNote=()=>
      {

      }
    return (
      <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote}}>
          {props.children}
      </NoteContext.Provider>
    )
}
