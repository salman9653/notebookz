import React from 'react'

const NoteItem = ({ note }) => {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="card text-dark bg-light mb-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
                <div className="card-footer px-4 d-flex justify-content-between">
                    <small>{note.tag}</small>
                    <div>
                        <i className="fa-solid fa-pen-to-square text-primary mx-3"></i>
                        <i className="fa-solid fa-trash text-danger mx-3"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
