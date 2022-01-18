import {packsAPI, PacksResponse} from "../api/api-packs"
import {setIsLoading} from "./appReducer"
import {AppDispatch, AppRootStateType} from "./store"


export const initialState: PacksResponse = {
  cardPacks: [{
    "_id": "5fbaa709458da526d01c4546",
    "user_id": "5fb41ed02b6cb50004f7dd62",
    "user_name": "dyba@list.ru",
    "private": false,
    "name": "NewPack",
    "path": "/def",
    "grade": 0,
    "shots": 0,
    "cardsCount": 0,
    "type": "pack",
    "rating": 0,
    "created": "2020-11-22T17:59:37.805Z",
    "updated": "2020-11-22T17:59:37.805Z",
    "more_id": "5fb41ed02b6cb50004f7dd62",
    "__v": 0
  },
    {
      "_id": "5fbaa6f3458da526d01c4544",
      "user_id": "5fb41ed02b6cb50004f7dd62",
      "user_name": "dyba@list.ru",
      "private": false,
      "name": "NewPack",
      "path": "/def",
      "grade": 0,
      "shots": 0,
      "cardsCount": 0,
      "type": "pack",
      "rating": 0,
      "created": "2020-11-22T17:59:15.062Z",
      "updated": "2020-11-22T17:59:15.062Z",
      "more_id": "5fb41ed02b6cb50004f7dd62",
      "__v": 0
    },
    {
      "_id": "5fbaa662458da526d01c4542",
      "user_id": "5fb41ed02b6cb50004f7dd62",
      "user_name": "dyba@list.ru",
      "private": false,
      "name": "NewPack",
      "path": "/def",
      "grade": 0,
      "shots": 0,
      "cardsCount": 0,
      "type": "pack",
      "rating": 0,
      "created": "2020-11-22T17:56:50.548Z",
      "updated": "2020-11-22T17:56:50.548Z",
      "more_id": "5fb41ed02b6cb50004f7dd62",
      "__v": 0
    },
    {
      "_id": "5fbaa63d458da526d01c4541",
      "user_id": "5fb41ed02b6cb50004f7dd62",
      "user_name": "dyba@list.ru",
      "private": false,
      "name": "NewPack",
      "path": "/def",
      "grade": 0,
      "shots": 0,
      "cardsCount": 0,
      "type": "pack",
      "rating": 0,
      "created": "2020-11-22T17:56:13.917Z",
      "updated": "2020-11-22T17:56:13.917Z",
      "more_id": "5fb41ed02b6cb50004f7dd62",
      "__v": 0
    },
    {
      "_id": "5fbaa639458da526d01c4540",
      "user_id": "5fb41ed02b6cb50004f7dd62",
      "user_name": "dyba@list.ru",
      "private": false,
      "name": "NewPack",
      "path": "/def",
      "grade": 0,
      "shots": 0,
      "cardsCount": 0,
      "type": "pack",
      "rating": 0,
      "created": "2020-11-22T17:56:09.113Z",
      "updated": "2020-11-22T17:56:09.113Z",
      "more_id": "5fb41ed02b6cb50004f7dd62",
      "__v": 0
    },
    {
      "_id": "5fbaa631458da526d01c453f",
      "user_id": "5fb41ed02b6cb50004f7dd62",
      "user_name": "dyba@list.ru",
      "private": false,
      "name": "NewPack",
      "path": "/def",
      "grade": 0,
      "shots": 0,
      "cardsCount": 0,
      "type": "pack",
      "rating": 0,
      "created": "2020-11-22T17:56:01.129Z",
      "updated": "2020-11-22T17:56:01.129Z",
      "more_id": "5fb41ed02b6cb50004f7dd62",
      "__v": 0
    }],
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
