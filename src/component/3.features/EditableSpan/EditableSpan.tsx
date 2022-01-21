import React, {FC, KeyboardEvent, useState} from 'react'
import InputText from '../InputText/InputText'

type EditableSpanPropsType = {
  fieldName: string
  editField: (newFieldName: string) => void
}
export const EditableSpan: FC<EditableSpanPropsType> = (
  {
    fieldName,
    editField
  }) => {

  const [editMode, setEditMode] = useState<boolean>(false)
  const [value, setValue] = useState<string>(fieldName)

  const handleDoubleClick = () => {
    setEditMode(true)
  }

  const addNewFieldName = () => {
    if (value.trim() === '') {
    } else {
      editField(value.trim())
      setEditMode(false)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewFieldName()
    }
  }

  if (editMode) {
    return <InputText value={value}
                      onBlur={addNewFieldName}
                      onKeyPress={handleKeyPress}
                      onChangeText={setValue}
                      autoFocus/>
  }

  return (
    <span onDoubleClick={handleDoubleClick}
          title="Double click to edit">
              {fieldName}
    </span>
  )
}