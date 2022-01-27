import React, {useCallback, useState} from 'react'
import {dateConvertor} from '../../../3.features/Helpers/Helpers'
import Button from '../../../3.features/Button/Button'
import {CardType} from '../../../../api/api-cards'
import PopUp2 from '../../../3.features/PopUp2/PopUp2'
import RemoveCardMessage from '../RemoveCardMessage/RemoveCardMessage'

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

  const [removeCardPopUpStatus, setRemoveCardPopUpStatus] = useState<boolean>(false)
  const {_id, question, answer, updated, grade} = card

  const handleCardRemove = useCallback(() => removeCard(_id), [])
  const handleRemoveButtonClick = () => setRemoveCardPopUpStatus(true)

  return (
    <tbody key={_id}>
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{dateConvertor(updated)}</td>
      <td>{grade}</td>
      <td>
        {isMyCards && <>
          <Button onClick={handleRemoveButtonClick}>Remove</Button>
          <PopUp2 name="Remove card"
                  popUpStatus={removeCardPopUpStatus}
                  changeStatus={setRemoveCardPopUpStatus}>
            <RemoveCardMessage closePopUp={setRemoveCardPopUpStatus}
                               removeCard={handleCardRemove}/>
          </PopUp2>
        </>}
      </td>
    </tr>
    </tbody>
  )
})

export default CardsTableBody
