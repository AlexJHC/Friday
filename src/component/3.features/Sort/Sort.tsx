import React, {useState} from 'react'
import style from './Sort.module.css'

type SortPropsType = {
  value: string
  sortItems: (sortValue: string) => void
}

export const Sort: React.FC<SortPropsType> = React.memo((
  {
    value,
    sortItems,
  }) => {

  const [sort, setSort] = useState<boolean>(false)

  const handleClick = () => {
    sort
      ? sortItems(`1${value}`)
      : sortItems(`0${value}`)

    setSort(!sort)
  }

  return (
    <>
      <button className={style.arrow} onClick={handleClick} type="button">
        <span>&#x25B2;</span><br/>
        <span>&#x25BC;</span>
      </button>
    </>
  )
})
