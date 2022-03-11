import React, { useContext } from 'react';
import NoteItem from './NoteItem';
import noteContext from "../context/notes/NoteContext"

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
        <div className='row'>
            <h3>Your Notes</h3>

            {notes.map((note) => {
                return <NoteItem key={note._id} note={note} />
            })}
        </div>
    )
}

export default Notes
