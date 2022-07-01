import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  let location = useLocation()
  const history = useHistory()
  const handlelogout = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }
  useEffect(() => {}, [location])
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            iNoteBook
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${
                    location.pathname === '/' ? 'active' : ''
                  }`}
                  aria-current='page'
                  to='/'
                >
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${
                    location.pathname === '/about' ? 'active' : ''
                  }`}
                  to='/about'
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? (
              <form className='d-flex'>
                <Link
                  class='btn btn-outline-primary mx-2'
                  to='/login'
                  role='button'
                >
                  Login
                </Link>
                <Link
                  class='btn btn-outline-primary mx-2'
                  to='/signup'
                  role='button'
                >
                  Signup
                </Link>
              </form>
            ) : (
              <form className='d-flex'>
                <button
                  class='btn btn-outline-primary mx-2'
                  onClick={handlelogout}
                >
                  Logout
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
