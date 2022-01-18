import {cardsAPI, CardType} from '../api/api-cards'
import {Dispatch} from 'redux'
import {setIsLoading} from './appReducer'

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 10,
  packUserId: ''
} as CardsStateType

export const cardsReducer = (state: CardsStateType = initialState, action: CardsActionsType): CardsStateType => {
  switch (action.type) {
    case 'cards/SET_CARDS':
      return {
        ...state, ...action.payload
      }
    default: {
      return state
    }
  }
}

// Actions
export const setCards = (payload: CardsStateType) => ({
  type: 'cards/SET_CARDS',
  payload,
} as const)

// Thunk
export const fetchCards = () => (dispatch: Dispatch) => {
  dispatch(setIsLoading(true))
  cardsAPI.getCards({cardsPack_id: '61e6a48af05fe50004a90bdc'})
    .then(res => {
      dispatch(setCards(res.data))
    })
    .catch(e => {
      console.log(e.response.data.error)
    })
    .finally(() => {
      dispatch(setIsLoading(false))
    })
}

// Types
export type CardsStateType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}
type CardsActionsType = SetCardsActionType
export type SetCardsActionType = ReturnType<typeof setCards>
