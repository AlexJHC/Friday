import {packsAPI, PacksGetParams, PacksResponse} from "../api/api-packs"
import {setIsLoading} from "./appReducer"
import {AppDispatch, AppRootStateType} from "./store"


export const initialState: PacksResponse = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
  page: 1,
  pageCount: 10,
}

export const packsReducer = (state = initialState, action: PacksActionsTypes): PacksResponse => {
  switch (action.type) {
    case 'packs/SET_PACKS':
      return {...state, ...action.payload}
    case 'packs/SET_PACKS_CURRENT_PAGE':
      return {...state, page: action.payload.page}
    case 'packs/SET_PACKS_TOTAL_COUNT':
      return {...state, cardPacksTotalCount: action.number}
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
export const setPacksTotalCount = (number: number) => ({
  type: 'packs/SET_PACKS_TOTAL_COUNT',
  number
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
      packName: payload?.packName,
    })
    dispatch(setPacks(response.data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(setIsLoading(false))
  }
}


// types

export type PacksActionsTypes =
  | ReturnType<typeof setPacks>
  | ReturnType<typeof setPacksCurrentPage>
  | ReturnType<typeof setPacksTotalCount>
  | ReturnType<typeof setPacksEmptyData>
