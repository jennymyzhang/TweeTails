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

    case 'RESET_ANIMAL':
      return {
        ...state,
        images: [],
        details: { title: '', description: '', price: 0 },
        location: { lng: 0, lat: 0 },
      };

      case 'UPDATE_ANIMALS':
        return {
          ...state,
          animals: action.payload,
          addressFilter: null,
          filteredAnimals: action.payload,
        };
    
      case 'FILTER_ADDRESS':
        return {
          ...state,
          addressFilter: action.payload,
          filteredAnimals: applyFilter(
            state.animals,
            action.payload,
          ),
        };
      case 'CLEAR_ADDRESS':
        return {
          ...state,
          addressFilter: null,
          filteredAnimals: state.animals,
        };
      case 'UPDATE_ANIMAL':
        return { ...state, animal: action.payload };
        default:
          throw new Error('No matched action!');
  }
};

export default reducer;

const applyFilter = (animals, address) => {
  let filteredAnimals = animals;
  if (address) {
    const { lng, lat } = address;
    filteredAnimals = filteredAnimals.filter((animal) => {
      const lngDifference = lng > animal.lng ? lng - animal.lng : animal.lng - lng;
      const latDifference = lat > animal.lat ? lat - animal.lat : animal.lat - lat;
      return lngDifference <= 1 && latDifference <= 1;
    });
  }

  return filteredAnimals;
};