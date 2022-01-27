import {cardsAPI, CardsPayloadType, CardType, GradeData} from '../api/api-cards'
import {AppActionsType, setError, setIsLoading} from './appReducer'
import {AppRootStateType} from './store'
import {ThunkAction} from 'redux-thunk'

const initialState: InitialStateType = {
  cards: [] as CardType[],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 5,
  packUserId: '',
  sortCards: '',
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
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

// Action creators
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
export const setSortCards = (sortCards: string) => ({
  type: 'cards/SET_SORT_CARDS',
  payload: {sortCards},
} as const)

// Thunk
export const fetchCards = (cardsPack_id: string): ThunkAction<void, AppRootStateType, unknown, CardsActionsType | AppActionsType> => async (dispatch, getState) => {
  dispatch(setIsLoading(true))
  const cards = getState().cards
  try {
    const response = await cardsAPI.getCards({
      page: cards.page,
      pageCount: cards.pageCount,
      sortCards: cards.sortCards,
      cardsPack_id
    })
    dispatch(setCards(response.data))
  } catch (e) {
    dispatch(setError('Error!'))
  } finally {
    dispatch(setIsLoading(false))
  }
}
export const createCard = (payload: CardsPayloadType): ThunkAction<void, AppRootStateType, unknown, CardsActionsType | AppActionsType> => async (dispatch) => {
  dispatch(setIsLoading(true))
  try {
    await cardsAPI.createCard({
      card: {...payload}
    })
    await dispatch(fetchCards(payload.cardsPack_id))
  } catch (e) {
    dispatch(setError('You are not allowed to create cards in this pack!'))
  } finally {
    dispatch(setIsLoading(false))
  }
}
export const removeCard = (id: string, cardsPack_id: string): ThunkAction<void, AppRootStateType, unknown, CardsActionsType | AppActionsType> => async (dispatch) => {
  dispatch(setIsLoading(true))
  try {
    await cardsAPI.deleteCard(id)
    await dispatch(fetchCards(cardsPack_id))
  } catch (e) {
    dispatch(setError('You are not allowed not remove cards from this pack!'))
  } finally {
    dispatch(setIsLoading(false))
  }
}
export const updateCards = (payload: CardsPayloadType): ThunkAction<void, AppRootStateType, unknown, CardsActionsType | AppActionsType> => async (dispatch) => {
  dispatch(setIsLoading(true))
  try {
    await cardsAPI.updateCard({
      card: {...payload}
    })
    await dispatch(fetchCards(payload.cardsPack_id))
  } catch (e) {
    dispatch(setError('You are not allowed edit cards in this pack!'))
  } finally {
    dispatch(setIsLoading(false))
  }
}
export const gradeAnswer = (payload: GradeData): ThunkAction<void, AppRootStateType, unknown, CardsActionsType | AppActionsType> => async (dispatch) => {
  dispatch(setIsLoading(true))
  try {
    await cardsAPI.grade(payload)
  } catch (e) {
    dispatch(setError('Error! Please try again!'))
  } finally {
    dispatch(setIsLoading(false))
  }
}

// Types
export type InitialStateType = CardsStateType & {
  sortCards: string
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
type CardsActionsType =
  | SetCardsActionType
  | SetCardsCurrentPageActionType
  | SetCardsPageCountActionType
  | SetSortCardsActionType
type SetCardsActionType = ReturnType<typeof setCards>
type SetCardsCurrentPageActionType = ReturnType<typeof setCardsCurrentPage>
type SetCardsPageCountActionType = ReturnType<typeof setCardsPageCount>
type SetSortCardsActionType = ReturnType<typeof setSortCards>
