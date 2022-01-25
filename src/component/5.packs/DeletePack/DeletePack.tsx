import Button from "../../3.features/Button/Button"
import {Dispatch, SetStateAction} from "react";

type DeletePackPropsType = {
  popUpToggle: Dispatch<SetStateAction<boolean>>
  deletePack: () => void
  packName: string
}

const DeletePack = ({popUpToggle, deletePack, packName}: DeletePackPropsType) => {
  return (
    <div>
      <div>
        <span>Do you really want to remove Pack Name - {packName}?</span>
        <span>All cards will be excluded from this course.</span>
      </div>
      <div>
        <Button onClick={() => popUpToggle(true)}>Cancel</Button>
        <Button onClick={deletePack}>Delete</Button>
      </div>
    </div>
  )
}

export default DeletePack
