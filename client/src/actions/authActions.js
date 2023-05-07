import {
    GET_ERROR,
    SET_CURRENT_USER
} from "./type";
import jwt_decode from 'jwt-decode'
export const registerUser = userData => async dispatch => {
    const user = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(userData),
        // mode: "no-cors",
    });
    const created = await user.json()
    console.log(created);
    if (created.name || created.email) {
        dispatch({
            type: GET_ERROR,
            payload: created
        })
        // localStorage.setItem('success', false)
    }

}

export const loginUser = userData => async dispatch => {
    console.log('logging');
    const user = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(userData),
        // mode: "no-cors",
    })
    const loggedUser = await user.json()
    console.log(loggedUser);
    const {
        token
    } = loggedUser
    if (token) {
        //set token in ls
        localStorage.setItem('jwtToken', token)
        // decode token
        const decoded = jwt_decode(token)
        //set current user
        dispatch(setCurrentUser(decoded))
    } else {
        dispatch({
            type: GET_ERROR,
            payload: loggedUser
        })
    }
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    dispatch(setCurrentUser({}))
    window.location.href = "/login";
}