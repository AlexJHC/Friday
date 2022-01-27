import React, {useEffect, useState} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

type CardsRangePropsType = {
  minCardsCount: number
  maxCardsCount: number
  handleRangeChange: (values: number[]) => void
  cardsValuesFromRange: number[]
}

export const RangeContainer = React.memo(({
                                            minCardsCount,
                                            maxCardsCount,
                                            handleRangeChange,
                                            cardsValuesFromRange
                                          }: CardsRangePropsType) => {

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  const [rangeValues, setRangeValues] = useState([minCardsCount, maxCardsCount])
  const rangeMarks = {
    [minCardsCount]: {label: minCardsCount},
    [maxCardsCount]: {label: maxCardsCount},
  }

  const onRangeChange = (values: number[]) => {
    if (values[0] === rangeValues[0] && values[1] === rangeValues[1]) return
    setRangeValues(values);
    handleRangeChange(values)
  };

  useEffect(() => {
    setRangeValues([cardsValuesFromRange[0], cardsValuesFromRange[1]])
  }, [cardsValuesFromRange])

  return (
    <Range
      defaultValue={rangeValues}
      allowCross={false}
      min={minCardsCount}
      max={maxCardsCount}
      onAfterChange={onRangeChange}
      marks={rangeMarks}
      style={{width: '340px', marginTop: '40px'}}
    />
  )
})
