import style from './PopUp.module.css'
import React, {MouseEvent} from 'react'

type PopUpPropsType = {
  name: string
  popUpStatus: boolean
  changeStatus: (status: boolean) => void
}

const PopUp2: React.FC<PopUpPropsType> = (
  {
    name,
    popUpStatus,
    changeStatus,
    children,
  }) => {

  const hidePopUp = () => {
    changeStatus(false)
  }
  const handlePropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div className={`${style.popUpWrapper} ${!popUpStatus ? style.popUpActive : ''}`}
         onClick={hidePopUp}>
      <div onClick={handlePropagation}
           className={style.popUpContentWrapper}>
        <div className={style.popUpHeader}>
          <h3>{name}</h3>
          <div className={style.cross}
               onClick={hidePopUp}>
            X
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default PopUp2
