import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import {
    LIKE_FOOD
} from '..actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case REHYDRATE:
            console.log(action.type)
            return action.payload.likedFoods || [];
        case LIKE_Food:
            return _.uniqBy([
                action.payload, ...state
            ], 'foodKey');
        default:
            return state;
    }
}