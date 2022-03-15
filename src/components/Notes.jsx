import React, { useContext, useEffect, useRef, useState } from 'react';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import noteContext from "../context/notes/NoteContext"

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        getNotes()
    }, [])
    const ref = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", etag: "", edescription: "" })
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        ref.current.click();
    }
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />

            {/* Modal brtn */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal"></button>
            {/* Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='etitle'
                                        id="etitle"
                                        onChange={handleChange}
                                        value={note.etitle} />
                                </div>
                                <div className="mb-1">
                                    <input type="text" className="form-control" name='etag' id="etag" onChange={handleChange} value={note.etag} />
                                </div>
                                <div className="mb-1">
                                    <textarea
                                        className="form-control"
                                        name='edescription'
                                        id="edescription"
                                        onChange={handleChange}
                                        rows="2"
                                        value={note.edescription} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                onClick={handleClick}
                                className="btn btn-primary px-5"
                                disabled={note.etitle.length < 3 || note.edescription.length < 5}
                            >Update</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row'>
                <h3>Your Notes</h3>
                <p>{notes.length === 0 && 'No Notes to display'}</p>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
