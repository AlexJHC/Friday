import React, {useEffect, useState} from "react";
import PopUp from "../../3.features/PopUp/PopUp";
import style from "./EditPackForm.module.css";
import {EditPackForm} from "./EditPackForm";

type PopUpEditPackPropsType = {
  renamePack: (_id: string, name: string) => void
  header: string
  PackId: string
}

const PopUpEditPack = ({renamePack, header, PackId}: PopUpEditPackPropsType) => {

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
        <EditPackForm
          renamePack={renamePack}
          popUpToggle={setActivePopUp}
          id={PackId}/>
      </PopUp>
      <button
        onClick={handleSetActivePopUp}
        className={style.btn}
      >
        Edit
      </button>
    </>
  )
}
export default PopUpEditPack