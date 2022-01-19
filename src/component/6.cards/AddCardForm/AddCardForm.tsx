import React, {useState} from 'react'
import InputText from '../../3.features/InputText/InputText'
import Button from '../../3.features/Button/Button'
import style from './AddCardForm.module.css'
import {useDispatch} from 'react-redux'
import {setError} from '../../../store/appReducer'

type AddCardPropsType = {
  addCard: (question: string, answer: string) => void
}

const AddCardForm: React.FC<AddCardPropsType> = ({addCard}) => {

  const dispatch = useDispatch()

  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  const handleClick = () => {
    if (question.trim() === '') {
      dispatch(setError('Question field is required!'))
    } else if (answer.trim() === '') {
      dispatch(setError('Answer field is required!'))
    } else {
      addCard(question.trim(), answer.trim())
      setQuestion('')
      setAnswer('')
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
      <div className={style.btn}>
        <Button onClick={handleClick}>Add Card</Button>
      </div>
    </div>
  )
}

export default AddCardForm