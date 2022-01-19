import React, {useEffect, useMemo, useState} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {useDispatch, useSelector} from 'react-redux';
import {setPacksFromRange} from "../../../store/packsReducer";
import debounce from "lodash.debounce";
import {AppRootStateType} from "../../../store/store";

type CardsRangePropsType = {
  minCardsCount: number
  maxCardsCount: number
}

export const RangeContainer = ({minCardsCount, maxCardsCount}: CardsRangePropsType) => {
  const dispatch = useDispatch();
  const cardsValuesFromRange= useSelector<AppRootStateType, number[]>(state => state.packs.cardsValuesFromRange)

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  const [rangeValues, setRangeValues] = useState([minCardsCount, maxCardsCount])
  const rangeMarks = {
    // [minCardsCount]: {label: minCardsCount},
    // [maxCardsCount]: {label: maxCardsCount},
    [cardsValuesFromRange[0]]: {label: cardsValuesFromRange[0]},
    [cardsValuesFromRange[1]]: {label: cardsValuesFromRange[1]},
  }

  const debouncedFetchData = useMemo(() => debounce(values => {
    dispatch(setPacksFromRange({values: values}))
  }, 400), [dispatch]);

  const onRangeChange = (values: number[]) => {
    setRangeValues(values);
    debouncedFetchData(values)
  };

  useEffect(() => {
    setRangeValues([cardsValuesFromRange[0], cardsValuesFromRange[1]])
  }, [cardsValuesFromRange])

  return (
    <Range
      defaultValue={rangeValues}
      min={minCardsCount}
      max={maxCardsCount}
      onAfterChange={onRangeChange}
      // pushable={false}
      style={{width: '340px'}}
      allowCross={false}
      marks={rangeMarks}
    />
  )
}
