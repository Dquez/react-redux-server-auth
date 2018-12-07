import axios from 'axios';
import {AUTH_USER, AUTH_ERROR} from './types';

export const signup = (formProps, callback) => async dispatch =>{
    try{
        const repsonse = await axios.post('http://localhost:3090/signup', formProps);
        const {token} = repsonse.data;
        dispatch({type: AUTH_USER, payload: token})
        localStorage.setItem('token', token)
        callback();
    }
    catch(err){
        dispatch({type: AUTH_ERROR, payload: 'Email in use'})
    }
}