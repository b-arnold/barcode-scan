import {
    FIRST_SCAN_CHANGED,
    GET_FOOD_UPC,
    FOOD_ID_CHECK,
    FETCH_FOOD_DETAILS,
    FETCH_COMPARE_DETAILS,
    FETCH_FOOD_ID_DETAILS
} from '../actions/types'

const INITIAL_STATE = {
    scan: true,
    upc: '',
    check: false,
    food: null,
    compare: null,
    foodId: null,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FIRST_SCAN_CHANGED:
            return { ...state, scan: action.payload };
        case GET_FOOD_UPC:
            return { ...state, upc: action.payload };
        case FOOD_ID_CHECK:
            console.log(action.payload)
            return { ...state, check: action.payload};
        case FETCH_FOOD_DETAILS:
            //console.log(action.payload);
            return { ...state, food: action.payload };
        case FETCH_COMPARE_DETAILS:
            return { ...state, compare: action.payload };
        case FETCH_FOOD_ID_DETAILS:
            return { ...state, foodId: action.payload };
        default:
            return state;
    }
}