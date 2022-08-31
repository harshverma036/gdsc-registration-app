import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Loading from './components/Loading';
import Registration from './components/Registration';
import "bootstrap/dist/css/bootstrap.min.css";
import UnAuthorized from './components/UnAuthorized';
import Success from './components/Success';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path={"/"} element={<Loading />} />
          <Route path={"/registration/:token"} element={<Registration />} />
          <Route path={"/unauthorized"} element={<UnAuthorized />} />
          <Route path={"/success"} element={<Success />} />
      </Routes>
    {/* <div>App</div> */}
    </Router>
  )
}

export default App
