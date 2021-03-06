import {PacksTable, Pagination,} from '.'
import React, {useCallback, useEffect, useMemo} from 'react'
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
import {logOut, setIsMyId, setIsPackList} from '../../store/appReducer'
import {Navigate} from 'react-router-dom'
import CheckBoxMyId from '../3.features/CheckBoxMyId/CheckBoxMyId'
import PacksList from './PacksList/PacksList'
import Profile from '../2.profile/Profile'
import PopUpAddPack from './PopUpAddPack/PopUpAddPack'
import PageCountSelect from '../3.features/PageCountSelect/PageCountSelect'


export const Packs = React.memo(() => {

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
  const userId = useSelector<AppRootStateType, string>(state => state.auth.user._id)
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)
  const profileOrPackList = useSelector<AppRootStateType, boolean>(state => state.app.isPackList)
  const name = useSelector<AppRootStateType, string>(state => state.auth.user.name)
  const avatar = useSelector<AppRootStateType, string | undefined>(state => state.auth.user.avatar)


  const handleLogOut = () => {
    dispatch(logOut())
  }
  const handleMyPacksAndProfile = () => {
    dispatch(setIsMyId(true))
  }
  const setProfileOrPackList = useCallback((isPackList: boolean) => {
    dispatch(setIsPackList(isPackList))
  }, [dispatch])
  const handleIsMyIdToggle = useCallback((isMyId: boolean) => {
    dispatch(setIsMyId(isMyId))
    dispatch(setPacksFromRange([0, 1000]))
    dispatch(setPacksSearchField(''))
  }, [dispatch])
  const handleRemovePacks = useCallback((PackId: string) => {
    dispatch(removePacks(PackId))
  }, [dispatch])
  const handleRenamePacks = useCallback((_id: string, name: string) => {
    dispatch(renamePacks({_id, name}))
  }, [dispatch])
  const handleSortPacks = useCallback((sortValue: string) => {
    dispatch(setPacksFilter(sortValue))
  }, [dispatch])
  const onPageChanged = useCallback((page: number) => {
    dispatch(setPacksCurrentPage(page))
  }, [dispatch])
  const setPageCount = useCallback((option: number) => {
    dispatch(setPacksPageCount(option))
  }, [dispatch])
  const debouncedFetchData = useMemo(() => debounce(values => {
    dispatch(setPacksFromRange(values))
  }, 400), [dispatch])
  const handleRangeChange = useCallback((values: number[]) => {
    debouncedFetchData(values)
  }, [debouncedFetchData])
  const addNewPack = useCallback((name: string) => {
    dispatch(createPack({cardsPack: {name}}))
  }, [dispatch])

  useEffect(() => {
    dispatch(setPacksMyId(isMyId ? userId : null))
    dispatch(fetchPacks())
  }, [dispatch, page, pageCount, cardsValuesFromRange, isMyId, userId, sortPacks])

  if (!isAuth) return <Navigate to="/"/>

  return (
    <div className={style.packsWrapper}>
      <div className={style.packsHeader}>
        <CheckBoxMyId
          handleMyPacksAndProfile={handleMyPacksAndProfile}
          stateBoolean={profileOrPackList}
          setToggleState={setProfileOrPackList}
          name={['Packs list', 'Profile']}
          styleMyPacks={false}/>
      </div>
      <div className={style.packsContentWrapper}>
        {profileOrPackList
          ? <div className={style.sideBar}>
            <PacksList
              className={style.search}
              isMyId={isMyId}
              isMyIdToggle={handleIsMyIdToggle}
              cardsValuesFromRange={cardsValuesFromRange}
              minCardsCount={minCardsCount}
              maxCardsCount={maxCardsCount}
              handleRangeChange={handleRangeChange}/>
          </div>
          : <div className={style.sideBar}>
            <Profile
              className={style.search}
              cardsValuesFromRange={cardsValuesFromRange}
              logOut={handleLogOut}
              avatar={avatar}
              name={name}
              minCardsCount={minCardsCount}
              maxCardsCount={maxCardsCount}
              handleRangeChange={handleRangeChange}/>
          </div>}
        <div className={style.tableWrapper}>
          <PopUpAddPack
            logic={addNewPack}
            header={'Add New Pack'}/>
          <PacksTable
            packs={cardPacks}
            userId={userId}
            removePack={handleRemovePacks}
            renamePack={handleRenamePacks}
            sortItems={handleSortPacks}/>
          <Pagination
            totalRecords={cardPacksTotalCount}
            pageLimit={pageCount}
            pageNeighbours={3}
            currentPage={page}
            onPageChanged={onPageChanged}/>
          <PageCountSelect
            selectedPageCount={pageCount}
            options={[5, 10, 15]}
            changeOption={setPageCount}>
            packs
          </PageCountSelect>
        </div>
      </div>
    </div>
  )
})

export default Packs
