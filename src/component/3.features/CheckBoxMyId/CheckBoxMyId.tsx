import style from './CheckBoxMyId.module.css'
import React from 'react'
import {iconPacksProfile, iconsProfile} from '../../../assets/icons/icons.'

type CheckBoxMyIdPropsType = {
  stateBoolean: boolean
  setToggleState: (isMyId: boolean) => void
  name: string[]
  styleMyPacks: boolean
  handleMyPacksAndProfile?: () => void
}

const CheckBoxMyId = React.memo(({
                                   handleMyPacksAndProfile,
                                   stateBoolean,
                                   setToggleState,
                                   name,
                                   styleMyPacks
                                 }: CheckBoxMyIdPropsType) => {

  const handleSetStateTrue = () => setToggleState(true)

  const handleSetStateFalse = () => {
    setToggleState(false)
    if (handleMyPacksAndProfile) {
      handleMyPacksAndProfile()
    }
  }

  const mainWrapperStyle = styleMyPacks
    ? `${style.mainWrapperMy}`
    : `${style.mainWrapperProfile}`

  const itemStyle = styleMyPacks
    ? `${style.itemMy}`
    : `${style.itemProfile}`

  const active = styleMyPacks
    ? `${style.activeMy}`
    : `${style.activeProfile}`

  const firstBackgroundColor = stateBoolean
    ? `${itemStyle} ${active}`
    : `${itemStyle}`

  const secondBackgroundColor = stateBoolean
    ? `${itemStyle}`
    : `${itemStyle} ${active}`

  const setIconPacksProfile = styleMyPacks ? null : iconPacksProfile
  const setIconsProfile = styleMyPacks ? null : iconsProfile

  return (
    <div className={mainWrapperStyle}>
      <span
        className={firstBackgroundColor}
        onClick={handleSetStateTrue}
      >{setIconPacksProfile}&nbsp;{name[0]}</span>
      <span
        className={secondBackgroundColor}
        onClick={handleSetStateFalse}
      >{setIconsProfile}&nbsp;{name[1]}</span>
    </div>
  )
})
export default CheckBoxMyId
