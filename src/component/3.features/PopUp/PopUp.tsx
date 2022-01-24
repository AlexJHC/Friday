import style from './PopUp.module.css'
import React, {Dispatch, SetStateAction} from "react";

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

  const activeStyle = popUpStatus ? style.popUpActive : ''

  const handleHidePopUp = () => {
    popUpToggle(true)
  }

  return (
    <div className={`${style.popUpWrapper} ${activeStyle}`}
         onClick={handleHidePopUp}>
      <div
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