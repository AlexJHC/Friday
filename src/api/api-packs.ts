import { AxiosResponse } from "axios";
import {instance} from "./api-config";

export const packsAPI = {
  getPacks(payload?: PacksGetParams) {
    return instance.get<PacksResponse>('/cards/pack', {params: payload})
  },
  createPack(payload: NewPackData) {
    return instance.post<NewPackData, AxiosResponse<CardPacksType>>(`/cards/pack`, payload)
  },
  deletePacks(_id: string) {
    return instance.delete<PacksResponse>(`/cards/pack?id=${_id}`)
  },
  putPacks(payload: PacksPutType) {
    return instance.put<PacksResponse>('/cards/pack', {cardsPack: payload})
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
  cardPacksTotalCount?: number
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

export type NewPackData = {
  cardsPack: {
    name: string
  }
}
export type PacksPutType = {
    _id: string
    name?: string
}


