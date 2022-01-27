import {NewPackData, packsAPI, PacksPutType, PacksResponse} from '../api/api-packs'
import {AppActionsType, setError, setIsLoading} from './appReducer'
import {AppDispatch, AppRootStateType} from './store'
import {ThunkAction} from 'redux-thunk'

export type PacksInitialState = PacksResponse & {
  cardsValuesFromRange: number[]
  sortPacks: string
  searchField: string
  myId: string | null
}

export const initialState: PacksInitialState = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
  page: 1,
  pageCount: 10,
  cardsValuesFromRange: [0, 1000],
  sortPacks: '',
  searchField: '',
  myId: ''
}

export const packsReducer = (state: PacksInitialState = initialState, action: PacksActionsTypes): PacksInitialState => {
  switch (action.type) {
    case 'packs/SET_PACKS':
    case 'packs/SET_PACKS_CURRENT_PAGE':
    case 'packs/SET_PACKS_FROM_RANGE':
    case 'packs/SET_PACKS_PAGE_COUNT':
    case 'packs/SET_PACKS_SEARCH_FIELD':
    case 'packs/SET_FILTER':
    case 'packs/SET_MY_ID':
      return {...state, ...action.payload}
    case 'packs/CLEAR_PACKS_DATA':
      return initialState
    default: {
      return state
    }
  }
}

// action creators
export const setPacks = (payload: PacksResponse) => ({
  type: 'packs/SET_PACKS',
  payload
} as const)
export const setPacksCurrentPage = (page: number) => ({
  type: 'packs/SET_PACKS_CURRENT_PAGE',
  payload: {page}
} as const)
export const setPacksFromRange = (cardsValuesFromRange: number[]) => ({
  type: 'packs/SET_PACKS_FROM_RANGE',
  payload: {cardsValuesFromRange}
} as const)
export const setPacksPageCount = (pageCount: number) => ({
  type: 'packs/SET_PACKS_PAGE_COUNT',
  payload: {pageCount},
} as const)
export const setPacksSearchField = (searchField: string) => ({
  type: 'packs/SET_PACKS_SEARCH_FIELD',
  payload: {searchField},
} as const)
export const setPacksEmptyData = () => ({
  type: 'packs/CLEAR_PACKS_DATA'
} as const)
export const setPacksFilter = (sortPacks: string) => ({
  type: 'packs/SET_FILTER',
  payload: {sortPacks}
}) as const
export const setPacksMyId = (myId: string | null) => ({
  type: 'packs/SET_MY_ID',
  payload: {myId}
}) as const


// thunk
export const fetchPacks = () => async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
  const packs = getState().packs
  dispatch(setIsLoading(true))
  try {
    const response = await packsAPI.getPacks({
      page: packs.page,
      pageCount: packs.pageCount,
      min: packs.cardsValuesFromRange[0],
      max: packs.cardsValuesFromRange[1],
      user_id: packs.myId,
      sortPacks: packs.sortPacks,
      packName: packs.searchField
    })
    dispatch(setPacks(response.data))
  } catch (e) {
    dispatch(setError('Authentication server error'))
  } finally {
    dispatch(setIsLoading(false))
  }
}
export const createPack = (payload: NewPackData): ThunkAction<void, AppRootStateType, unknown, PacksActionsTypes | AppActionsType> =>
  async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
      await packsAPI.createPack(payload)
      await dispatch(fetchPacks())
    } catch (e) {
      dispatch(setError('You are not allowed to create pack!'))
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const removePacks = (packId: string): ThunkAction<void, AppRootStateType, unknown, PacksActionsTypes | AppActionsType> =>
  async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
      await packsAPI.deletePacks(packId)
      await dispatch(fetchPacks())
    } catch (e) {
      dispatch(setError('You are not allowed to remove this pack!'))
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const renamePacks = (payload: PacksPutType): ThunkAction<void, AppRootStateType, unknown, PacksActionsTypes | AppActionsType> =>
  async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
      await packsAPI.putPacks({...payload})
      await dispatch(fetchPacks())
    } catch
      (e) {
      dispatch(setError('You are not allowed to rename this pack!'))
    } finally {
      dispatch(setIsLoading(false))
    }
  }


// types
export type PacksActionsTypes =
  | ReturnType<typeof setPacks>
  | ReturnType<typeof setPacksCurrentPage>
  | ReturnType<typeof setPacksFromRange>
  | ReturnType<typeof setPacksEmptyData>
  | ReturnType<typeof setPacksPageCount>
  | ReturnType<typeof setPacksFilter>
  | ReturnType<typeof setPacksSearchField>
  | ReturnType<typeof setPacksMyId>
