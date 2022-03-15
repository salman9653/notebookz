import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Get all Notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Contrnt-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNmYyN2FhMDQ1MmM4MmRiM2ZlYTQ3In0sImlhdCI6MTY0NjcyOTY3Mn0.S-vg17RRWrEC4cILMv3vekOzu_46IHBW_WV1i1w7dsI'
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNmYyN2FhMDQ1MmM4MmRiM2ZlYTQ3In0sImlhdCI6MTY0NjcyOTY3Mn0.S-vg17RRWrEC4cILMv3vekOzu_46IHBW_WV1i1w7dsI"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        // logic to add note in client
        const note = {
            "_id": "622c98c4f73254633bb1abc71",
            "user": "6226f27aa0452c82db3fea47",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-03-12T12:57:40.688Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNmYyN2FhMDQ1MmM4MmRiM2ZlYTQ3In0sImlhdCI6MTY0NjcyOTY3Mn0.S-vg17RRWrEC4cILMv3vekOzu_46IHBW_WV1i1w7dsI'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))
        // logic to edit note in client

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    //Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Contrnt-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNmYyN2FhMDQ1MmM4MmRiM2ZlYTQ3In0sImlhdCI6MTY0NjcyOTY3Mn0.S-vg17RRWrEC4cILMv3vekOzu_46IHBW_WV1i1w7dsI'
            },
        });
        const json = response.json();
        console.log(json);

        // logic to delete note in client
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;





// import NoteContext from "./NoteContext";
// import { useState } from "react";

// const NoteState = (props) => {
//   const host = "http://localhost:5000"
//   const notesInitial = []
//   const [notes, setNotes] = useState(notesInitial)

//   // Get all Notes
//   const getNotes = async () => {
//     // API Call 
//     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNmYyN2FhMDQ1MmM4MmRiM2ZlYTQ3In0sImlhdCI6MTY0NjcyOTY3Mn0.S-vg17RRWrEC4cILMv3vekOzu_46IHBW_WV1i1w7dsI"
//       }
//     });
//     const json = await response.json()
//     console.log(json)
//     setNotes(json)
//   }

//   // Add a Note
//   const addNote = async (title, description, tag) => {
//     // TODO: API Call
//     // API Call 
//     const response = await fetch(`${host}/api/notes/addnote`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNmYyN2FhMDQ1MmM4MmRiM2ZlYTQ3In0sImlhdCI6MTY0NjcyOTY3Mn0.S-vg17RRWrEC4cILMv3vekOzu_46IHBW_WV1i1w7dsI"
//       },
//       body: JSON.stringify({title, description, tag})
//     });

//     const json = await response.json();
//     console.log(json)
     

//     console.log("Adding a new note")
//     const note = {
//       "_id": "61322f119553781a8ca8d0e08",
//       "user": "6131dc5e3e4037cd4734a0664",
//       "title": title,
//       "description": description,
//       "tag": tag,
//       "date": "2021-09-03T14:20:09.668Z",
//       "__v": 0
//     };
//     setNotes(notes.concat(note))
//   }

//   // Delete a Note
//   const deleteNote = async (id) => {
//     // API Call
//     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNmYyN2FhMDQ1MmM4MmRiM2ZlYTQ3In0sImlhdCI6MTY0NjcyOTY3Mn0.S-vg17RRWrEC4cILMv3vekOzu_46IHBW_WV1i1w7dsI"
//       }
//     });
//     const json = response.json();
//     console.log(json)

//     console.log("Deleting the note with id" + id);
//     const newNotes = notes.filter((note) => { return note._id !== id })
//     setNotes(newNotes)
//   }

//   // Edit a Note
//   const editNote = async (id, title, description, tag) => {
//     // API Call 
//     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyNmYyN2FhMDQ1MmM4MmRiM2ZlYTQ3In0sImlhdCI6MTY0NjcyOTY3Mn0.S-vg17RRWrEC4cILMv3vekOzu_46IHBW_WV1i1w7dsI"
//       },
//       body: JSON.stringify({title, description, tag})
//     });
//     const json = await response.json();
//     console.log(json)

//      let newNotes = JSON.parse(JSON.stringify(notes))
//     // Logic to edit in client
//     for (let index = 0; index < newNotes.length; index++) {
//       const element = newNotes[index];
//       if (element._id === id) {
//         newNotes[index].title = title;
//         newNotes[index].description = description;
//         newNotes[index].tag = tag; 
//         break; 
//       }
//     }  
//     setNotes(newNotes);
//   }

//   return (
//     <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
//       {props.children}
//     </NoteContext.Provider>
//   )

// }
// export default NoteState;