const reducer = (state, action) => {
  console.log("reducer")
  console.log(state)
  console.log(action.type)
  console.log(action.payload)
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };

    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };

    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };

    case 'UPDATE_USER':
      return { ...state, currentUser: action.payload };

    case 'LOGIN_SUCCESS':
      return { 
        ...state,
        isAuthenticated: true,
        access: action.payload.access,
        refresh: action.payload.refresh};
    
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isAuthenticated: false};
          
    case 'USER_LOADED_SUCCESS':
      return {...state, currentUser: action.payload}

    case 'SIGNUP_SUCCESS':
        return {
            ...state,
            isAuthenticated: false
        }
    case 'AUTHENTICATED_FAIL':
        return {
            ...state,
            isAuthenticated: false
        }
    case 'USER_LOADED_FAIL':
        return {
            ...state,
            user: null
        }
    case 'LOGIN_FAIL':
    case 'SIGNUP_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return {
          ...state,
          access: null,
          refresh: null,
          isAuthenticated: false,
          currentUser: null
    }
    case 'ACTIVATION_FAIL':
    case 'ACTIVATION_SUCCESS':
      return {
          ...state
      }
    case 'AUTHENTICATED_SUCCESS':
      return {
          ...state,
          isAuthenticated: true
      }
    case 'AUTHENTICATED_FAIL':
      return {
          ...state,
          isAuthenticated: false
      }
      
    case 'UPDATE_IMAGES':
      return { ...state, images: [...state.images, action.payload] };
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };

    case 'UPDATE_DETAILS':
      return { ...state, details: { ...state.details, ...action.payload } };
    
    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload };

    case 'RESET_ROOM':
      return {
        ...state,
        images: [],
        details: { title: '', description: '', price: 0 },
        location: { lng: 0, lat: 0 },
      };

      case 'UPDATE_ROOMS':
        return {
          ...state,
          rooms: action.payload,
          addressFilter: null,
          filteredRooms: action.payload,
        };
    
      case 'FILTER_ADDRESS':
        return {
          ...state,
          addressFilter: action.payload,
          filteredRooms: applyFilter(
            state.rooms,
            action.payload,
          ),
        };
      case 'CLEAR_ADDRESS':
        return {
          ...state,
          addressFilter: null,
          filteredRooms: state.rooms,
        };
      case 'UPDATE_ROOM':
        return { ...state, room: action.payload };
        default:
          throw new Error('No matched action!');
  }
};

export default reducer;

const applyFilter = (rooms, address) => {
  let filteredRooms = rooms;
  if (address) {
    const { lng, lat } = address;
    filteredRooms = filteredRooms.filter((room) => {
      const lngDifference = lng > room.lng ? lng - room.lng : room.lng - lng;
      const latDifference = lat > room.lat ? lat - room.lat : room.lat - lat;
      return lngDifference <= 1 && latDifference <= 1;
    });
  }

  return filteredRooms;
};