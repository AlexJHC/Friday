import React from 'react'
import {Sort} from '../../../3.features/Sort/Sort'

type CardsTableHeaderPropsType = {
  isMyCards: boolean
  sortCards: (sortValue: string) => void
}
const CardsTableHeader: React.FC<CardsTableHeaderPropsType> = React.memo((
  {
    isMyCards,
    sortCards,
  }) => {

  return (
    <thead>
    <tr>
      <th>Question <Sort value="question" sortItems={sortCards}/></th>
      <th>Answer <Sort value="answer" sortItems={sortCards}/></th>
      <th>Last Updated <Sort value="updated" sortItems={sortCards}/></th>
      <th>Grade <Sort value="grade" sortItems={sortCards}/></th>
      {isMyCards && <th>Actions</th>}
    </tr>
    </thead>
  )
})

export default CardsTableHeader
