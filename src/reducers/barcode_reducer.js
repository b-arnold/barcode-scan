import {
    FIRST_SCAN_CHANGED,
    GET_FOOD_UPC,
    FETCH_FOOD_DETAILS
} from '../actions/types'

const INITIAL_STATE = {
    scan: true,
    upc: '',
    food: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FIRST_SCAN_CHANGED:
            return { ...state, scan: action.payload };
        case GET_FOOD_UPC:
            return { ...state, upc: action.payload };
        case FETCH_FOOD_DETAILS:
            //console.log(action.payload);
            return { ...state, food: action.payload };
        default:
            return state;
    }
}