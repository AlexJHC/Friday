import React from 'react'
import Button from '../../../3.features/Button/Button'
import style from './RemoveCardMessage.module.css'

type RemoveCardPropsType = {
  closePopUp: (status: boolean) => void
  removeCard: () => void
}

const RemoveCardMessage: React.FC<RemoveCardPropsType> = (
  {
    closePopUp,
    removeCard,
  }) => {

  const handlePopUpHide = () => closePopUp(false)
  const handleCardRemove = () => {
    closePopUp(false)
    removeCard()
  }

  return (
    <div className={style.deletePackWrapper}>
      <div>
        <span>Do you really want to remove this card?</span>
        <br/>
        <br/>
        <span>This card will be excluded from this pack.</span>
      </div>
      <div className={style.deletePackBtnWrapper}>
        <Button padding={'45px'}
                onClick={handlePopUpHide}
                className={style.deletePackBtnCancel}>Cancel</Button>
        <Button padding={'45px'}
                onClick={handleCardRemove}
                className={style.deletePackBtn}>Delete</Button>
      </div>
    </div>
  )
}

export default RemoveCardMessage
