import React, { useState } from 'react';
import './styles/main.css';
import './styles/dark.css';
import { connect } from 'react-redux';
import { addBoard, addCard, removeBoard, removeCard, editTitle, change, editCard, editCardBtn, changeTheme } from './redux/actionCreator';

function App(props) {
  const [state, setstate] = useState(false);

  const addInput = React.createRef()

  function addBoard(e) {
    e.preventDefault();
    setstate(false)
    if (addInput.current.value === '') {
      alert('Write board title!')
    } else {
      props.onAddBoard(addInput.current.value)
    }
  }

  React.useEffect(() => {
    localStorage.setItem('storage', JSON.stringify(props.state))
    localStorage.setItem('theme', JSON.stringify(props.theme))
  })

  const addCard = (id) =>
    (e) => {
      e.preventDefault()
      if (e.target[0].value === '') {
        alert('Write card!')
      } else {
        props.onAddCard(id, e.target[0].value)
        e.target[0].value = ''
      }
    }
  const addTitle = (id) =>
    (e) => {
      e.preventDefault()
      if (e.target[0].value === '') {
        alert('Write Title!')
      } else {
        props.onEditTitle(id, e.target[0].value)
        e.target[0].value = ''
      }
    }
  const editCard = (id) =>
    (e) => {
      e.preventDefault()
      if (e.target[0].value === '') {
        alert('Write Card title!')
      } else {
        props.onEditCard(id, e.target[0].value)
        e.target[0].value = ''
    }
  }

  if(props.theme){
    document.body.classList.add('dark')
  }
  if(props.theme === false){
    document.body.classList.remove('dark')
  }

  return (
    <>
    <div className='theme'>
      <button className='change__theme' onClick={()=>{props.onChangeTheme()}}>Change Theme</button>
    </div>
    
      <h1 className='title'>Todo Manager</h1>
      {/* <hr className='line'/> */}
      {state
        ?
        <form className='add__board-form' onSubmit={addBoard}>
          <input className='add__board-input' ref={addInput} type='text' />
          <button className='add__board-btn'>Add List</button>
        </form>
        : <div onClick={() => setstate(true)} className='add__board'>Add List</div>}
      <hr className='line' />

      <div className='wrapper'>
        <div className='board__list'>
          {props.state.map((board, index) => (

            <div key={index} className='board'>
              <button className='remove__board' onClick={() => props.onRemoveBoard(board.id)}>&times;</button>
              {board.change
                ? <form className='board__title-form' onSubmit={addTitle(board.id)}>
                  <input className='board__title-input' defaultValue={board.title} type='text' />
                </form>
                : <h1 className='board__title' onClick={() => props.onTitleChange(board.id)} >{board.title}</h1>}

              <form className='add__card-form' onSubmit={addCard(board.id)}>
                <input className='add__card-input' type='text' name='username' placeholder='Add new card' />
              </form>

              <ul>
                {board ? board.cards.map((card, index) => (
                  <li className='card' key={index}>
                    { card.change 
                    ? <form className='edit__card-form' onSubmit={editCard(card.cardId)}>
                        <input className='edit__card-input' defaultValue={card.body} type='text' name='name' />
                      </form> 
                    : <span onClick={()=>{props.editCardBtn(card.cardId)}} className='card__text'>{card.body}</span>}

                    <button className='card__remove' onClick={() => props.onRemoveCard(card.cardId)}>&times;</button>
                  </li>
                )) : board}
              </ul>
            </div>

          )

          )}
        </div>

      </div>
      <hr className='line' />
    </>
  );
}

const stateToProps = state => ({
  state: state.app,
  theme: state.theme
})

const dispatchToProps = dispatch => ({
  onAddBoard: title => {
    dispatch(addBoard(title))
  },
  onAddCard: (id, body) => {
    dispatch(addCard(id, body))
  },
  onRemoveBoard: id => {
    dispatch(removeBoard(id))
  },
  onRemoveCard: cardId => {
    dispatch(removeCard(cardId))
  },
  onEditTitle: (id, title) => {
    dispatch(editTitle(id, title))
  },
  onTitleChange: (id) => {
    dispatch(change(id))
  },
  onEditCard(cardId,body){
    dispatch(editCard(cardId,body))
  },
  editCardBtn(cardId){
    dispatch(editCardBtn(cardId))
  },
  onChangeTheme(){
    dispatch(changeTheme())
  }
})

export default connect(stateToProps, dispatchToProps)(App);
