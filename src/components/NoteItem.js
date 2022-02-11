import React from 'react'

const NoteItem = (props) =>{
    let {note} = props
  return (
    <div className="card body mx-3 my-3 col-md-3" >
      <h5 className="card-title">{note.title}</h5>
      <p className="card-text">{note.description}</p>
  </div>
  )
}

export default NoteItem