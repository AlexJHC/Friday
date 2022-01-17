import {packsAPI, PacksResponse } from "../api/api-packs"
import { setIsLoading } from "./appReducer"
import { AppDispatch, AppRootStateType } from "./store"


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
      return {
        ...state, ...action.payload
      }
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


// thunk
export const fetchPacks = () => async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
  const packs = getState().packs
  dispatch(setIsLoading(true))
  try {
    const response = await packsAPI.getPacks({
      page: packs.page,
      pageCount: packs.pageCount,
    })
    dispatch(setPacks(response.data))
  } catch (e) {
    alert(e)
  } finally {
    dispatch(setIsLoading(false))
  }
}


// types

export type PacksActionsTypes =
  | ReturnType<typeof setPacks>
