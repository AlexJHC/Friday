import {AddPackForm} from "../../5.packs/AddPackForm/AddPackForm";
import PopUp from "./PopUp";
import React, {useEffect, useState} from "react";
import Button from "../Button/Button";

type PopUpContainerPropsType = {
  logic: (newName: string) => void
}

const PopUpContainer = ({logic}: PopUpContainerPropsType) => {

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
        name={'Add New Pack'}
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
export default PopUpContainer