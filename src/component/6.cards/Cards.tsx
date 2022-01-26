import React, {useEffect} from 'react'
import CardsTable from './CardsTable/CardsTable'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {Pagination} from '../3.features/Pagination/Pagination'
import {
  CardsInitialStateType,
  createCard,
  fetchCards,
  removeCard,
  setCardsCurrentPage,
  setCardsPageCount,
  setSortCards, updateCards
} from '../../store/cardsReducer'
import {Navigate, useParams} from 'react-router-dom'
import AddCardForm from './AddCardForm/AddCardForm'
import PageCountSelect from '../3.features/PageCountSelect/PageCountSelect'

const Cards = () => {

  const dispatch = useDispatch()
  const {
    packUserId,
    page,
    pageCount,
    sortCards,
    cardsTotalCount,
    cards,
  } = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)
  const myId = useSelector<AppRootStateType, string>(state => state.profile.user._id)
  const isMyCards = (myId === packUserId)
  const {cardsPack_id} = useParams()

  useEffect(() => {
    if (cardsPack_id) {
      dispatch(fetchCards(cardsPack_id))
    }
  }, [dispatch, page, pageCount, sortCards])

  const onPageChanged = (page: number) => {
    dispatch(setCardsCurrentPage(page))
  }
  const addNewCard = (question: string, answer: string) => {
    if (cardsPack_id) {
      dispatch(createCard({cardsPack_id, question, answer}))
    }
  }
  const removeCardHandle = (id: string) => {
    if (cardsPack_id) {
      dispatch(removeCard(id, cardsPack_id))
    }
  }
  const setPageCount = (option: number) => {
    dispatch(setCardsPageCount(option))
  }
  const setSortedCards = (sortValue: string) => {
    dispatch(setSortCards(sortValue))
  }
  const editField = (_id: string, fieldName: string, newFieldName: string) => {
    if (cardsPack_id) {
      dispatch(updateCards({cardsPack_id, _id, [fieldName]: newFieldName}))
    }
  }

  if (!isAuth) return <Navigate to="/"/>

  return (
    <>
      <div>
        {isMyCards && <AddCardForm addCard={addNewCard}/>}
      </div>
      <div>
        <CardsTable cards={cards}
                    isMyCards={isMyCards}
                    removeCard={removeCardHandle}
                    sortItems={setSortedCards}
                    editField={editField}/>

      </div>
      <div>
        <Pagination totalRecords={cardsTotalCount}
                    pageLimit={pageCount}
                    pageNeighbours={3}
                    currentPage={page}
                    onPageChanged={onPageChanged}/>
      </div>
      <div>
        <PageCountSelect selectedPageCount={pageCount}
                         options={[5, 10, 15, 20]}
                         changeOption={setPageCount}>
          cards
        </PageCountSelect>
      </div>
    </>
  )
}

export default Cards
