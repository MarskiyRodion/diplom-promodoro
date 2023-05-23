import { combineReducers } from "redux";
import { rootReducerStatistic } from "./reduserStatistic";
import { rootReducer } from "./reduserTask";

export default combineReducers({
    rootReducer,
    rootReducerStatistic
})