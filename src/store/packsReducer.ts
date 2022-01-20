import {packsAPI, PacksGetParams, PacksResponse} from "../api/api-packs"
import {AppActionType, setError, setIsLoading} from "./appReducer"
import {AppDispatch, AppRootStateType} from "./store"
import {ThunkAction} from "redux-thunk";

export type PacksInitialState = PacksResponse & {
  cardsValuesFromRange: number[]
}

export const initialState: PacksInitialState = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
  page: 1,
  pageCount: 10,
  cardsValuesFromRange: [0, 1000],
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
      user_id: payload?.user_id
    })
    dispatch(setPacks(response.data))
  } catch (e) {
    dispatch(setError('Error'))
  } finally {
    dispatch(setIsLoading(false))
  }
}

export const removePacks = (packId: string,userId?:string): ThunkAction<void, AppRootStateType, unknown, PacksActionsTypes | AppActionType> =>
  async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
      await packsAPI.deletePacks(packId)
      await dispatch(fetchPacks({user_id:userId}))
    } catch (e) {
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
