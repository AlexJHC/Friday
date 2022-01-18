import {CardPacksType} from "../../../api/api-packs";

type PacksTableType = {
  packs: CardPacksType[]
}

export const PacksTable = ({packs}: PacksTableType) => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <table className="table" style={{borderSpacing: '55px 15px'}}>
        <thead>
        <tr>
          <th>Name</th>
          <th>Cards</th>
          <th>Last Update</th>
          <th>Created by</th>
          <th>Actions</th>
        </tr>
        </thead>
        {packs.map(item => <tbody>
        <td>{item.name}</td>
        <td>{item.cardsCount}</td>
        <td>{item.updated}</td>
        <td>{item.user_name}</td>
        </tbody>)}
      </table>
    </div>
  )
}
