import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/noteContext'

const Addnote = () => {
  const context = useContext(noteContext)
  const { addnote } = context
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: '',
  })

  const handleclick = (e) => {
    e.preventDefault()
    setNote({ title: '', description: '', tag: '' })
    addnote(note.title, note.description, note.tag)
  }
  onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div className='container my-3'>
      <h1>Add a Note</h1>

      <form className='my-3'>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='email'
            className='form-control'
            id='title'
            name='title'
            aria-describedby='emailHelp'
            onChange={onchange}
            value={note.title}
            minLength={5}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input
            type='text'
            className='form-control'
            id='description'
            name='description'
            onChange={onchange}
            value={note.description}
            minLength={5}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='tag' className='form-label'>
            Tag
          </label>
          <input
            type='text'
            className='form-control'
            id='tag'
            name='tag'
            value={note.tag}
            onChange={onchange}
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type='button'
          className='btn btn-primary'
          onClick={handleclick}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Addnote
