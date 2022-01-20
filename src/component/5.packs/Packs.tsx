import {PacksTable, Pagination, Search} from '.';
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchPacks, setPacksCurrentPage} from '../../store/packsReducer';
import {AppRootStateType} from "../../store/store";
import style from './Packs.module.css'
import {RangeContainer} from "../3.features/RangeContainer/RangeContainer";
import CheckBoxMyId from "../3.features/CheckBoxMyId/CheckBoxMyId";
import {setIsMyId} from "../../store/appReducer";


export const Packs = () => {
  const dispatch = useDispatch()
  const {
    cardPacks,
    page,
    pageCount,
    cardPacksTotalCount,
    minCardsCount,
    maxCardsCount,
    cardsValuesFromRange,
  } = useSelector<AppRootStateType, any>(state => state.packs)

  // isMyId toggle
  const isMyId = useSelector<AppRootStateType, boolean>(state => state.app.isMyId)
  const isMyIdHandler = (isMyId: boolean) => {
    dispatch(setIsMyId(isMyId))
  }
  // userID
  const userId = useSelector<AppRootStateType, string>(state => state.profile.user._id)

  // Pagination
  const onPageChanged = (page: number) => {
    dispatch(setPacksCurrentPage(page));
  };

  useEffect(() => {
    isMyId ? dispatch(fetchPacks({user_id: userId})) : dispatch(fetchPacks())
  }, [dispatch, page, pageCount, cardsValuesFromRange, isMyId])

  return (
    <div className={style.packsWrapper}>
      <div>
        <Search fetchData={fetchPacks}/>
      </div>
      <br/>
      <CheckBoxMyId isMyId={isMyId} isMyIdHandler={isMyIdHandler}/>
      <div>
        <RangeContainer minCardsCount={minCardsCount} maxCardsCount={maxCardsCount}/>
      </div>
      <br/>
      {/*<div>*/}
      {/*  <Sort/>*/}
      {/*</div>*/}
      <div style={{display: "flex", justifyContent: "flex-start", alignItems: "self-start"}}>
        <div style={{display: "flex", minWidth: '200px', justifyContent: 'center', flexGrow: '1'}}>
          <PacksTable packs={cardPacks}/>
        </div>
      </div>
      <br/>
      <div>
        <Pagination
          // Data Array length
          totalRecords={cardPacksTotalCount}
          pageLimit={pageCount}
          pageNeighbours={3}
          currentPage={page}
          onPageChanged={onPageChanged}/>
      </div>
    </div>
  );
};
