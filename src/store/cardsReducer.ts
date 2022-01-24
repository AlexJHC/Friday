import {cardsAPI, CardsPayloadType, CardType} from '../api/api-cards'
import {AppActionType, setError, setIsLoading} from './appReducer'
import {AppRootStateType} from './store'
import {ThunkAction} from 'redux-thunk'

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 5,
  packUserId: '',
  sortCards: '0grade',
} as CardsInitialStateType

export const cardsReducer = (state: CardsInitialStateType = initialState, action: CardsActionsType): CardsInitialStateType => {
  switch (action.type) {
    case 'cards/SET_CARDS':
    case 'cards/SET_CARDS_CURRENT_PAGE':
    case 'cards/SET_CARDS_PAGE_COUNT':
    case 'cards/SET_SORT_CARDS':
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
  payload: {page},
} as const)
export const setCardsPageCount = (pageCount: number) => ({
  type: 'cards/SET_CARDS_PAGE_COUNT',
  payload: {pageCount},
} as const)
export const setSortCards = (sortCards: CardsSortType) => ({
  type: 'cards/SET_SORT_CARDS',
  payload: {sortCards}
} as const)

// Thunk
export const fetchCards = (cardsPack_id: string): ThunkAction<void, AppRootStateType, unknown, CardsActionsType | AppActionType> => (dispatch, getState) => {
  dispatch(setIsLoading(true))
  const cards = getState().cards
  cardsAPI.getCards({
    page: cards.page,
    pageCount: cards.pageCount,
    sortCards: cards.sortCards,
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

export const createCard = (payload: CardsPayloadType): ThunkAction<void, AppRootStateType, unknown, CardsActionsType | AppActionType> => (dispatch) => {
  dispatch(setIsLoading(true))
  cardsAPI.createCard({
    card: {...payload}
  })
    .then(() => {
      dispatch(fetchCards(payload.cardsPack_id))
    })
    .catch(() => {
      dispatch(setError('You are not allowed to create cards in this pack!'))
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

export const updateCards = (payload: CardsPayloadType): ThunkAction<void, AppRootStateType, unknown, CardsActionsType | AppActionType> => (dispatch) => {
  dispatch(setIsLoading(true))
  cardsAPI.updateCard({
    card: {...payload}
  })
    .then(() => {
      dispatch(fetchCards(payload.cardsPack_id))
    })
    .catch(() => {
      dispatch(setError('You are not allowed edit cards in this pack!'))
    })
    .finally(() => {
      dispatch(setIsLoading(false))
    })
}

export const gradeAnswer = (payload: any): ThunkAction<void, AppRootStateType, unknown, CardsActionsType | AppActionType> => (dispatch) => {
  dispatch(setIsLoading(true))
  cardsAPI.grade(payload)
    .then(() => {})
    .catch(() => {
      dispatch(setError('any error'))
    })
    .finally(() => {
      dispatch(setIsLoading(false))
    })
}

// Types
export type CardsInitialStateType = CardsStateType & {
  sortCards: CardsSortType
}
export type CardsStateType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}
export type CardsSortType = '0grade' | '1grade'
type CardsActionsType =
  | SetCardsActionType
  | SetCardsCurrentPageActionType
  | SetCardsPageCountActionType
  | SetSortCardsActionType
export type SetCardsActionType = ReturnType<typeof setCards>
export type SetCardsCurrentPageActionType = ReturnType<typeof setCardsCurrentPage>
export type SetCardsPageCountActionType = ReturnType<typeof setCardsPageCount>
export type SetSortCardsActionType = ReturnType<typeof setSortCards>
