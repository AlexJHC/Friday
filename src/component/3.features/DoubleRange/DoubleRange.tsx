import React, {ChangeEvent} from 'react';
import style from './DoubleRange.module.css'


type DoubleRangePropsType = {
  onChangeRange: (value: [number, number]) => void
  value: [number, number]
}

export const DoubleRange: React.FC<DoubleRangePropsType> = (
  {
    onChangeRange, value,
  }
) => {

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'first') {
      if (+e.currentTarget.value >= 0 && +e.currentTarget.value <= value[1] - 10) {
        onChangeRange([+e.currentTarget.value, value[1]])
      }
    } else if (e.currentTarget.name === 'second') {
      if (+e.currentTarget.value >= value[0] + 10 && +e.currentTarget.value <= 100)
        onChangeRange([value[0], +e.currentTarget.value])
    }
  }

  return (
    <div className={style.rangeSlider}>
      <input type="range" value={value[0]} onChange={changeHandler} name={'first'}/>
      <input type="range" value={value[1]} onChange={changeHandler} name={'second'}/>
    </div>
  )
}

