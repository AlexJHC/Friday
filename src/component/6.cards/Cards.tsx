import React, {useEffect} from 'react'
import CardsTable from './CardsTable/CardsTable'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {Pagination} from '../3.features/Pagination/Pagination'
import {CardsStateType, fetchCards, setCardsCurrentPage} from '../../store/cardsReducer'
import {useParams} from 'react-router-dom'

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
        {/* add card form will be here*/}
      </div>
      <div>
        <CardsTable cards={cardsState.cards}/>
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
