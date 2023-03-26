import {
    GET_ERROR
} from "../actions/type";
const initalState = {}

export default function (state = initalState, action) {
    switch (action.type) {
        case GET_ERROR:
            return action.payload
        default:
            return state;
    }
}