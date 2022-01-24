import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import Button from "../3.features/Button/Button"
import {AppRootStateType} from "../../store/store";
import {fetchCards, gradeAnswer} from "../../store/cardsReducer";
import {CardType} from "../../api/api-cards";

export const grades = ['1', '2', '3', '4', '5']

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

  const [isChecked, setIsChecked] = useState(false)
  const [first, setFirst] = useState(true)
  const [card, setCard] = useState<CardType>({
    _id: 'fake',
    cardsPack_id: 'fake',
    answer: 'Fake answer',
    question: 'Fake question',
    grade: 0,
    shots: 0,
    type: '',
    rating: 0,
    __v: 0,
    user_id: '',
    created: '',
    updated: '',
  })

  useEffect(() => {
    if (cardsPack_id && first) {
      dispatch(fetchCards(cardsPack_id))
      setFirst(false)
    }

    if (cards.length) setCard(getCard(cards))

    return () => {
      console.log('LearnContainer useEffect off');
    }
  }, [dispatch, cardsPack_id, cards, first])

  const onNext = () => {
    setIsChecked(false)
    cards.length > 0 && setCard(getCard(cards))
  }
  const gradeHandler = (card_id: string, grade: number) => {
    dispatch(gradeAnswer({card_id, grade}))
    onNext()
  }


  return (
    <div>
      <h1>Learn</h1>
      <h2>{card.question}</h2>
      <div>
        <Button onClick={() => setIsChecked(!isChecked)}>Check</Button>
        <Button onClick={onNext}>Next</Button>
      </div>

      {isChecked && (
        <>
          <div>{card.answer}</div>

          {grades.map((g, i) => (
            <Button
              key={'grade-' + i}
              onClick={() => gradeHandler(card._id, i + 1)}>
              {g}
            </Button>
          ))}

          <div><Button onClick={onNext}>next</Button></div>
        </>
      )}

    </div>
  )
}
