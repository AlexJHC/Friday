import React, {useCallback, useState} from 'react'
import style from './CardsTableBody.module.css'
import {dateConvertor} from '../../../../utils/helpers'
import {CardType} from '../../../../api/api-cards'
import PopUp2 from '../../../3.features/PopUp2/PopUp2'
import RemoveCardMessage from '../RemoveCardMessage/RemoveCardMessage'
import EditCardMessage from '../EditCardMessage/EditCardMessage'

type CardsTableBodyPropsType = {
  card: CardType
  isMyCards: boolean
  removeCard: (_id: string) => void
  editCard: (_id: string, question: string, answer: string) => void
}

const CardsTableBody: React.FC<CardsTableBodyPropsType> = React.memo((
  {
    card,
    isMyCards,
    removeCard,
    editCard,
  }) => {

  const [removeCardPopUpStatus, setRemoveCardPopUpStatus] = useState<boolean>(false)
  const [editCardPopUpStatus, setEditCardPopUpStatus] = useState<boolean>(false)
  const {_id, question, answer, updated, grade} = card

  const handleCardRemove = useCallback(() => removeCard(_id), [])
  const handleCardEdit = useCallback((question: string, answer: string) => {
    editCard(_id, question, answer)
  }, [])
  const handleRemoveButtonClick = useCallback(() => {
    setRemoveCardPopUpStatus(true)
  }, [])
  const handleEditButtonClick = useCallback(() => {
    setEditCardPopUpStatus(true)
  }, [])

  return (
    <tbody>
    <tr>
      <td>{question}</td>
      <td>{answer}</td>
      <td>{dateConvertor(updated)}</td>
      <td>{grade}</td>
      <td>
        {isMyCards && <>
          <button onClick={handleRemoveButtonClick}
                  className={style.btnDelete}>Delete
          </button>
          <PopUp2 name="Remove card"
                  popUpStatus={removeCardPopUpStatus}
                  changeStatus={setRemoveCardPopUpStatus}>
            <RemoveCardMessage closePopUp={setRemoveCardPopUpStatus}
                               removeCard={handleCardRemove}/>
          </PopUp2>
          <button onClick={handleEditButtonClick}
                  className={style.btn}>Edit
          </button>
          <PopUp2 name="Edit card"
                  popUpStatus={editCardPopUpStatus}
                  changeStatus={setEditCardPopUpStatus}>
            <EditCardMessage question={question}
                             answer={answer}
                             closePopUp={setEditCardPopUpStatus}
                             editCard={handleCardEdit}/>
          </PopUp2>
        </>}
      </td>
    </tr>
    </tbody>
  )
})

export default CardsTableBody
