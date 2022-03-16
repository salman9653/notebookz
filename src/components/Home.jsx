import React from 'react';
import Notes from './Notes'


const Home = ({ showAlert }) => {
    return (
        <div className="py-2">
            <Notes showAlert={showAlert} />
        </div>
    )
}

export default Home;
