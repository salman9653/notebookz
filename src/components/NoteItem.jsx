import React from 'react'

const NoteItem = ({ note }) => {
    return (
        <div className="col-lg-4">
            <div className="card text-light bg-danger mb-3 ">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
                <div className="card-footer">
                    <small>{note.tag}</small>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
