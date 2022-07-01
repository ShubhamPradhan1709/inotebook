import react, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesinitial = []

  const [notes, setNotes] = useState(notesinitial)

  //Get all Notes

  const getnote = async () => {
    //API calls
    const req = localStorage.getItem('token')
    const repeat = localStorage.hasOwnProperty('token')
    console.log(req)
    const response = await fetch(`${host}/api/notes/fetchalldata`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    })
    const note = await response.json()

    setNotes(note)
  }
  //Add a Notes

  const addnote = async (title, description, tag) => {
    //API calls
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',

        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    })

    const newnotes = await response.json()
    // Logic to edit in client
    console.log(newnotes)
    setNotes(notes.concat(newnotes))
  }

  //Delete a Notes

  const deletenote = async (id) => {
    //API calls

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    })
    // Logic to edit in client
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })

    setNotes(newNotes)
  }

  //Edit a Notes

  const editnote = async (id, title, description, tag) => {
    //API calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    })

    // Logic to edit in client
    let NewNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < NewNotes.length; index++) {
      const element = NewNotes[index]

      if (element._id === id) {
        NewNotes[index].title = title
        NewNotes[index].description = description
        NewNotes[index].tag = tag

        break
      }
    }
    setNotes(NewNotes)
  }

  return (
    <NoteContext.Provider
      value={{ notes, addnote, deletenote, editnote, getnote }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
