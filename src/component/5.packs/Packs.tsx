import {PacksTable, Pagination, Search} from '.';
import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from 'react-redux';
import debounce from "lodash.debounce";
import {
  createPack,
  fetchPacks,
  removePacks,
  setPacksCurrentPage,
  setPacksFromRange,
  setPacksPageCount
} from '../../store/packsReducer';
import {AppRootStateType} from "../../store/store";
import style from './Packs.module.css'
import {RangeContainer} from "../3.features/RangeContainer/RangeContainer";
import CheckBoxMyId from "../3.features/CheckBoxMyId/CheckBoxMyId";
import {setIsMyId} from "../../store/appReducer";
import PageCountSelect from "../3.features/PageCountSelect/PageCountSelect";
import {AddPackForm} from "./AddPackForm/AddPackForm";

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
  const userId = useSelector<AppRootStateType, string>(state => state.profile.user._id)

  const isMyIdHandler = (isMyId: boolean) => {
    dispatch(setIsMyId(isMyId))
    dispatch(setPacksFromRange({values: [0, 1000]}))
  }
  const handleRemovePacks = (PackId: string) => {
    dispatch(removePacks(PackId, isMyId ? userId : undefined))
  }
  const onPageChanged = (page: number) => {
    dispatch(setPacksCurrentPage(page));
  };
  const setPageCount = (option: number) => {
    dispatch(setPacksPageCount(option))
  }
  const debouncedFetchData = useMemo(() => debounce(values => {
    dispatch(setPacksFromRange({values: values}))
  }, 400), [dispatch]);
  const handleRangeChange = (values: number[]) => {
    debouncedFetchData(values)
  };
  const addNewPack = (newName: string) => {
    dispatch(createPack({cardsPack: {name: newName}}))
  };

  useEffect(() => {
    dispatch(fetchPacks(isMyId ? {user_id: userId} : {}))
  }, [dispatch, page, pageCount, cardsValuesFromRange, isMyId, userId])

  return (
    <div className={style.packsWrapper}>
      <div>
        <Search fetchData={fetchPacks}/>
      </div>
      <br/>
      <CheckBoxMyId isMyId={isMyId}
                    isMyIdHandler={isMyIdHandler}
      />
      <div>
        <RangeContainer minCardsCount={minCardsCount}
                        maxCardsCount={maxCardsCount}
                        handleRangeChange={handleRangeChange}
        />
      </div>
      <br/>
      <AddPackForm addPack={addNewPack}/>
      <br/>
      <div>
        <div>
          <PacksTable packs={cardPacks}
                      userId={userId}
                      removePack={handleRemovePacks}/>
        </div>
      </div>
      <br/>
      <div>
        <Pagination
          totalRecords={cardPacksTotalCount}
          pageLimit={pageCount}
          pageNeighbours={3}
          currentPage={page}
          onPageChanged={onPageChanged}/>
      </div>
      <div>
        <PageCountSelect options={[10, 20, 50]} changeOption={setPageCount}>
          packs
        </PageCountSelect>
      </div>
    </div>
  );
};
