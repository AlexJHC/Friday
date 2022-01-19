import React, {useEffect} from 'react'
import CardsTable from './CardsTable/CardsTable'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {Pagination} from '../3.features/Pagination/Pagination'
import {
  CardsStateType,
  createCard,
  fetchCards, removeCard,
  setCardsCurrentPage
} from '../../store/cardsReducer'
import {useParams} from 'react-router-dom'
import AddCardForm from './AddCardForm/AddCardForm'

const Cards = () => {

  const dispatch = useDispatch()
  const cardsState = useSelector<AppRootStateType, CardsStateType>(state => state.cards)
  const {cardsPackId} = useParams<string>()

  useEffect(() => {
    if (cardsPackId) {
      dispatch(fetchCards(cardsPackId))
    }
  }, [dispatch, cardsState.page])

  const onPageChanged = (page: number) => {
    dispatch(setCardsCurrentPage(page))
  }
  const addNewCard = (question: string, answer: string) => {
    if (cardsPackId) {
      dispatch(createCard(cardsPackId, question, answer))
    }
  }
  const removeCardHandle = (id: string) => {
    if (cardsPackId) {
      dispatch(removeCard(id, cardsPackId))
    }
  }

  return (
    <>
      <div>
        {/*<Search/>*/}
      </div>
      <div>
        {/*double range will be here*/}
      </div>
      <div>
        {/*<Sort/>*/}
      </div>
      <div>
        <AddCardForm addCard={addNewCard}/>
      </div>
      <div>
        <CardsTable cards={cardsState.cards} removeCard={removeCardHandle}/>
      </div>
      <div>
        <Pagination
          totalRecords={cardsState.cardsTotalCount}
          pageLimit={cardsState.pageCount}
          pageNeighbours={3}
          currentPage={cardsState.page}
          onPageChanged={onPageChanged}/>
      </div>
    </>
  )
}

export default Cards
