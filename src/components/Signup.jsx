import React from 'react'

const Signup = () => {
    return (
        <div>
            <div className='container text-center py-2 my-2 col-lg-5'>
                <h4> <span style={{ fontSize: "30px" }}>A</span>DD A <span style={{ fontSize: "30px" }}>N</span>OTE </h4>
                <form>
                    <div className="mb-1">
                        <input
                            type="text"
                            className="form-control"
                            name='title'
                            id="title"
                            placeholder="Title" />
                    </div>
                    <div className="mb-1">
                        <input
                            type="text"
                            className="form-control"
                            name='tag' id="tag"
                            placeholder="Tags" />
                    </div>
                    <div className="mb-1">
                        <textarea
                            className="form-control"
                            name='description'
                            id="description"
                            rows="2"
                            placeholder="Description" />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-sm btn-success mb-3 col-12"
                    >Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
