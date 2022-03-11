import React from 'react';
import Notes from './Notes'


const Home = () => {
    return (
        <div className="py-2">
            <div className='container text-center py-2 my-2' style={{ width: "500px" }}>
                <h4> <span style={{ fontSize: "30px" }}>A</span>DD A <span style={{ fontSize: "30px" }}>N</span>OTE </h4>
                <form action="">
                    <div className="mb-3">
                        <input type="text" className="form-control" id="" placeholder="Title" />
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" id="" rows="3" placeholder="Description" />
                    </div>
                    <button type="submit" className="btn btn-success mb-3 col-12">Add</button>
                </form>
            </div>
            <Notes />
        </div>
    )
}

export default Home;
