import {
    ADD_POST,
    GET_POSTS,
    POST_LOADING,
    DELETE_POST
} from "../type";
import isEmpty from "../validation/is-empty";

const initalState = {
    posts: [],
    post: {},
    loading: false
}

export default function (state = initalState, action) {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            }
            case GET_POSTS:
                return {
                    ...state,
                    posts: action.payload,
                        loading: false
                }
                case ADD_POST:
                    return {
                        ...state,
                        posts: [action.payload, ...state.posts]
                    }
                    case DELETE_POST:
                        return {
                            ...state,
                            posts: state.posts.filter(post => post._id !== action.payload)
                        }
                        default:
                            return state;
    }
}