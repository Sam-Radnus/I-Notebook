import React, { useContext,useState, useEffect,useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
 
  useEffect(() => {
    getNotes()
  },[])
  const ref=useRef(null);
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })
  const updateNote = (currentNote) => {       //currentNote defines a Note originally fetched from NoteState
      ref.current.click(); 
      console.log(currentNote)
      setNote({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
  const handleClick = (e) => {
    console.log("Updating the Note...",note)
    e.preventDefault();
    
    //console.log(note.title);
    //console.log(note.description);
    
   
}
const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
}

  return (
    <>
      <AddNote />
     
      <button type="button" ref={ref}  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                    <div id="emailHelp" className="form-text">Come up with a Catchy Title</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="description" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag"  value={note.etag} onChange={onChange} />
                </div>
                <button className="btn btn-primary" onChange={onChange} onClick={handleClick}>Add Note</button>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Note's</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}
