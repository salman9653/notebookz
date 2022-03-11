import React, { useContext } from 'react';
import noteContext from "../context/notes/NoteContext"

const Home = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
        <div className="py-2">
            <div className=' container text-center py-2 my-2' style={{ width: "500px" }}>
                <h4> <span style={{ fontSize: "30px" }}>A</span>DD A <span style={{ fontSize: "30px" }}>N</span>OTE </h4>
                <form action="">
                    <div className="mb-3">
                        <input type="text" className="form-control" id="" placeholder="Title" />
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" id="" rows="3" placeholder="Description" />
                    </div>
                </form>
            </div>
            <div>
                <h3>Your Notes</h3>
                {notes.map((note) => {
                    return note.title
                })}
            </div>
        </div>
    )
}

export default Home;
