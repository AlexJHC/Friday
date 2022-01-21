import React from 'react'
import {CardType} from '../../../api/api-cards'
import {dateConvertor} from '../../3.features/Helpers/Helpers'
import Button from '../../3.features/Button/Button'
import {Sort} from '../../3.features/Sort/Sort'
import {CardsSortType} from '../../../store/cardsReducer'

type CardsTablePropsType = {
  cards: CardType[]
  isMyCards: boolean
  removeCard: (id: string) => void
  sortItems: () => void
  sortValue: CardsSortType
}

const CardsTable: React.FC<CardsTablePropsType> = (
  {
    cards,
    isMyCards,
    removeCard,
    sortItems,
    sortValue,
  }) => {

  const tableHead =
    <thead>
    <tr>
      <th>Question</th>
      <th>Answer</th>
      <th>Last Updated</th>
      <th>Grade<Sort value={sortValue} sortItems={sortItems}/></th>
      {isMyCards && <th>Actions</th>}
    </tr>
    </thead>

  const tableBodyMap = cards.map(({_id, question, answer, updated, grade}) =>
    <tbody key={_id}>
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{dateConvertor(updated)}</td>
      <td>{grade}</td>
      <td>
        {isMyCards && <>
          <Button>Edit</Button>
          <Button onClick={() => removeCard(_id)}>Remove</Button>
        </>}
      </td>
    </tr>
    </tbody>
  )

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <table className="table" style={{borderSpacing: '55px 15px'}}>
        {tableHead}
        {tableBodyMap}
      </table>
    </div>
  )
}

export default CardsTable
