import {DoubleRange, PacksTable, Pagination, Search, Sort} from '.';
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchPacks, setPacksCurrentPage} from '../../store/packsReducer';
import {AppRootStateType} from "../../store/store";
import style from './Packs.module.css'

export const Packs = () => {
  const dispatch = useDispatch()
  const {cardPacks, page} = useSelector<AppRootStateType, any>(state => state.packs)

  // Double range
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(100)

  const onChangeSuperRange = (value: [number, number]) => {
    setValue1(value[0])
    setValue2(value[1])
  }

  // Pagination
  const onPageChanged = useCallback((page) => {
    dispatch(setPacksCurrentPage({page}));
  }, []);

  useEffect(() => {
    dispatch(fetchPacks())
  }, [page])

  return (
    <div className={style.packsWrapper}>
      <div>
        <Search/>
      </div>
      {/*<div>*/}
      {/*  <Sort/>*/}
      {/*</div>*/}
      <div style={{display: "flex", justifyContent: "flex-start", alignItems: "self-start"}}>
        <div style={{display: "flex", minWidth: '200px', justifyContent: 'center', flexGrow: '1'}}>
          <span style={{width: '1.4%'}}>{value1}</span>
          <DoubleRange
            value={[value1, value2]}
            onChangeRange={onChangeSuperRange}
          />
          <span>{value2}</span>
        </div>
        <div>
          <PacksTable packs={cardPacks}/>
        </div>
      </div>
      <br/>
      <div>
        <Pagination
          // Data Array length
          totalRecords={200}
          pageLimit={10}
          pageNeighbours={3}
          currentPage={page}
          onPageChanged={onPageChanged}/>
      </div>
    </div>
  );
};
