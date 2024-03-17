import React from 'react'
import {Google} from '@mui/icons-material'
import {Button} from '@mui/material'
const GoogleOneTapLogin = () => {
  return (
    <Button 
    variant='outlined'
    startIcon={<Google/>}>
        Log in With Google
    </Button>
  )
}

export default GoogleOneTapLogin
