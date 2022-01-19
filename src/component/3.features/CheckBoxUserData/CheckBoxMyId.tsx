import style from './CheckBoxUserData.module.css'

const CheckBoxUserData = () => {

  const myId = true

  const myBackgroundColor = myId ? `${style.item} ${style.active}` : `${style.item}`
  const allBackgroundColor = myId ? `${style.item}` : `${style.item} ${style.active}`

  return (
    <div className={style.mainWrapper}>
      <span className={myBackgroundColor}>My</span>
      <span className={allBackgroundColor}>All</span>
    </div>
  )
}

export default CheckBoxUserData