import CheckBoxMyId from "../../3.features/CheckBoxMyId/CheckBoxMyId";
import {Search} from "../../3.features/Search/Search";
import {fetchPacks} from "../../../store/packsReducer";
import React from "react";
import {RangeContainer} from "../../3.features/RangeContainer/RangeContainer";

type PacksListPropsType = {
  isMyId: boolean
  isMyIdToggle: (isMyId: boolean) => void
  minCardsCount: number
  maxCardsCount: number
  handleRangeChange: (values: number[]) => void
  cardsValuesFromRange: number[]
}

const PacksList = React.memo(({
                                isMyId,
                                isMyIdToggle,
                                cardsValuesFromRange,
                                handleRangeChange,
                                maxCardsCount,
                                minCardsCount
                              }: PacksListPropsType) => {

  return (
    <div>
      <b>Show packs cards</b>
      <CheckBoxMyId
        stateBoolean={isMyId}
        setToggleState={isMyIdToggle}
        name={['My', 'All']}
        styleMyPacks={true}/>
      <b>Number of Cards</b>
      <RangeContainer
        cardsValuesFromRange={cardsValuesFromRange}
        minCardsCount={minCardsCount}
        maxCardsCount={maxCardsCount}
        handleRangeChange={handleRangeChange}/>
      {/*<Search*/}
      {/*  fetchData={fetchPacks}/>*/}
    </div>
  )
})

export default PacksList
