import React, {ChangeEvent, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, useParams} from "react-router-dom"
import Button from "../3.features/Button/Button"
import {AppRootStateType} from "../../store/store";
import {fetchCards, gradeAnswer} from "../../store/cardsReducer";
import {CardType} from "../../api/api-cards";
import style from "./Learn.module.css";

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Сonfused', 'Knew the answer']

export const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const result = cards.reduce((acc: { sum: number, id: number }, card, i) => {
    const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
    return {sum: newSum, id: newSum < rand ? i : acc.id}
  }, {sum: 0, id: -1})

  return cards[result.id + 1]
}

export const Learn = () => {

  const dispatch = useDispatch()
  const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards)

  const {cardsPack_id} = useParams()
  const {name} = useParams()

  const [first, setFirst] = useState(true)
  const [card, setCard] = useState<CardType>({
    _id: 'fake',
    cardsPack_id: 'fake',
    answer: '...',
    question: '...',
    grade: 0,
    shots: 0,
    type: '',
    rating: 0,
    __v: 0,
    user_id: '',
    created: '',
    updated: '',
  })
  const [gradeNumber, setGradeNumber] = useState<number | null>(null);
  const [answer, setAnswer] = useState('')
  const [isShowingAnswer, setIsShowingAnswer] = useState(false)

  const gradeHandler = (card_id: string, grade: number) => {
    dispatch(gradeAnswer({card_id, grade}))
    cards.length > 0 && setCard(getCard(cards))
    setAnswer('')
    setIsShowingAnswer(false)
  }
  const onChangeRadioHandle = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    setAnswer(e.currentTarget.value)
    setGradeNumber(i)
    setIsShowingAnswer(true)

  };

  useEffect(() => {
    if (cardsPack_id && first) {
      dispatch(fetchCards(cardsPack_id))
      setFirst(false)
    }

    if (cards.length) setCard(getCard(cards))

  }, [dispatch, cardsPack_id, cards, first])

  return (
    <div className={style.container}>
      <h2>Learn "{name}"</h2>
      <h3 className={style.title}>Question:
        <span>"{card.question}"</span>
      </h3>
      <h3 className={style.title}>Answer:
        <span
          style={!isShowingAnswer ? {filter: 'blur(5px)'} : {}}
          onClick={() => setIsShowingAnswer(!isShowingAnswer)}
        >
          "{card.answer}"
        </span>
      </h3>
      <div className={style.subTitle}>Rate yourself:</div>
      {
        grades.map((grade, i) => (
          <label key={'grade-' + i} style={{display: 'block'}}>
            <input
              type={'radio'}
              checked={grade === answer}
              value={grade}
              onChange={(e) => onChangeRadioHandle(e, i)}
            />
            {grade}
          </label>
        ))
      }
      <div className={style.buttons}>
        <Button padding={'36px'} className={style.buttonCancel}>
          <Link to={'/packs'}>Cancel</Link>
        </Button>
        <Button
          disabled={answer === ''}
          padding={'75px'}
          onClick={() => gradeHandler(card._id, gradeNumber ? gradeNumber + 1 : 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
