import React from 'react'
import {CardType} from '../../../api/api-cards'
import {dateConvertor} from '../../3.features/Helpers/Helpers'
import Button from '../../3.features/Button/Button'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../../store/store'

type CardsTablePropsType = {
  cards: CardType[]
  userId: string
  removeCard: (id: string) => void
}

const CardsTable: React.FC<CardsTablePropsType> = ({cards, userId, removeCard}) => {

  const myId = useSelector<AppRootStateType, string>(state => state.profile.user._id)

  const tableHead =
    <thead>
    <tr>
      <th>Question</th>
      <th>Answer</th>
      <th>Last Updated</th>
      <th>Grade</th>
      <th>
        {userId === myId && 'Actions'}
      </th>
    </tr>
    </thead>

  const tableBodyMap = cards.map(({_id, question, answer, updated, grade, user_id}) =>
    <tbody key={_id}>
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{dateConvertor(updated)}</td>
      <td>{grade}</td>
      <td>
        {user_id === myId && <>
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