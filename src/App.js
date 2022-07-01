import { Home } from './Components/Home'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Navbar } from './Components/Navbar'
import { About } from './Components/About'
import NoteState from './Context/notes/NoteState'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { useState } from 'react'
import showAlert from './Components/Alert'
import Alert from './Components/Alert'

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Switch>
              <Route exact path='/about'>
                <About />
              </Route>
              <Route path='/users'></Route>
              <Route exact path='/'>
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path='/login'>
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path='/signup'>
                <Signup showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App
