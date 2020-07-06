const { CHANGE_THEME } = require("./constants")

let initialTheme = false

if(localStorage.getItem('theme')){
    initialTheme=JSON.parse(localStorage.getItem('theme'))
}

export default function themeReducer(state=initialTheme,action){
    switch(action.type){
        case CHANGE_THEME:
            return !state
        default:
            return state
    }
}