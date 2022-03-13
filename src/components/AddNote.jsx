import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/NoteContext"

function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", tag: "", description: "" })
    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container text-center py-2 my-2 col-lg-5'>
            <h4> <span style={{ fontSize: "30px" }}>A</span>DD A <span style={{ fontSize: "30px" }}>N</span>OTE </h4>
            <form action="">
                <div className="mb-1">
                    <input type="text" className="form-control" name='title' id="title" onChange={handleChange} placeholder="Title" />
                </div>
                <div className="mb-1">
                    <input type="text" className="form-control" name='tag' id="tag" onChange={handleChange} placeholder="Tags" />
                </div>
                <div className="mb-1">
                    <textarea className="form-control" name='description' id="description" onChange={handleChange} rows="2" placeholder="Description" />
                </div>
                <button type="submit" className="btn btn-sm btn-success mb-3 col-12" onClick={handleAdd}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;
