import {CardType} from '../api/api-cards'

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
export const setCards = (cards: CardType[]) => ({
  type: 'cards/SET_CARDS',
  payload: {
    cards
  },
} as const)

// Thunk

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
