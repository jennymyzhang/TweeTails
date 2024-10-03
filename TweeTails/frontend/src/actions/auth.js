import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut, onAuthStateChanged, updateProfile} from 'firebase/auth';

export const load_user = (dispatch) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, email verification check is removed
            dispatch({
                type: "USER_LOADED_SUCCESS",
                payload: user
            });
        } else {
            dispatch({
                type: "USER_LOADED_FAIL"
            });
        }
    });
};


export const login = async (email, password, dispatch) => {
    dispatch({ type: "START_LOADING" });

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user) {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user
            });

            dispatch({ type: "CLOSE_LOGIN" });
            load_user(dispatch); // Call this function to load user data if needed
        } else {
            dispatch({
                type: "LOGIN_FAIL"
            });
        }
    } catch (err) {
        dispatch({
            type: "LOGIN_FAIL"
        });
        dispatch({
            type: "UPDATE_ALERT",
            payload: {
                open: true,
                severity: 'error',
                message: 'No matched credentials, please check your email and password or sign up first',
            },
        });
    }
    dispatch({ type: "END_LOADING" });
};

export const signup = async (first_name, last_name, email, password, re_password, dispatch) => {
    dispatch({ type: "START_LOADING" });

    try {
        console.log("Starting signup");

        // Ensure the user creation completes before proceeding
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("User created:", user);

        // Try updating profile with first name and last name
        try {
            await updateProfile(user, {
                displayName: `${first_name} ${last_name}`
            });
            console.log("Profile updated with full name");
        } catch (updateError) {
            console.error("Error updating profile:", updateError);
            dispatch({
                type: "UPDATE_ALERT",
                payload: {
                    open: true,
                    severity: 'error',
                    message: 'Failed to update profile. Please try again.',
                },
            });
        }

        dispatch({
            type: 'SIGNUP_SUCCESS',
            payload: user
        });

        dispatch({
            type: "UPDATE_ALERT",
            payload: {
                open: true,
                severity: 'info',
                message: 'Sign up success!',
            },
        });
    } catch (err) {
        console.error("Error during signup:", err.message);
        dispatch({
            type: 'SIGNUP_FAIL'
        });

        dispatch({
            type: "UPDATE_ALERT",
            payload: {
                open: true,
                severity: 'error',
                message: 'Sign up failed, please log in if you have an existing account or contact support for assistance',
            },
        });
    }

    dispatch({ type: "END_LOADING" });
};


export const verify = async (dispatch) => {
    const user = auth.currentUser;
    if (user) {
        try {
            await sendEmailVerification(user);
            dispatch({
                type: 'ACTIVATION_SUCCESS',
            });
            dispatch({
                type: "UPDATE_ALERT",
                payload: {
                    open: true,
                    severity: 'info',
                    message: 'Verification email sent!',
                },
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: 'ACTIVATION_FAIL'
            });
            dispatch({
                type: "UPDATE_ALERT",
                payload: {
                    open: true,
                    severity: 'error',
                    message: 'Verification email failed to send, please try again',
                },
            });
        }
    } else {
        dispatch({
            type: 'ACTIVATION_FAIL'
        });
    }
};

export const checkAuthenticated = (dispatch) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch({
                type: 'AUTHENTICATED_SUCCESS'
            });
        } else {
            dispatch({
                type: 'AUTHENTICATED_FAIL'
            });
        }
    });
};


export const logout = async (dispatch) => {
    try {
        await signOut(auth);
        dispatch({
            type: 'LOGOUT'
        });
    } catch (err) {
        console.error(err);
    }
};
