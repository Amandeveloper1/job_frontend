import './App.css';
import Header from './component/Header';
import Home from './component/Home';
import { Routes, Route } from "react-router-dom";
import Jobs from './component/Jobs';
import Account from './component/Account';
import CreateJob from './component/CreateJob';
import Register from './component/Register';
import Login from './component/Login';
import JobDetails from './component/JobDetails';
import Massage from './component/Massage';

function App() {
  return (
    <>
      <Routes>

        <Route path='/' element={<>
          <Header />
          <Home />
        </>} />

        <Route path='/about' element={<>
          <Header />
          <div>about</div>
        </>} />

        <Route path='/jobs' element={<>
          <Header />
          <Jobs />
        </>} />

        <Route path='/massage' element={<>
          <Header />
          <Massage/>
        </>} />

        <Route path='/login' element={<>
          <Header />
          <Login />
        </>} />

        <Route path='/register' element={<>
          <Header />
          <Register />
        </>} />

        <Route path='/account' element={<>
          <Header />
          <Account />
        </>} />








        <Route path='/createjob' element={<>
          <Header />
          <CreateJob />
        </>} />
        <Route path='/jobdetails/:jobid' element={<>
          <Header />
          <JobDetails />
        </>} />

      </Routes>








    </>
  );
}

export default App;
