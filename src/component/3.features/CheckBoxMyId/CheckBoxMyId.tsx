import style from './CheckBoxMyId.module.css'

type CheckBoxMyIdPropsType = {
  isMyId: boolean
  isMyIdHandler: (isMyId: boolean) => void
}

const CheckBoxMyId = ({isMyId, isMyIdHandler}: CheckBoxMyIdPropsType) => {

  const myBackgroundColor = isMyId
    ? `${style.item} ${style.active}`
    : `${style.item}`

  const allBackgroundColor = isMyId
    ? `${style.item}`
    : `${style.item} ${style.active}`

  return (
    <div className={style.mainWrapper}>
      <span
        className={myBackgroundColor}
        onClick={() => isMyIdHandler(true)}
      >My</span>
      <span
        className={allBackgroundColor}
        onClick={() => isMyIdHandler(false)}
      >All</span>
    </div>
  )
}

export default CheckBoxMyId