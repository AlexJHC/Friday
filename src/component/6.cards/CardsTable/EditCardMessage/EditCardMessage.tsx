import React, {useState} from 'react'
import Button from '../../../3.features/Button/Button'
import style from './EditCardMessage.module.css'
import InputText from '../../../3.features/InputText/InputText'

type RemoveCardPropsType = {
  question: string
  answer: string
  closePopUp: (status: boolean) => void
  editCard: (question: string, answer: string) => void
}

const EditCardMessage: React.FC<RemoveCardPropsType> = React.memo((
  {
    question,
    answer,
    closePopUp,
    editCard,
  }) => {

  const [newQuestion, setNewQuestion] = useState<string>('')
  const [newAnswer, setNewAnswer] = useState<string>('')

  const handlePopUpHide = () => {
    closePopUp(false)
    setNewAnswer('')
    setNewQuestion('')
  }
  const handleCardEdit = () => {
    editCard(newQuestion, newAnswer)
    handlePopUpHide()
  }

  return (
    <div className={style.deletePackWrapper}>
      <div>
        <span>Please edit necessary fields</span>
        <br/>
        <span>New question</span>
        <InputText value={newQuestion}
                   placeholder={question}
                   onChangeText={setNewQuestion}/>
        <br/>
        <span>New answer</span>
        <InputText value={newAnswer}
                   placeholder={answer}
                   onChangeText={setNewAnswer}/>

      </div>
      <div className={style.deletePackBtnWrapper}>
        <Button padding={'45px'}
                onClick={handlePopUpHide}
                className={style.deletePackBtnCancel}>Cancel</Button>
        <Button padding={'45px'}
                onClick={handleCardEdit}
                className={style.deletePackBtn}>Edit</Button>
      </div>
    </div>
  )
})

export default EditCardMessage
