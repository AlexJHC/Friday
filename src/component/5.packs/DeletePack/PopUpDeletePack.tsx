import React, {useEffect, useState} from "react";
import PopUp from "../../3.features/PopUp/PopUp";
import DeletePackForm from "./DeletePackForm";
import style from "./DeletePack.module.css"

type PopUpDeletePackPropsType = {
  deletePack: () => void
  header: string
  name: string
}

const PopUpDeletePack = ({deletePack, header, name}: PopUpDeletePackPropsType) => {

  const [activePopUp, setActivePopUp] = useState<boolean>(true)

  const handleSetActivePopUp = () => {
    setActivePopUp(false)
  }

  useEffect(() => {
    !activePopUp && document.body.classList.add('active')
    return () =>
      document.body.classList.remove('active')
  }, [activePopUp])

  return (
    <>
      <PopUp
        name={header}
        popUpStatus={activePopUp}
        popUpToggle={setActivePopUp}>
        <DeletePackForm
          deletePack={deletePack}
          popUpToggle={setActivePopUp}
          packName={name}/>
      </PopUp>
      <button
        onClick={handleSetActivePopUp}
        className={style.btn}
      >
        Delete
      </button>
    </>
  )
}
export default PopUpDeletePack