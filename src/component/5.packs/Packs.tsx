import {PacksTable, Pagination, Search} from '.'
import React, {useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import debounce from 'lodash.debounce'
import {
  PacksInitialStateType,
  createPack,
  fetchPacks,
  removePacks,
  renamePacks,
  setPacksCurrentPage,
  setPacksFilter,
  setPacksFromRange,
  setPacksMyId,
  setPacksPageCount,
  setPacksSearchField
} from '../../store/packsReducer'
import {AppRootStateType} from '../../store/store'
import style from './Packs.module.css'
import {RangeContainer} from '../3.features/RangeContainer/RangeContainer'
import CheckBoxMyId from '../3.features/CheckBoxMyId/CheckBoxMyId'
import {setIsMyId} from '../../store/appReducer'
import PageCountSelect from '../3.features/PageCountSelect/PageCountSelect'
import {Navigate} from 'react-router-dom'
import PopUpAddPack from './PopUpAddPack/PopUpAddPack'


export const Packs = () => {
  const dispatch = useDispatch()

  // Selectors
  const {
    cardPacks,
    page,
    pageCount,
    cardPacksTotalCount,
    minCardsCount,
    maxCardsCount,
    cardsValuesFromRange,
    sortPacks,
  } = useSelector<AppRootStateType, PacksInitialStateType>(state => state.packs)
  const isMyId = useSelector<AppRootStateType, boolean>(state => state.app.isMyId)
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)
  const userId = useSelector<AppRootStateType, string>(state => state.auth.user._id)

  const isMyIdHandler = (isMyId: boolean) => {
    dispatch(setIsMyId(isMyId))
    dispatch(setPacksFromRange([0, 1000]))
    dispatch(setPacksSearchField(''))
  }
  const handleRemovePacks = (PackId: string) => {
    dispatch(removePacks(PackId))
  }
  const handleRenamePacks = (_id: string, name: string) => {
    dispatch(renamePacks({_id, name}))
  }
  const handleSortPacks = (sortValue:string) => {
    dispatch(setPacksFilter(sortValue))
  }
  const onPageChanged = (page: number) => {
    dispatch(setPacksCurrentPage(page));
  };
  const setPageCount = (option: number) => {
    dispatch(setPacksPageCount(option))
  }
  const debouncedFetchData = useMemo(() => debounce(values => {
    dispatch(setPacksFromRange(values))
  }, 400), [dispatch]);
  const handleRangeChange = (values: number[]) => {
    debouncedFetchData(values)
  };
  const addNewPack = (name: string) => {
    dispatch(createPack({cardsPack: {name}}))
  };

  useEffect(() => {
    dispatch(setPacksMyId(isMyId ? userId : null))
    dispatch(fetchPacks())
  }, [dispatch, page, pageCount, cardsValuesFromRange, isMyId, userId, sortPacks])

  if (!isAuth) return <Navigate to='/'/>

  return (

    <div className={style.packsWrapper}>
      <div>
        <Search
          fetchData={fetchPacks}/>
      </div>
      <br/>
      <CheckBoxMyId
        isMyId={isMyId}
        isMyIdHandler={isMyIdHandler}/>
      <div>
        <br/>
        <RangeContainer
          minCardsCount={minCardsCount}
          maxCardsCount={maxCardsCount}
          handleRangeChange={handleRangeChange}/>
      </div>
      <br/>
      <PopUpAddPack
        logic={addNewPack}
        header={'Add New Pack'}/>
      <br/>
      <div>
        <div>
          <PacksTable
            packs={cardPacks}
            userId={userId}
            removePack={handleRemovePacks}
            renamePack={handleRenamePacks}
            sortItems={handleSortPacks}
            />
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
        <PageCountSelect
          selectedPageCount={pageCount}
          options={[10, 20, 50]}
          changeOption={setPageCount}>
          packs
        </PageCountSelect>
      </div>
    </div>
  );
};