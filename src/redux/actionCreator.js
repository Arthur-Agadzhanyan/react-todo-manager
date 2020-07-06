import {ADD_BOARD, ADD_CARD,REMOVE_BOARD,REMOVE_CARD,EDIT_TITLE, CHANGE_THEME} from './constants'

export function addBoard(title){
    return {
        type: ADD_BOARD,
        title: title,
        id: Math.random() * 10000000000000000000000000000000000000000000000000
    }
}

export function addCard(id,body){
    return {
        type: ADD_CARD,
        id,
        body,
        cardId: Math.random() * 1000000000000000000000000000000000000000000000000000000
    }
}

export function removeBoard(id){
    return {
        type: REMOVE_BOARD,
        id,
    }
}

export function removeCard(cardId){
    return {
        type: REMOVE_CARD,
        cardId,
    }
}

export function editTitle(id,title){
    return {
        type: EDIT_TITLE,
        id,
        title
    }
}

export function change(id){
    return {
        type: 'CHANGE',
        id
    }
}

export function editCard(cardId,body){
    return {
        type: 'EDIT_CARD',
        cardId,
        body
    }
}

export function editCardBtn(cardId){
    return {
        type: 'EDIT_CARD_BTN',
        cardId,
    }
}

export function changeTheme(){
    return {
        type: CHANGE_THEME
    }
}