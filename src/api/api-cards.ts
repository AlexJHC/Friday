import {instance} from './api-config'
import {AxiosResponse} from 'axios'

export const cardsAPI = {
  getCards(payload: GetCardsParams) {
    return instance.get<GetCardsResponseType>('/cards/card', {params: payload})
  },
  createCard(payload: CardParams) {
    return instance.post<CardType, AxiosResponse<CardType>, CardParams>('cards/card', {...payload})
  },
  deleteCard(_id: string) {
    return instance.delete<CardType>(`cards/card?id=${_id}`)
  },
  updateCard(payload: CardParams) {
    return instance.put<CardType, AxiosResponse<CardType>, CardParams>('cards/card', {...payload})
  },
}

export type GetCardsParams = {
  cardsPack_id: string
  cardAnswer?: string
  cardQuestion?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type CardType = {
  _id: string
  user_id: string
  cardsPack_id: string
  created: Date
  updated: Date
  answer: string
  question: string
  grade: number
  shots: number
  rating: number
  type: string
  __v: number
}

export type GetCardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

export type CardParams = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  rating?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
  type?: string
}
