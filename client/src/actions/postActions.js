import {
    ADD_POST,
    CLEAR_ERROR,
    DELETE_POST,
    GET_ERROR,
    GET_POSTS,
    POST_LOADING
} from "../type"

export const addPost = (postData) => async dispatch => {
    console.log(postData);

    const post = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.jwtToken
        },
        body: JSON.stringify(postData)
    })
    if (post.ok) {

        const newPost = await post.json()
        dispatch({
            type: ADD_POST,
            payload: newPost
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } else {
        const errorData = await post.json();
        dispatch({
            type: GET_ERROR,
            payload: errorData
        })
    }



}

//get all posts for post feed

export const getPosts = () => async dispatch => {

    setLoading()
    const posts = await fetch("http://localhost:5000/api/posts")
    if (posts.ok) {
        const newPost = await posts.json()
        dispatch({
            type: GET_POSTS,
            payload: newPost
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } else {

        dispatch({
            type: GET_POSTS,
            payload: null
        })
    }


}


//delete post from post feed

export const deletePost = (id) => async dispatch => {

    setLoading()
    const posts = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.jwtToken
        }
    })
    if (posts.ok) {
        await posts.json()
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch({
            type: CLEAR_ERROR
        })
    } else {
        const error = await posts.json()
        dispatch({
            type: GET_ERROR,
            payload: error
        })
    }


}

//add like to the post

export const addLike = (id) => async dispatch => {

    const posts = await fetch(`http://localhost:5000/api/posts/like/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.jwtToken
        }
    })
    if (posts.ok) {
        await posts.json()
        dispatch(getPosts())
        dispatch({
            type: CLEAR_ERROR
        })
    } else {
        const error = await posts.json()
        dispatch({
            type: GET_ERROR,
            payload: error
        })
    }


}

//remove like from the post

export const removeLike = (id) => async dispatch => {

    const posts = await fetch(`http://localhost:5000/api/posts/unlike/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.jwtToken
        }
    })
    if (posts.ok) {
        await posts.json()
        dispatch(getPosts())
        dispatch({
            type: CLEAR_ERROR
        })
    } else {
        const error = await posts.json()
        dispatch({
            type: GET_ERROR,
            payload: error
        })
    }


}


//set post loading

const setLoading = () => {
    return {
        type: POST_LOADING
    }
}