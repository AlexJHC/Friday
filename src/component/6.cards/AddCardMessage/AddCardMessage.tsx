import React, {useState} from 'react'
import InputText from '../../3.features/InputText/InputText'
import Button from '../../3.features/Button/Button'
import style from './AddCardMessage.module.css'
import {useDispatch} from 'react-redux'
import {setError} from '../../../store/appReducer'

type AddCardPropsType = {
  addCard: (question: string, answer: string) => void
  closePopUp: (status: boolean) => void
}

const AddCardMessage: React.FC<AddCardPropsType> = React.memo((
  {
    addCard,
    closePopUp,
  }) => {

  const dispatch = useDispatch()

  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  const handlePopUpHide = () => {
    closePopUp(false)
    setAnswer('')
    setQuestion('')
  }
  const handleCardAdd = () => {
    if (question.trim() === '') {
      dispatch(setError('Question field is required!'))
    } else if (answer.trim() === '') {
      dispatch(setError('Answer field is required!'))
    } else {
      addCard(question.trim(), answer.trim())
      handlePopUpHide()
    }
  }

  return (
    <div className={style.body}>
      <div>
        <span>Question</span>
        <InputText value={question}
                   placeholder="Question"
                   onChangeText={setQuestion}
        />
      </div>
      <div>
        <span>Answer</span>
        <InputText value={answer}
                   placeholder="Answer"
                   onChangeText={setAnswer}
        />
      </div>
      <div className={style.btnWrapper}>
        <Button padding={'45px'}
                onClick={handlePopUpHide}
                className={style.btnCancel}>Cancel</Button>
        <Button padding={'45px'}
                onClick={handleCardAdd}
                className={style.btnAdd}>Add Card </Button>
      </div>
    </div>
  )
})

export default AddCardMessage
