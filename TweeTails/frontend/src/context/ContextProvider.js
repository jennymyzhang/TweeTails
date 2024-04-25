import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import reducer from './reducer';

const initialState = {
  currentUser: null,
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: false,
  openLogin: false,
  loading: false,
  alert: {open: false, severity: 'info', message:''},
  profile: { open: false, file: null, photoURL: ''},
  images: [],
  details: { title: '', description: '', price: 0 },
  location: { lng: 0, lat: 0 },
  rooms: [],
  addressFilter: null,
  filteredRooms: [],
  room: null,
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef();
  const containerRef = useRef();

  return (
    <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>{children}</Context.Provider>
  );
};

export default ContextProvider;