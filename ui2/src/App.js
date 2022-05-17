import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Route, Link, Routes } from 'react-router-dom'
import Login from './components/login/login.js'
import AdminDashboard from './components/adminDashboard/adminDashboard.js'
import UserDashboard from './components/userDashboard/userDashboard.js'
import AllUsers from './components/AllUsers/AllUsers';
import AllQuestions from './components/questions/allquestions.js';
import CreateUser from './components/CreateUser/CreateUser.js';
import CreateQuestion from './components/questions/createquestion.js';
import Test from './components/test/Test.js';
function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/AdminDashboard/:username' element={<AdminDashboard />} />
        <Route exact path='/dashboard/:username' element={<UserDashboard />} />
        <Route exact path='/AllUser/:username' element={<AllUsers />} />
        <Route exact path='/AllQuestions/:username' element={<AllQuestions />} />
        <Route exact path='/CreateUser/:username' element={<CreateUser />} />
        <Route exact path='/CreateQuestion/:username' element={<CreateQuestion />} />
        <Route exact path='/Test/:username' element={<Test />} />

      </Routes>

    </div>
  );
}

export default App;
