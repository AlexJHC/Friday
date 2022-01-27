import CheckBoxMyId from "../../3.features/CheckBoxMyId/CheckBoxMyId";
import {Search} from "../../3.features/Search/Search";
import {fetchPacks} from "../../../store/packsReducer";
import React from "react";

type PacksListPropsType = {
  isMyId: boolean
  isMyIdToggle: (isMyId: boolean) => void
}

const PacksList = React.memo(({isMyId, isMyIdToggle}: PacksListPropsType) => {

  return (
    <div>
      <CheckBoxMyId
        stateBoolean={isMyId}
        setToggleState={isMyIdToggle}
        name={['My', 'All']}
        styleMyPacks={true}/>
      <br/>
      <Search
        fetchData={fetchPacks}/>
    </div>
  )
})

export default PacksList
