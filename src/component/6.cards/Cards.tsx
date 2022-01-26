import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {Pagination} from '../3.features/Pagination/Pagination'
import {
  CardsInitialStateType,
  createCard,
  fetchCards,
  setCardsCurrentPage,
  setCardsPageCount
} from '../../store/cardsReducer'
import {Navigate, useParams} from 'react-router-dom'
import AddCardForm from './AddCardForm/AddCardForm'
import PageCountSelect from '../3.features/PageCountSelect/PageCountSelect'
import CardsTable from './CardsTable/CardsTable'

const CARDS_PAGE_COUNT_OPTIONS = [5, 10, 15, 20]

const Cards = () => {

  const dispatch = useDispatch()
  const {
    packUserId,
    page,
    pageCount,
    sortCards,
    cardsTotalCount,
  } = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)
  const myId = useSelector<AppRootStateType, string>(state => state.profile.user._id)
  const isMyCards = (myId === packUserId)
  const {cardsPack_id} = useParams()

  useEffect(() => {
    if (cardsPack_id) dispatch(fetchCards(cardsPack_id))
  }, [dispatch, page, pageCount, sortCards])

  const handlePageChange = useCallback((page: number) => {
    dispatch(setCardsCurrentPage(page))
  }, [dispatch])
  const addNewCard = useCallback((question: string, answer: string) => {
    if (cardsPack_id) dispatch(createCard({cardsPack_id, question, answer}))
  }, [dispatch])
  const setPageCount = useCallback((option: number) => {
    dispatch(setCardsPageCount(option))
  }, [dispatch])

  if (!isAuth) return <Navigate to="/"/>

  return (
    <>
      <div>
        {isMyCards && <AddCardForm addCard={addNewCard}/>}
      </div>
      <div>
        <CardsTable isMyCards={isMyCards} packId={cardsPack_id}/>
      </div>
      <div>
        <Pagination totalRecords={cardsTotalCount}
                    pageLimit={pageCount}
                    pageNeighbours={3}
                    currentPage={page}
                    onPageChanged={handlePageChange}/>
      </div>
      <div>
        <PageCountSelect selectedPageCount={pageCount}
                         options={CARDS_PAGE_COUNT_OPTIONS}
                         changeOption={setPageCount}>
          cards
        </PageCountSelect>
      </div>
    </>
  )
}

export default Cards
