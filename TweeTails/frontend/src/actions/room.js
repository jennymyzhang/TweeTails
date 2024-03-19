import axios from 'axios';
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');
export const createRoom = async (room, currentUser,  dispatch, setPage) => {
    dispatch({ type: 'START_LOADING' });
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'X-CSRFToken': csrfToken,
        }
    };

    const body =  JSON.stringify({
        lng: room.lng,
        lat: room.lat,
        description: room.description,
        title: room.title,
        images: room.images,
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
                message: 'The room has been added successfully',
              },
            });
            dispatch({ type: 'RESET_ROOM' });
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
