import React, {useEffect} from 'react'
import {Search} from '../3.features/Search/Search'
import CardsTable from './CardsTable/CardsTable'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {Pagination} from '../3.features/Pagination/Pagination'
import {CardsStateType, fetchCards} from '../../store/cardsReducer'
import {DoubleRange} from '../3.features/DoubleRange/DoubleRange'
import {Sort} from '../3.features/Sort/Sort'

const Cards = () => {

  const dispatch = useDispatch()
  const cardsState = useSelector<AppRootStateType, CardsStateType>(state => state.cards)

  useEffect(() => {
    dispatch(fetchCards())
  }, [dispatch])

  const onPageChanged = () => {
  }

  return (
    <>
      <div>
        <Search/>
      </div>
      <div>
        <DoubleRange/>
      </div>
      <div>
        <Sort/>
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
