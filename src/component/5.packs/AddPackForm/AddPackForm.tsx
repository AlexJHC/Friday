import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {setError} from "../../../store/appReducer";
import style from "../../6.cards/AddCardForm/AddCardForm.module.css";
import InputText from "../../3.features/InputText/InputText";
import Button from "../../3.features/Button/Button";

type AddPackPropsType = {
  addPack: (newName: string) => void
}

export const AddPackForm: React.FC<AddPackPropsType> = ({addPack}) => {
  const dispatch = useDispatch()

  const [newName, setNewName] = useState<string>('')

  const handleClick = () => {
    if (newName.trim() === '') {
      dispatch(setError('name field is required!'))
    } else {
      addPack(newName.trim())
      setNewName('')
    }
  }

  return (
    <div className={style.body}>
      <div>
        <span>Name</span>
        <InputText value={newName}
                   placeholder="new name..."
                   onChangeText={setNewName}
        />
      </div>
      <div className={style.btn}>
        <Button onClick={handleClick}>Add Pack</Button>
      </div>
    </div>
  )
}
