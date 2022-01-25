import {AddPackForm} from "./AddPackForm";
import PopUp from "../../../3.features/PopUp/PopUp";
import React, {useEffect, useState} from "react";
import Button from "../../../3.features/Button/Button";

type PopUpAddPackPropsType = {
  logic: (newName: string) => void
  header: string
}

const PopUpAddPack = ({logic,header}: PopUpAddPackPropsType) => {

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
        <AddPackForm addPack={logic}
                     popUpToggle={setActivePopUp}/>
      </PopUp>
      <Button
        padding={'40px'}
        onClick={handleSetActivePopUp}>
        Add New Pack
      </Button>
    </>
  )
}
export default PopUpAddPack