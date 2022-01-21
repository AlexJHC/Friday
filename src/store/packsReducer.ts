import {NewPackData, packsAPI, PacksGetParams, PacksPutType, PacksResponse} from "../api/api-packs"
import {AppActionType, setError, setIsLoading} from "./appReducer"
import {AppDispatch, AppRootStateType} from "./store"
import {ThunkAction} from "redux-thunk";

export type sortPacksType =
  '0updated' | '1updated'

export type PacksInitialState = PacksResponse & {
  cardsValuesFromRange: number[]
  sortPacks: sortPacksType
}

export const initialState: PacksInitialState = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
  page: 1,
  pageCount: 10,
  cardsValuesFromRange: [0, 1000],
  sortPacks: '0updated'
}

export const packsReducer = (state = initialState, action: PacksActionsTypes): PacksInitialState => {
  switch (action.type) {
    case 'packs/SET_PACKS':
      return {...state, ...action.payload}
    case 'packs/SET_PACKS_CURRENT_PAGE':
      return {...state, page: action.payload.page}
    case 'packs/SET_PACKS_FROM_RANGE':
      return {...state, cardsValuesFromRange: [...action.payload.values]}
    case 'packs/SET_PACKS_PAGE_COUNT':
      return {...state, ...action.payload}
    case 'packs/CLEAR_PACKS_DATA':
      return initialState
    case 'packs/SET_FILTER':
      return {...state, ...action.payload}
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
export const setPacksFromRange = (payload: { values: number[] }) => ({
  type: 'packs/SET_PACKS_FROM_RANGE',
  payload
} as const)
export const setPacksPageCount = (pageCount: number) => ({
  type: 'packs/SET_PACKS_PAGE_COUNT',
  payload: {pageCount},
} as const)
export const setPacksEmptyData = () => ({
  type: 'packs/CLEAR_PACKS_DATA'
} as const)
export const setPacksFilter = (sortPacks: sortPacksType) => ({
  type: 'packs/SET_FILTER',
  payload: {sortPacks}
}) as const


// thunk
export const fetchPacks = (payload?: PacksGetParams) => async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
  const packs = getState().packs
  try {
    dispatch(setIsLoading(true))
    const response = await packsAPI.getPacks({
      page: packs.page,
      pageCount: packs.pageCount,
      min: packs.cardsValuesFromRange[0],
      max: packs.cardsValuesFromRange[1],
      packName: payload?.packName,
      user_id: payload?.user_id,
      sortPacks: packs.sortPacks,
    })
    dispatch(setPacks(response.data))
  } catch (e) {
    dispatch(setError('Error'))
  } finally {
    dispatch(setIsLoading(false))
  }
}
export const createPack = (payload: NewPackData, userId?: string): ThunkAction<void, AppRootStateType, unknown, PacksActionsTypes | AppActionType> =>
  async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
      await packsAPI.createPack(payload)
      await dispatch(fetchPacks({user_id: userId}))
    } catch (e) {
      dispatch(setError('Error'))
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const removePacks = (packId: string, userId?: string): ThunkAction<void, AppRootStateType, unknown, PacksActionsTypes | AppActionType> =>
  async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
      await packsAPI.deletePacks(packId)
      await dispatch(fetchPacks({user_id: userId}))
    } catch (e) {
      dispatch(setError('Error'))
    } finally {
      dispatch(setIsLoading(false))
    }
  }

export const renamePacks = (payload: PacksPutType, userId?: string): ThunkAction<void, AppRootStateType, unknown, PacksActionsTypes | AppActionType> =>
  async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
      await packsAPI.putPacks({_id: payload._id, name: payload.name})
      await dispatch(fetchPacks({user_id: userId}))
    } catch
      (e) {
      dispatch(setError('Error'))
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
