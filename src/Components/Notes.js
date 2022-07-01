import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/noteContext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'

const Notes = (props) => {
  const context = useContext(noteContext)
  const { notes, getnote, editnote } = context
  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: '',
  })

  let history = useHistory()
  useEffect(() => {
    if (localStorage.getItem('token')) getnote()
    else {
      history.push('/login')
    }
  }, [])

  const updatenote = (Currentnote) => {
    ref.current.click()
    setNote({
      id: Currentnote._id,
      etitle: Currentnote.title,
      edescription: Currentnote.description,
      etag: Currentnote.tag,
    })
    props.showAlert('Note added successfully', 'success')
  }

  const [show, setShow] = useState(false)

  const handleClose = async () => setShow(false)

  const handleShow = () => setShow(true)

  const ref = useRef(null)

  const handleclick = (e) => {
    editnote(note.id, note.etitle, note.edescription, note.etag)
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <Addnote showAlert={props.showAlert} />

      <Button
        className='d-none'
        variant='primary'
        ref={ref}
        onClick={handleShow}
      >
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='my-3'>
            <div className='mb-3'>
              <label htmlFor='title' className='form-label'>
                Title
              </label>
              <input
                type='email'
                className='form-control'
                id='etitle'
                name='etitle'
                aria-describedby='emailHelp'
                value={note.etitle}
                onChange={onchange}
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
                id='edescription'
                name='edescription'
                value={note.edescription}
                onChange={onchange}
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
                id='etag'
                name='etag'
                value={note.etag}
                onChange={onchange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={note.etitle.length < 5 || note.edescription.length < 5}
            variant='primary'
            onClick={() => {
              handleclick()
              handleClose()
            }}
          >
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.length === 0 && <h3>You have no notes to display.</h3>}
        {notes.map((note) => {
          return (
            <Noteitem
              showAlert={props.showAlert}
              key={note._id}
              note={note}
              updatenote={updatenote}
            />
          )
        })}
      </div>
    </>
  )
}

export default Notes
