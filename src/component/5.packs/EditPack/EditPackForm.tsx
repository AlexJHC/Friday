import React, {Dispatch, SetStateAction, useState} from "react";
import {useDispatch} from "react-redux";
import {setError} from "../../../store/appReducer";
import InputText from "../../3.features/InputText/InputText";
import Button from "../../3.features/Button/Button";
import style from "./EditPackForm.module.css"

type EditPackPropsType = {
  renamePack: (_id: string, name: string) => void
  popUpToggle: Dispatch<SetStateAction<boolean>>
  id: string
}

export const EditPackForm: React.FC<EditPackPropsType> = ({renamePack, popUpToggle, id}) => {

  const dispatch = useDispatch()

  const [newName, setNewName] = useState<string>('')

  const handleClick = () => {
    if (newName.trim() === '') {
      dispatch(setError('Name field is required!'))
    } else {
      renamePack(id,newName.trim())
      setNewName('')
      popUpToggle(true)
    }
  }

  const handleCancel = () => {
    newName ? setNewName('') : popUpToggle(true)
  }

  return (
    <div className={style.editPackWrapper}>
      <div>
        <span>Rename pack</span>
        <InputText
          value={newName}
          placeholder="new pack name..."
          onChangeText={setNewName}
        />
      </div>
      <div className={style.editPackBtnWrapper}>
        <Button
          className={style.editPackBtnCancel}
          padding={'45px'}
          onClick={handleCancel}>Cancel</Button>
        <Button
          padding={'45px'}
          onClick={handleClick}>Save</Button>
      </div>
    </div>
  )
}
