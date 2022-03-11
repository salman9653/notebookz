import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "62283aef1630227d507b0583",
            "user": "6226f27aa0452c82db3fea47",
            "title": "My Title",
            "description": "this is the description of the note",
            "tag": "tag1",
            "date": "2022-03-09T05:28:15.721Z",
            "__v": 0
        },
        {
            "_id": "622adffb9442e4d91f0bd4b6",
            "user": "6226f27aa0452c82db3fea47",
            "title": "My Title",
            "description": "this is the description of the note",
            "tag": "tag",
            "date": "2022-03-11T05:36:59.605Z",
            "__v": 0
        },
        {
            "_id": "622ae00f9442e4d91f0bd4b8",
            "user": "6226f27aa0452c82db3fea47",
            "title": "My New Title",
            "description": "this is the description of the new note",
            "tag": "new tag",
            "date": "2022-03-11T05:37:19.159Z",
            "__v": 0
        }
    ];

    const [notes, setNotes] = useState(notesInitial);
    // Add a Note
    const addNote = (title, description, tag) => {
        const note = {
            "title": title,
            "description": description,
            "tag": tag,
        }
        setNotes(notes.concat(note))
    }

    //Edit a Note
    const editNote = (id) => {

    }

    //Delete a Note
    const deleteNote = (id) => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;