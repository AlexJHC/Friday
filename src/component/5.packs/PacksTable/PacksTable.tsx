import {CardPacksType} from "../../../api/api-packs";
import {dateConvertor} from "../../3.features/Helpers/Helpers";
import {Link} from "react-router-dom";

type PacksTablePropsType = {
  packs: CardPacksType[]
  getCards: (id: string) => void
}

export const PacksTable = ({packs, getCards}: PacksTablePropsType) => {

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
      <td><Link to={'/cards'} onClick={() => getCards(item._id)}>Learn</Link></td>
    </tr>
    </tbody>)

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <table className="table" style={{borderSpacing: '55px 15px'}}>
        {tableHead}
        {tableBodyMap}
      </table>
    </div>
  )
}
