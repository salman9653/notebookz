import React from 'react'

const Home = () => {
    return (
        <div className="py-2">
            <div className=' container text-center py-2 my-2' style={{ width: "500px" }}>
                <h4> <span style={{ fontSize: "30px" }}>A</span>DD A <span style={{ fontSize: "30px" }}>N</span>OTE </h4>
                <form action="">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="" placeholder="Title" />
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control" id="" rows="3" placeholder="Description" />
                    </div>
                </form>
            </div>
            <div>
                <h3>Your Notes</h3>
            </div>
        </div>
    )
}

export default Home;
