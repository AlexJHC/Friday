import React from 'react'
import {CardType} from '../../../api/api-cards'
import {dateConvertor} from '../../3.features/Helpers/Helpers'
import Button from '../../3.features/Button/Button'
import {Sort} from '../../3.features/Sort/Sort'
import {CardsSortType} from '../../../store/cardsReducer'
import {EditableSpan} from '../../3.features/EditableSpan/EditableSpan'

type CardsTablePropsType = {
  cards: CardType[]
  isMyCards: boolean
  removeCard: (id: string) => void
  sortItems: () => void
  sortValue: CardsSortType
  editField: (_id: string, fieldName: string, newFieldName: string) => void
}

const CardsTable: React.FC<CardsTablePropsType> = (
  {
    cards,
    isMyCards,
    removeCard,
    sortItems,
    sortValue,
    editField,
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
      <td>🖊️
        <EditableSpan fieldName={question}
                      editField={(newFieldName) => editField(_id, 'question', newFieldName)}/>
      </td>
      <td>🖊️
        <EditableSpan fieldName={answer}
                      editField={(newFieldName) => editField(_id, 'answer', newFieldName)}/>
      </td>
      <td>{dateConvertor(updated)}</td>
      <td>{grade}</td>
      <td>
        {isMyCards &&
          <Button onClick={() => removeCard(_id)}>Remove</Button>}
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
