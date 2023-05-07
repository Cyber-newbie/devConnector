import {
    PROFILE_LOADING,
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE
} from "./type";

//get current profile
export const getCurrentProfile = () => async dispatch => {
    dispatch(setProfileLoading)
    const profile = await fetch("http://localhost:5000/api/profile", {
        headers: {
            Authorization: localStorage.jwtToken
        }
    })
    const newProfile = await profile.json()
    console.log(newProfile);
    if (newProfile) {
        dispatch({
            type: GET_PROFILE,
            payload: newProfile
        })
    } else {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    }
}


export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}