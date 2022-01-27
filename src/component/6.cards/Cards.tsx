import React, {useCallback, useEffect, useState} from 'react'
import style from './Cards.module.css'
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
import AddCardMessage from './AddCardMessage/AddCardMessage'
import PageCountSelect from '../3.features/PageCountSelect/PageCountSelect'
import CardsTable from './CardsTable/CardsTable'
import Button from '../3.features/Button/Button'
import PopUp2 from '../3.features/PopUp2/PopUp2'

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
  const myId = useSelector<AppRootStateType, string>(state => state.auth.user._id)
  const [addCardPopUpStatus, setAddCardPopUpStatus] = useState<boolean>(false)
  const isMyCards = (myId === packUserId)
  const {cardsPack_id} = useParams()

  useEffect(() => {
    if (cardsPack_id) dispatch(fetchCards(cardsPack_id))
  }, [dispatch, page, pageCount, sortCards])

  const handlePageChange = useCallback((page: number) => {
    dispatch(setCardsCurrentPage(page))
  }, [dispatch])
  const handleNewCardAdd = useCallback((question: string, answer: string) => {
    if (cardsPack_id) dispatch(createCard({cardsPack_id, question, answer}))
  }, [dispatch])
  const setPageCount = useCallback((option: number) => {
    dispatch(setCardsPageCount(option))
  }, [dispatch])
  const handleAddCardButtonClick = useCallback(() => {
    setAddCardPopUpStatus(true)
  }, [])

  if (!isAuth) return <Navigate to="/"/>

  return (
    <div className={style.cardsWrapper}>
      <div>
        {isMyCards && <>
          <Button onClick={handleAddCardButtonClick}
                  padding={'20px'}>
            Add Card</Button>
          <PopUp2 name="Add new card"
                  popUpStatus={addCardPopUpStatus}
                  changeStatus={setAddCardPopUpStatus}>
            <AddCardMessage closePopUp={setAddCardPopUpStatus}
                            addCard={handleNewCardAdd}/>
          </PopUp2>
        </>}
      </div>
      <div>
        <CardsTable isMyCards={isMyCards} cardsPack_id={cardsPack_id}/>
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
    </div>
  )
}

export default Cards
