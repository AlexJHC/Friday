import {CardPacksType} from '../../../api/api-packs'
import {dateConvertor} from '../../3.features/Helpers/Helpers'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../../store/store'

type PacksTablePropsType = {
  packs: CardPacksType[]
}

export const PacksTable = ({packs}: PacksTablePropsType) => {

  const myId = useSelector<AppRootStateType, string>(state => state.profile.user._id)

  // Ui Table
  const tableHead =
    <thead>
    <tr>
      <th>Name</th>
      <th>Cards</th>
      <th>Last Update</th>
      <th>Created by</th>
      <th>Actions</th>
    </tr>
    </thead>

  const tableBodyMap = packs.map(item =>
    <tbody key={item._id}>
    <tr>
      <td>{item.name}</td>
      <td>{item.cardsCount}</td>
      <td>{dateConvertor(item.updated)}</td>
      <td>{item.user_name}</td>
      <td>
        <div>
          {myId === item._id && <>
            <button>Delete</button>
            <button>Edit</button>
          </>}
          <Link to={`/cards/${item._id}`}>Learn</Link>
        </div>
      </td>
    </tr>
    </tbody>)

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <table className="table" style={{borderSpacing: '55px 15px'}}>
        {tableHead}
        {tableBodyMap}
      </table>
    </div>
  )
}
