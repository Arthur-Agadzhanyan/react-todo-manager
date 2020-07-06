import { ADD_BOARD, ADD_CARD, REMOVE_BOARD, REMOVE_CARD, EDIT_TITLE } from "./constants";

let initialState = [];

if(localStorage.getItem('storage')){
    initialState=JSON.parse(localStorage.getItem('storage'))
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_BOARD:
            return [
                ...state,
                {
                    title: action.title,
                    id: action.id,
                    change: false,
                    cards: []
                }
            ]

        case ADD_CARD:
            return state.map(
                (card) => (
                    action.id === card.id

                        ? {
                            title: card.title,
                            id: card.id,
                            change: card.change,
                            cards: [...card.cards, { body: action.body, change: false, id: action.id, cardId: action.cardId }]
                        }
                        : card
                )
            )
        case REMOVE_BOARD:
            return state.filter(({ id }) => id !== action.id);
        case REMOVE_CARD:
            return state.map(board => {
                return {
                    title: board.title,
                    id: board.id,
                    change: board.change,
                    cards: board.cards.filter((card) => card.cardId !== action.cardId)
                }
            })
        case 'EDIT_CARD':
            return state.map((card) => (
                

                    {
                        title: card.title,
                        id: card.id,
                        change: card.change,
                        cards: card.cards.map(card=>(
                            action.cardId === card.cardId
                            ?{
                                ...card,
                                body: action.body,
                                change: !card.change
                            }: card
                        ))
                    }
                    
            ))
            case 'EDIT_CARD_BTN':
            return state.map((card) => (
                

                    {
                        title: card.title,
                        id: card.id,
                        change: card.change,
                        cards: card.cards.map(card=>(
                            action.cardId === card.cardId
                            ?{
                                ...card,
                                change: !card.change
                            }: card
                        ))
                    }
                    
            ))
            
        case EDIT_TITLE:
            return state.map(
                (card) => (
                    action.id === card.id
                        ? {
                            ...card,
                            title: action.title,
                            change: !card.change,
                        }
                        : card
                )
            )
        case 'CHANGE':
            return state.map((board) =>
                action.id === board.id
                    ? {
                        ...board,
                        change: !board.change, 
                    }
                    : board
            ) 
        default:
            return state
    }

}
