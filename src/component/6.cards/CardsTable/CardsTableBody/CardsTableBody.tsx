import React, {useCallback} from 'react'
import {dateConvertor} from '../../../3.features/Helpers/Helpers'
import Button from '../../../3.features/Button/Button'
import {CardType} from '../../../../api/api-cards'

type CardsTableBodyPropsType = {
  card: CardType
  isMyCards: boolean
  removeCard: (_id: string) => void
}
const CardsTableBody: React.FC<CardsTableBodyPropsType> = React.memo((
  {
    card,
    isMyCards,
    removeCard,
  }) => {

  const {_id, question, answer, updated, grade} = card

  const handleRemoveClick = useCallback(() => removeCard(_id), [])

  return (
    <tbody key={_id}>
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{dateConvertor(updated)}</td>
      <td>{grade}</td>
      <td>
        {isMyCards && <Button onClick={handleRemoveClick}>Remove</Button>}
      </td>
    </tr>
    </tbody>
  )
})

export default CardsTableBody
