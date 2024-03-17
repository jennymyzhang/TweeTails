import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Activate from "./components/user/Activate";
import Layout from "./Layout";

const App = () => {
      return (
            <>
            <Layout>
            <BrowserRouter>
                  <Routes>
                        <Route path="activate/:uid/:token" element={<Activate/>} />
                        <Route path="*" element={<Home />}/>
                  </Routes>
            </BrowserRouter>
            </Layout>
            </>
      )
}
  export default App;

