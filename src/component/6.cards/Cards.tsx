import React from 'react'
import {Search} from '../3.features/Search/Search'
import CardsTable from './CardsTable/CardsTable'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {Pagination} from '../3.features/Pagination/Pagination'
import {CardsStateType} from '../../store/cardsReducer'

const Cards = () => {

  const cardsState = useSelector<AppRootStateType, CardsStateType>(state => state.cards)

  const onPageChanged = () => {
  }

  return (
    <>
      <div>
        <Search/>
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
