import {
    PROFILE_LOADING,
    GET_PROFILE,
    CLEAR_CURRENT_PROFILE,
    GET_ERROR
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

export const createProfile = (profileData) => async dispatch => {
    const profile = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
            Authorization: localStorage.jwtToken,
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(profileData),
        // mode: "no-cors",
    })

    const newProfile = await profile.json()
    console.log(profileData);
    console.log(newProfile.hasOwnProperty('createdProfile'));

    if (newProfile.hasOwnProperty('createdProfile')) {

        console.log('profile created');

    } else if (!newProfile.hasOwnProperty('status') || !newProfile.hasOwnProperty('handle') || !newProfile.hasOwnProperty('skills')) {
        dispatch({
            type: GET_ERROR,
            payload: newProfile
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