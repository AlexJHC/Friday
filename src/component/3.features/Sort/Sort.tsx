import React from 'react'
import {CardsSortType} from '../../../store/cardsReducer'
import style from './Sort.module.css'
import {sortPacksType} from "../../../store/packsReducer";

type SortPropsType = {
  value: CardsSortType | sortPacksType
  sortItems: () => void
}

export const Sort: React.FC<SortPropsType> = ({value, sortItems}) => {

  const handleClick = () => {
    sortItems()
  }


  return (
    <>
      <button className={style.arrow} onClick={handleClick} type="button">
        {
          value.toString()[0] === '0'
            ? <span>&#x25BC;</span>
            : <span>&#x25B2;</span>
        }
      </button>
    </>
  )
}
