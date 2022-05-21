import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Route, Link, Routes } from 'react-router-dom'
import Login from './components/login/login.js'
import AdminDashboard from './components/Dashboard/adminDashboard.js'
import UserDashboard from './components/Dashboard/userDashboard.js'
import AllUsers from './components/AllUsers/AllUsers';
import AllQuestions from './components/questions/allquestions.js';
import CreateUser from './components/AllUsers/CreateUser.js';
import CreateQuestion from './components/questions/createquestion.js';
import Test from './components/test/Test.js';
import StartTest from './components/test/starttest.js';
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
        <Route exact path='/Start/:username/:testid' element={<StartTest />} />
      </Routes>

    </div>
  );
}

export default App;
