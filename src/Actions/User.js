import axios from 'axios'
import { clearCart } from '../Actions/Cart'; 
import { clearOrder } from '../Actions/Order';
import showToast from '../Utils/toast';

export const loginUser = (email, password,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: 'LoginRequest',
        })
       
        const payload = { email, password };
        console.log('Login Payload:', payload); // Log the payload

        const { data } = await axios.post(
            'http://localhost:5000/auth/login',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
       
        localStorage.setItem("user",JSON.stringify(data));
        localStorage.setItem("token",data.accessToken);

        dispatch({
            type: 'LoginSuccess',
            payload: data,
        });
        showToast('User is logged in successfully!', 'success');
        navigate("/");

    } catch (error) {
        dispatch({
            type: 'LoginFailure',
            payload: error.response.data.message,
        })
        showToast('User logged in faild!', 'error');
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LoadUserRequest',
        })

        const { data } = await axios.get('/api/v1/me')

        dispatch({
            type: 'LoadUserSuccess',
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: 'LoadUserFailure',
            payload: error.response.data.message,
        })
    }
}



export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LogoutUserRequest',
        })

        localStorage.clear();
        
        dispatch({
            type: 'LogoutUserSuccess',
        })

        dispatch(clearCart());

        dispatch(clearOrder());
        showToast('User is logout!', 'success');

    } catch (error) {
        dispatch({
            type: 'LogoutUserFailure',
            payload: error.response.data.message,
        })
        showToast('Fail to logout!', 'error');
    }
}

export const registerUser =  (username, email, password,navigate) => async (dispatch) => {
        try {
            dispatch({
                type: 'RegisterRequest',
            })

            const { data } = await axios.post(
                'http://localhost:5000/auth/register',
                { username, email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            dispatch({
                type: 'RegisterSuccess',
                payload: data,
            })
            showToast('User is Created!', 'success');
            navigate("/login");
            
        } catch (error) {
            dispatch({
                type: 'RegisterFailure',
                payload: error.response.data.message,
            })
            showToast('Not Registered!', 'error');
        }
    }


