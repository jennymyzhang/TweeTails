import axios from 'axios';
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');
export const createAnimal = async (animal, currentUser,  dispatch, setPage) => {
    dispatch({ type: 'START_LOADING' });
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'X-CSRFToken': csrfToken,
        }
    };

    const body =  JSON.stringify({
        lng: animal.lng,
        lat: animal.lat,
        description: animal.description,
        injured: animal.injured,
        title: animal.title,
        images: animal.images,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        uPhoto: currentUser.photoURL, 
        uid: currentUser.id
    });

    console.log(body)
    
    try {
        console.log("here11" + body + config);
        const result = await axios.post('/animal/create/', body,  config);
        console.log(result)

        if (result) {
            dispatch({
              type: 'UPDATE_ALERT',
              payload: {
                open: true,
                severity: 'success',
                message: 'The animal has been added successfully',
              },
            });
            dispatch({ type: 'RESET_ANIMAL' });
            setPage(0);
        }
        dispatch({ type: 'END_LOADING' });
    } catch (err) {
      console.log(err)
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
              open: true,
              severity: 'error',
              message: 'Failed, please try again',
            },
          });
    }
};


export const getAnimals = async (dispatch) => {
  const config = {
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
      }
  };
  
  try {
      const result = await axios.get('/animal/get-all/', config);
      if (result) {
          dispatch({ type: 'UPDATE_ANIMALS', payload: result.data });
      }
  } catch (err) {
    console.log(err)
  }
};