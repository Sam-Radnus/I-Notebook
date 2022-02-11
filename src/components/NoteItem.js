import React from 'react';
import '../App.css';
const NoteItem = (props) =>{
    let {note} = props
  return (
    <div className="col-md-3" >
        <div className="card my-3"></div>
        <div className="card-body">
            <div className="d-flex align-items-center">
      <h5 className="card-title">{note.title}</h5>
      <i className="fa-solid fa-pen-to-square mx-2"></i>
      <i className="fa-solid fa-trash-can mx-2"></i>
      </div>
      <p className="card-text">{note.description}</p>
      </div>
  </div>
  )
}

export default NoteItem