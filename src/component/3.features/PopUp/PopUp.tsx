import style from './PopUp.module.css'
import React, {Dispatch, MouseEvent, SetStateAction} from "react";

// Add localState to component
// const [activePopUp, setActivePopUp] = useState<boolean>(true)
// popUpToggle = setActivePopUp
// to show PopUp use setActivePopUp(true)

type PopUpPropsType = {
  children: React.ReactNode
  name: string
  popUpStatus: boolean
  popUpToggle: Dispatch<SetStateAction<boolean>>
}

const PopUp = ({children, name, popUpStatus, popUpToggle}: PopUpPropsType) => {

  const handleHidePopUp = () => {
    popUpToggle(true)
  }

  const handlePropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div
      className={`${style.popUpWrapper} ${popUpStatus ? style.popUpActive : ''}`}
      onClick={handleHidePopUp}>
      <div
        onClick={handlePropagation}
        className={style.popUpContentWrapper}>
        <div
          className={style.popUpHeader}>
          <h3>{name}</h3>
          <div
            className={style.cross}
            onClick={handleHidePopUp}
          >X
          </div>
        </div>
        {children}</div>
    </div>
  )
}

export default PopUp