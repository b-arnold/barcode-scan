import { AsyncStorage } from 'react-native';
import { SecureStore } from 'expo';
import axios from 'axios';
import { SPOONACULAR_UPC_CONFIG } from '../constants/api_keys';
import firebase from 'firebase';
import { 
    FIRST_SCAN_CHANGED,
    GET_FOOD_UPC,
    FOOD_ID_CHECK,
    LIKE_FOOD,
    FETCH_FOOD_DETAILS,
    FETCH_COMPARE_DETAILS,
    FETCH_FOOD_ID_DETAILS
} from './types';

const FOOD_ROOT_URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/";
const FOOD_HEADERS = {
    headers: {"X-Mashape-Key": "K1Gjrpp6ramshdkdbXnBqcuDGC5Ap12Fu4fjsnrLnCgBirklvr",
    "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"}
};

const buildFoodURL = (upc) => {
    return `${FOOD_ROOT_URL}upc/${upc}`;
}

const buildCompareURL = (upc) => {
    return `${FOOD_ROOT_URL}upc/${upc}/comparable`;
}

const buildFoodIdURL = (id) => {
    return `${FOOD_ROOT_URL}${id}`;
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////   BARCODE METHODS   ///////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Called when firstScan state is changed
export const firstScanChanged = scan => ({
    type: FIRST_SCAN_CHANGED,
    payload: scan
  });

// Called to update the food UPC
export const getFoodUPC = upc => ({
    type: GET_FOOD_UPC,
    payload: upc
});

// Called to check if to show compare food info
export const foodIdCheck = check => ({
    type: FOOD_ID_CHECK,
    payload: check
});

export const likeFood = (food) => {
    return {
        type: LIKE_FOOD,
        payload: food
    };
};

// Called to access the information based on the upc
export const fetchFoodDetails = upc => async (dispatch) => {

    try {
        const url = buildFoodURL(upc);
        let { data }  = await axios.get( url, FOOD_HEADERS);
        //console.log(food);

        dispatch({ type: FETCH_FOOD_DETAILS, payload: data });
    } catch(err) {
        console.log(err);
    }
};

export const fetchCompareDetails = upc => async (dispatch) => {
    
    try {
        const url = buildCompareURL(upc);
        let { data }  = await axios.get( url, FOOD_HEADERS);
        //console.log(food);
    
        dispatch({ type: FETCH_COMPARE_DETAILS, payload: data });
    } catch(err) {
        console.log(err);
    }
};

export const fetchFoodIdDetails = id => async (dispatch) => {
    
    try {
        const url = buildFoodIdURL(id);
        let { data }  = await axios.get( url, FOOD_HEADERS);
        //console.log(food);
    
        dispatch({ type: FETCH_FOOD_ID_DETAILS, payload: data });
    } catch(err) {
        console.log(err);
    }
};
