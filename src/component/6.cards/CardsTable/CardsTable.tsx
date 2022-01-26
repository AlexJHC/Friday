import React, {useCallback} from 'react'
import {CardType} from '../../../api/api-cards'
import CardsTableBody from './CardsTableBody/CardsTableBody'
import CardsTableHeader from './CardsTableHeader/CardsTableHeader'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../store/store'
import {removeCard, setSortCards} from '../../../store/cardsReducer'

type CardsTablePropsType = {
  isMyCards: boolean
  packId: string | undefined
}

const CardsTable: React.FC<CardsTablePropsType> = React.memo((
  {
    isMyCards,
    packId,
  }) => {

  const dispatch = useDispatch()
  const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)

  const handleCardRemove = useCallback((id: string) => {
    if (packId) dispatch(removeCard(id, packId))
  }, [dispatch])
  const sortCards = useCallback((sortValue: string) => {
    dispatch(setSortCards(sortValue))
  }, [dispatch])

  const tableBodyMap = cards.map((card) =>
    <CardsTableBody card={card}
                    isMyCards={isMyCards}
                    removeCard={handleCardRemove}/>)

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <table className="table" style={{borderSpacing: '55px 15px'}}>
        <CardsTableHeader isMyCards={isMyCards} sortCards={sortCards}/>
        {tableBodyMap}
      </table>
    </div>
  )
})

export default CardsTable
