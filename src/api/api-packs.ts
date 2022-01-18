import {instance} from "./api-config";

export const packsAPI = {
  getPacks(payload?: PacksGetParams) {
    return instance.get<PacksResponse>('/cards/pack', {params: payload})
  },
}

// Types
export type PacksGetParams = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
}

export type PacksResponse = {
  cardPacks: CardPacksType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}

export type CardPacksType = {
  _id: string
  user_id: string
  cardsCount: number
  created: string
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: string
  user_name: string
  __v: number
}


