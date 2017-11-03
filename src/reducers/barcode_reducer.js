import {
    FIRST_SCAN_CHANGED
} from '../actions/types'

const INITIAL_STATE = {
    scan: true
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FIRST_SCAN_CHANGED:
            return { ...state, scan: action.payload };
        default:
            return state;
    }
}