import { AsyncStorage } from 'react-native';
import { SecureStore } from 'expo';
import axios from 'axios';
import { SPOONACULAR_UPC_CONFIG } from '../constants/api_keys';
import firebase from 'firebase';
import { 
    FIRST_SCAN_CHANGED,
    GET_FOOD_UPC,
    FETCH_FOOD_DETAILS
} from './types';

const FOOD_ROOT_URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/upc/";
const FOOD_HEADERS = {
    headers: {"X-Mashape-Key": "K1Gjrpp6ramshdkdbXnBqcuDGC5Ap12Fu4fjsnrLnCgBirklvr",
    "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"}
};

const buildFoodURL = (upc) => {
    return `${FOOD_ROOT_URL}${upc}`;
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