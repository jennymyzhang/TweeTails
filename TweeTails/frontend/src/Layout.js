import React, { useEffect } from 'react';
import Notification from "./components/Notification";
import Loading from "./components/Loading";
import { checkAuthenticated, load_user } from './actions/auth';
import { useValue } from './context/ContextProvider';
import Animal from './components/Animals/Animal';
import {
    Container,
  } from '@mui/material';
const Layout = ({children }) => {
    const {dispatch} = useValue()

    useEffect(() => {
        checkAuthenticated(dispatch);
        load_user(dispatch);
    }, []);

    return (
        <>
            <Loading />
            <Notification />
            {children}
            <Animal />
        </>
    );
};

export default (Layout);