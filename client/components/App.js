import React, { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Signup from "./Signup.js"
import Login from "./Login.jsx"
import Home from "./home.jsx"

const App = () => {
  //******************** state *************************************** */
  const [allCohorts, setAllCohorts] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [currUser, setCurrUser] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)



  //******************** handler functions */

  const handleUsername = (e) => {
    console.log(username)
    setUsername(e.target.value)
  }
  const handlePassword = (e) => setPassword(e.target.value)


  //************************ fetch requests ************************* */
  const navigate = useNavigate()
  function createUser() {

    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        cohort: 14
      })
    })
      .then(res => res.json())

      // .then(setLoggedIn(true))
      // .then(res => setCurrUser(res.user))
    return navigate("/login")

  }
  async function login() {
    try {
      let res = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(
          {
            username: username,
            password: password
          }
        )
      })
      res = await res.json()
      setCurrUser(res.username);
      setLoggedIn(true)

      return navigate("/home")
    } catch (error) {
      console.log(error);
    }
  }
  const signout = () => {
    setLoggedIn(false)
    setUser('')
  }


  function getAllCohorts() {
    fetch("/cohort", { method: 'GET' })
      .then(response => response.json())
      .then(response => {
        setAllCohorts(response)
        // console.log(response)
      })
      .catch(error => console.log('error', error));
  }

  // useEffect(() => {
  //   getAllCohorts()


  // }, [])


  return (
    <>
      <header className="w-full flex justify-between items-center bg-[#C0C0C0]">
        <Link to="/userlogin">
          Title
        </Link>
      </header>

      <Routes>
        <Route path="/home" element={<Home
        allCohorts={allCohorts}
         />} />
        <Route path="/login" element={<Login
          username={username}
          password={password}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          login={login}
        />} />
        <Route path="/" element={<Signup
          username={username}
          password={password}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          createUser={createUser} />} />
      </Routes>


    </>


  )
}

export default App

// function App(){
//     const responseMessage = (response) => {

//         console.log(response);
//     };
//     const errorMessage = (error) => {
//         console.log(error);
//     };
//     return (
//         <div>
//             <h2>React Google Login</h2>
//             <br />
//             <br />
//             <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
//         </div>
//     )
// }