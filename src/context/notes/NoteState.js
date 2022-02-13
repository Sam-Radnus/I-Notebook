import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
export const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  //Get All Notes
  const getNotes = async () => {
    // console.log("Adding a new note");
    //TODO API CALL
    var response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmOGYwODA2NTY4YjM1MTUwOWExMzQxIn0sImlhdCI6MTY0NDAzMDAzNH0.ohEIVvwf-bOb1UlqLAu8N9DzBcQ19mUcyRz-eoCgCiA"
      }
    });
    const json=await response.json();
   // console.log(json);
    setNotes(json)
  }
  //Add a Note
  const [_id, setId] = useState(1);
  const addNote = async (title, description, tag) => {
    // console.log("Adding a new note");
    //TODO API CALL
    var response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmOGYwODA2NTY4YjM1MTUwOWExMzQxIn0sImlhdCI6MTY0NDAzMDAzNH0.ohEIVvwf-bOb1UlqLAu8N9DzBcQ19mUcyRz-eoCgCiA"
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    const note = { 
      "_id": `61fqdfasd8b2banbj7cc9778430906ad7${_id}`,
      "user": "61f8f08065da68b351509a1341",
      "title": title,
      "description": description,
      "tag": tag,
      "__v": 0
    };

    note._id = note._id + _id; 
    const json = response.json();
    //console.log(note._id);
    setId(_id + 5)
    setNotes(notes.concat(note))
  }
  //Delete a Note
  const deleteNote =async (id) => {
    //TODO API CALL
    //console.log("deleting note using "+id);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmOGYwODA2NTY4YjM1MTUwOWExMzQxIn0sImlhdCI6MTY0NDAzMDAzNH0.ohEIVvwf-bOb1UlqLAu8N9DzBcQ19mUcyRz-eoCgCiA"
      },
    });
    const json= await response.json();
   // console.log(json)

    let newNotes = notes.filter((note) => { return note._id !== id }) //returns all notes except the one clicked on 
    setNotes(newNotes)
  }
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmOGYwODA2NTY4YjM1MTUwOWExMzQxIn0sImlhdCI6MTY0NDAzMDAzNH0.ohEIVvwf-bOb1UlqLAu8N9DzBcQ19mUcyRz-eoCgCiA"
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    let newNotes=JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
      
    }
 //  console.log(newNotes);
      setNotes(newNotes);
    
  }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
