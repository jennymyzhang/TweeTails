import React from 'react'
import Login from '../components/user/Login'
import NavBar from '../components/NavBar'
import BottomNav from '../components/BottomNav';
import {
  Paper
} from '@mui/material';
const Home = () => {
  return (
    <>
        <Login />
        <NavBar />
        <BottomNav />
    </>
  )
}

export default Home
