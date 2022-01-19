import {cardsAPI, CardType} from '../api/api-cards'
import {Dispatch} from 'redux'
import {AppActionType, setError, setIsLoading} from './appReducer'
import {AppRootStateType} from './store'
import {ThunkAction} from 'redux-thunk'

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
    case 'cards/SET_CARDS_CURRENT_PAGE':
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
export const setCardsCurrentPage = (page: number) => ({
  type: 'cards/SET_CARDS_CURRENT_PAGE',
  payload: {
    page
  },
} as const)

// Thunk
export const fetchCards = (cardsPack_id: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  dispatch(setIsLoading(true))
  const cards = getState().cards
  cardsAPI.getCards({
    page: cards.page,
    pageCount: cards.pageCount,
    cardsPack_id
  })
    .then(res => {
      dispatch(setCards(res.data))
    })
    .catch(() => {
      dispatch(setError('Error!'))
    })
    .finally(() => {
      dispatch(setIsLoading(false))
    })
}

export const createCard = (cardsPack_id: string, question: string, answer: string): ThunkAction<void, AppRootStateType, unknown, CardsActionsType | AppActionType> => (dispatch) => {
  dispatch(setIsLoading(true))
  cardsAPI.createCard({
    card: {
      cardsPack_id,
      question,
      answer
    }
  })
    .then(() => {
      dispatch(fetchCards(cardsPack_id))
    })
    .catch(() => {
      dispatch(setError('You are not allowed not create cards in this pack!'))
    })
    .finally(() => {
      dispatch(setIsLoading(false))
    })
}

export const removeCard = (id: string, cardsPack_id: string): ThunkAction<void, AppRootStateType, unknown, CardsActionsType | AppActionType> => (dispatch) => {
  dispatch(setIsLoading(true))
  cardsAPI.deleteCard(id)
    .then(() => {
      dispatch(fetchCards(cardsPack_id))
    })
    .catch(() => {
      dispatch(setError('You are not allowed not remove cards from this pack!'))
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
type CardsActionsType =
  | SetCardsActionType
  | SetCardsCurrentPageActionType
export type SetCardsActionType = ReturnType<typeof setCards>
export type SetCardsCurrentPageActionType = ReturnType<typeof setCardsCurrentPage>
