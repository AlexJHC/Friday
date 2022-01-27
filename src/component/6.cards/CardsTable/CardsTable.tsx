import React, {useCallback} from 'react'
import {CardType} from '../../../api/api-cards'
import CardsTableBody from './CardsTableBody/CardsTableBody'
import CardsTableHeader from './CardsTableHeader/CardsTableHeader'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../store/store'
import {removeCard, setSortCards, updateCards} from '../../../store/cardsReducer'

type CardsTablePropsType = {
  isMyCards: boolean
  cardsPack_id: string | undefined
}

const CardsTable: React.FC<CardsTablePropsType> = React.memo((
  {
    isMyCards,
    cardsPack_id,
  }) => {

  const dispatch = useDispatch()
  const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)

  const handleCardRemove = useCallback((id: string) => {
    if (cardsPack_id) dispatch(removeCard(id, cardsPack_id))
  }, [dispatch])
  const handleCardEdit = useCallback((_id: string, question: string, answer: string) => {
    if (cardsPack_id) dispatch(updateCards({cardsPack_id, _id, question, answer}))
  }, [dispatch])
  const sortCards = useCallback((sortValue: string) => {
    dispatch(setSortCards(sortValue))
  }, [dispatch])

  const tableBodyMap = cards.map((card) =>
    <CardsTableBody key={card._id}
                    card={card}
                    isMyCards={isMyCards}
                    removeCard={handleCardRemove}
                    editCard={handleCardEdit}/>)

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
