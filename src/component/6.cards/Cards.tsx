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
  setSortCards
} from '../../store/cardsReducer'
import {Navigate, useParams} from 'react-router-dom'
import AddCardForm from './AddCardForm/AddCardForm'
import PageCountSelect from '../3.features/PageCountSelect/PageCountSelect'

const Cards = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)
  const cardsState = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)
  const myId = useSelector<AppRootStateType, string>(state => state.profile.user._id)
  const isMyCards = (myId === cardsState.packUserId)
  const {cardsPack_id} = useParams()

  useEffect(() => {
    if (cardsPack_id) {
      dispatch(fetchCards(cardsPack_id))
    }
  }, [dispatch, cardsState.page, cardsState.pageCount, cardsState.sortCards])

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

  const sortCards = () => {
    dispatch(setSortCards(cardsState.sortCards === '0grade' ? '1grade' : '0grade'))
  }

  if (!isAuth) return <Navigate to="/"/>

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
        {isMyCards && <AddCardForm addCard={addNewCard}/>}
      </div>
      <div>
        <CardsTable cards={cardsState.cards}
                    isMyCards={isMyCards}
                    removeCard={removeCardHandle}
                    sortValue={cardsState.sortCards}
                    sortItems={sortCards}
        />
      </div>
      <div>
        <Pagination
          totalRecords={cardsState.cardsTotalCount}
          pageLimit={cardsState.pageCount}
          pageNeighbours={3}
          currentPage={cardsState.page}
          onPageChanged={onPageChanged}/>
      </div>
      <div>
        <PageCountSelect selectedPageCount={cardsState.pageCount}
                         options={[5, 10, 15, 20]}
                         changeOption={setPageCount}>
          cards
        </PageCountSelect>
      </div>
    </>
  )
}

export default Cards
