import React from 'react'
import {CardType} from '../../../api/api-cards'
import {dateConvertor} from '../../3.features/Helpers/Helpers'

type PropsType = {
  cards: CardType[]
}

const CardsTable = ({cards}: PropsType) => {

  const tableHead =
    <thead>
    <tr>
      <th>Question</th>
      <th>Answer</th>
      <th>Last Updated</th>
      <th>Grade</th>
      <th>Actions</th>
    </tr>
    </thead>

  const tableBodyMap = cards.map(({_id, question, answer, updated, grade}) =>
    <tbody key={_id}>
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{dateConvertor(updated)}</td>
      <td>{grade}</td>
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