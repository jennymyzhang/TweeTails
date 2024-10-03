import { auth } from '../firebase/config';  // Firebase Auth instance
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile as firebaseUpdateProfile } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

export const updateProfile = async (currentUser, updatedFields, dispatch) => {
    dispatch({ type: 'START_LOADING' });

    const { file } = updatedFields;

    try {
        // Firebase Storage reference
        const storage = getStorage();
        const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
        const storageRef = ref(storage, `profile/${currentUser?.uid}/${imageName}`);

        // Upload file to Firebase Storage
        await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded file
        const photoURL = await getDownloadURL(storageRef);

        // Update the user's profile in Firebase
        await firebaseUpdateProfile(currentUser, { photoURL });

        // Dispatch the updated user data
        dispatch({ type: 'UPDATE_USER', payload: { ...currentUser, photoURL } });

        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'success',
                message: 'Your profile has been updated successfully',
            },
        });

        // Reset the file input and close profile dialog
        dispatch({
            type: 'UPDATE_PROFILE',
            payload: { open: false, file: null, photoURL },
        });

    } catch (error) {
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'error',
                message: error.message,
            },
        });
        console.log(error);
    }

    dispatch({ type: 'END_LOADING' });
};