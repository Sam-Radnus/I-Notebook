import React, { useContext, useState, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes()
    }
    else{
       navigate("/login");
    }
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })
  const updateNote = (currentNote) => {       //currentNote defines a Note originally fetched from NoteState
    ref.current.click();
    // console.log(currentNote)
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    
  }
  const handleClick = (e) => {
    // console.log("Updating the Note...",note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    setNote({ etitle: "", edescription: "", etag: "" })
    refClose.current.click();
    props.showAlert("Notes Updated Successfully","Success");
    e.preventDefault();

    //console.log(note.title);
    //console.log(note.description);


  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Mode</h5>

            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                  <div id="emailHelp" className="form-text">Come up with a Catchy Title</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
                <button className="btn btn-primary" onChange={onChange} onClick={handleClick}>Add Note</button>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Note's</h2>
        <div className="container mx-1">
          <div disabled={notes.length === 0}>
          {notes.length === 0 && 'Its too Empty out here'}
         </div>
         <div disabled={notes.length !== 0} > 
        {notes.length !== 0 && notes.map((note) => {
          return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
        })}
        </div>
        </div>
      </div>
    </>
  )
}
