import {CardPacksType} from "../../../api/api-packs";
import {DateConvertor} from "../../3.features/Helpers/Helpers";

type PacksTableType = {
  packs: CardPacksType[]
}

export const PacksTable = ({packs}: PacksTableType) => {

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
      <td>{DateConvertor(item.updated)}</td>
      <td>{item.user_name}</td>
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
