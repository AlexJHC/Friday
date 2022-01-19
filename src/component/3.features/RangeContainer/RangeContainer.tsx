import React, {useEffect, useState} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {useDispatch} from 'react-redux';
import {setPacksFromRange} from "../../../store/packsReducer";

type CardsRangePropsType = {
  minCardsCount: number
  maxCardsCount: number
}

export const RangeContainer = ({minCardsCount, maxCardsCount}: CardsRangePropsType) => {

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  const dispatch = useDispatch();

  const [rangeValues, setRangeValues] = useState([minCardsCount, maxCardsCount])

  const onRangeChange = (values: number[]): void => {
    setRangeValues(values);
    dispatch(setPacksFromRange({values: values}))
  };

  useEffect(() => {
    setRangeValues([minCardsCount, maxCardsCount])
  }, [minCardsCount, maxCardsCount])


  return (
    <Range
      defaultValue={rangeValues}
      min={minCardsCount}
      max={maxCardsCount}
      onAfterChange={onRangeChange}
      pushable={false}
      style={{width: '640px'}}
    />
  )
}
