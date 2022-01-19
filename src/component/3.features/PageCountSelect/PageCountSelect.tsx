import React, {ChangeEvent} from 'react'
import style from './PageCountSelect.module.css'

type PageCountSelectPropsType = {
  options: number[]
  changeOption: (option: number) => void
}

const PageCountSelect: React.FC<PageCountSelectPropsType> = (
  {
    options,
    changeOption,
    children
  }
) => {

  const mappedOptions = options.map((o, i) => (
    <option key={o + '-' + i} value={o}>
      {o}
    </option>
  ))

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = +e.currentTarget.value
    changeOption(option)
  }

  return (
    <div className={style.body}>
      <span>Show</span>
      <select onChange={handleOptionChange}>
        {mappedOptions}
      </select>
      <span>{children} per page</span>
    </div>
  )
}

export default PageCountSelect