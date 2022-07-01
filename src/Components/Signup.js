import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
  let history = useHistory()
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  })
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handlesubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.username,
        email: credentials.email,
        password: credentials.password,
      }),
    })
    const json = await response.json()
    console.log(json.Success)

    if (json.success) {
      console.log(json.Authtoken)
      localStorage.setItem('token', json.Authtoken)
      history.push('/')
      props.showAlert('Account created successfully', 'success')
    } else {
      props.showAlert('Invalid Credentials', 'danger')
    }
  }
  return (
    <div>
      <h2>Create an account to use iNoteBook</h2>
      <form onSubmit={handlesubmit}>
        <label htmlFor='username' className='form-label'>
          Username
        </label>
        <input
          type='name'
          className='form-control'
          id='username'
          name='username'
          aria-describedby='emailHelp'
          value={credentials.name}
          onChange={onchange}
        />
        <div className='mb-3 my-5'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            aria-describedby='emailHelp'
            value={credentials.email}
            onChange={onchange}
          />
          <div id='emailHelp' className='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={credentials.password}
            onChange={onchange}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
