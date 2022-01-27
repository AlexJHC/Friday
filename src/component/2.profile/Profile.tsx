import Button from '../3.features/Button/Button'
import {Link} from 'react-router-dom'
import BoratAvatar from '../Img/Borat-Avatar.png'
import style from './Profile.module.css'
import {RangeContainer} from "../3.features/RangeContainer/RangeContainer";
import React from "react";
import {Search} from "../3.features/Search/Search";
import {fetchPacks} from "../../store/packsReducer";

type ProfilePropsType = {
  cardsValuesFromRange: number[]
  logOut: () => void
  avatar: string | undefined
  name: string
  minCardsCount: number
  maxCardsCount: number
  handleRangeChange: (values: number[]) => void
}

const Profile = React.memo(({
                              minCardsCount,
                              maxCardsCount,
                              handleRangeChange,
                              name,
                              avatar,
                              logOut,
                              cardsValuesFromRange,
                            }: ProfilePropsType) => {

  return (
    <div className={style.profileWrapper}>
      <div>
        <img src={avatar ?? BoratAvatar} alt="avatar" width='96px'/>
      </div>
      <span>{name}</span>
      <Link className={style.link} to={'/profile-edit'}>Edit profile</Link>
      <Button padding={'23px'} onClick={logOut}>Log Out</Button>
      <RangeContainer
        cardsValuesFromRange={cardsValuesFromRange}
        minCardsCount={minCardsCount}
        maxCardsCount={maxCardsCount}
        handleRangeChange={handleRangeChange}/>
      <br/>
      <Search
        fetchData={fetchPacks}/>
    </div>
  )
})

export default Profile
