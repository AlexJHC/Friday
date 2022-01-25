import Button from "../../3.features/Button/Button"
import {Dispatch, SetStateAction} from "react";
import style from "./DeletePack.module.css"

type DeletePackPropsType = {
  popUpToggle: Dispatch<SetStateAction<boolean>>
  deletePack: () => void
  packName: string
}

const DeletePackForm = ({popUpToggle, packName, deletePack}: DeletePackPropsType) => {

  const handleHidePopUp = () => {
    popUpToggle(true)
  }

  const handleDeletePack = () => {
    deletePack()
    popUpToggle(true)
  }

  return (
    <div className={style.deletePackWrapper}>
      <div>
        <span>Do you really want to remove <strong>Pack Name - {packName}?</strong></span>
        <br/>
        <br/>
        <span>All cards will be excluded from this course.</span>
      </div>
      <div className={style.deletePackBtnWrapper}>
        <Button
          padding={'45px'}
          onClick={handleHidePopUp}
          className={style.deletePackBtnCancel}
        >Cancel</Button>
        <Button
          padding={'45px'}
          onClick={handleDeletePack}
          className={style.deletePackBtn}
        >Delete</Button>
      </div>
    </div>
  )
}

export default DeletePackForm
