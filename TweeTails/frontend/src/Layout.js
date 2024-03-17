import React, { useEffect } from 'react';
import Notification from "./components/Notification";
import Loading from "./components/Loading";
import { checkAuthenticated, load_user } from './actions/auth';
import { useValue } from './context/ContextProvider';

const Layout = ({children }) => {
    const {dispatch} = useValue()

    useEffect(() => {
        checkAuthenticated(dispatch);
        load_user(dispatch);
    }, []);

    return (
        <div>
            <Loading />
            <Notification />
            {children}
        </div>
    );
};

export default (Layout);