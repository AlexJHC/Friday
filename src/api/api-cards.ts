import {instance} from './api-config'
import {AxiosResponse} from 'axios'
import {CardsStateType} from '../store/cardsReducer'

export const cardsAPI = {
  getCards(payload: GetCardsParams) {
    return instance.get<CardsStateType>('/cards/card', {params: payload})
  },
  createCard(payload: CardParamsType) {
    return instance.post<CardType, AxiosResponse<CardType>, CardParamsType>('cards/card', payload)
  },
  deleteCard(_id: string) {
    return instance.delete<CardType>(`cards/card?id=${_id}`)
  },
  updateCard(payload: CardParamsType) {
    return instance.put<CardType, AxiosResponse<CardType>, CardParamsType>('cards/card', {...payload})
  },
  grade(payload: GradeData) {
    return instance.put<GradeData, AxiosResponse<GradeData>, GradeData>('/cards/grade', payload)
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
  cardsPack_id: string
  question: string
  answer: string
  grade: number
  shots: number
  rating: number
  user_id: string
  created: string
  updated: string
  type: string
  __v: number
}

export type CardsPayloadType = {
  _id?:string
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

export type CardParamsType = {
  card: CardsPayloadType
}

export type GradeData = {
  card_id: string
  grade: number
}

export type GradeResponse = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}
