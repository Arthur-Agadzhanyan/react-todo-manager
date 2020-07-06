import  theme  from "./themeReducer";
import  app  from "./appReducer";
import { combineReducers } from "redux";

export default combineReducers({
    app,
    theme
})
