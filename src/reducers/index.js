import { combineReducers } from "redux";
import auth from "./auth_reducer";
import food from "./food_reducer";

////////////////////////////////////////////////////////////////////////
// Combines reducers and assigns reducer names
export default combineReducers({
  auth,
  food
});