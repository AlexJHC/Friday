import React, {Dispatch, SetStateAction, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {setError} from "../../../store/appReducer";
import InputText from "../../3.features/InputText/InputText";
import Button from "../../3.features/Button/Button";
import style from './AddPackForm.module.css'

type AddPackPropsType = {
  addPack: (newName: string) => void
  popUpToggle: Dispatch<SetStateAction<boolean>>
}

export const AddPackForm: React.FC<AddPackPropsType> = React.memo( ({addPack,popUpToggle}) => {

  const dispatch = useDispatch()

  const [newName, setNewName] = useState<string>('')

  const handleClick = () => {
    if (newName.trim() === '') {
      dispatch(setError('Name field is required!'))
    } else {
      addPack(newName.trim())
      setNewName('')
      popUpToggle(true)
    }
  }

  const handleCancel = useCallback (() => {
    newName ? setNewName('') : popUpToggle(true)
  },[newName,popUpToggle])

  return (
    <div className={style.addPackWrapper}>
      <div>
        <span>Name pack</span>
        <InputText
          value={newName}
          placeholder="new pack name..."
          onChangeText={setNewName}
        />
      </div>
      <div className={style.addPackBtnWrapper}>
        <Button
          className={style.addPackBtnCancel}
          padding={'45px'}
          onClick={handleCancel}>Cancel</Button>
        <Button
          padding={'45px'}
          onClick={handleClick}>Save</Button>
      </div>
    </div>
  )
})
