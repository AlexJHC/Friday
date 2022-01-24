import {CardPacksType} from "../../../api/api-packs";
import {dateConvertor} from "../../3.features/Helpers/Helpers";
import {Link} from "react-router-dom";
import style from "./PacksTable.module.css"
import {sortPacksType} from "../../../store/packsReducer";
import {Sort} from "../../3.features/Sort/Sort";
import React from "react";

type PacksTablePropsType = {
  packs: CardPacksType[]
  userId: string
  removePack: (packId: string) => void
  renamePack: (_id: string, name: string) => void
  sortValue: sortPacksType
  sortItems: () => void
}

export const PacksTable = ({packs, userId, removePack, renamePack, sortValue, sortItems}: PacksTablePropsType) => {

  // Ui Table
  const tableHead =
    <thead>
    <tr>
      <th>Name</th>
      <th>Cards</th>
      <th>Last Update<Sort value={sortValue} sortItems={sortItems}/></th>
      <th>Created by</th>
      <th>Actions</th>
    </tr>
    </thead>

  const tableBodyMap = packs.map(item =>
    <tbody key={item._id}>
    <tr>
      <td>
        <Link
          className={style.linkToCard}
          to={`/cards/${item._id}`}>
          {item.name}
        </Link>
      </td>
      <td>{item.cardsCount}</td>
      <td>{dateConvertor(item.updated)}</td>
      <td>{item.user_name}</td>
      <td>
        <div className={style.btnWrapper}>
          {userId === item.user_id && <>
            <button
              className={`${style.wrapperItem} ${style.delete}`}
              onClick={() => removePack(item._id)}>
              Delete
            </button>
            <button
              className={style.wrapperItem}
              onClick={() => renamePack(item._id, 'renamed Pack')}>
              Edit
            </button>
          </>
          }
          <Link
            className={style.wrapperItem}
            to={`/learn/${item._id}`}
            role="button">
            Learn
          </Link>
        </div>
      </td>
    </tr>
    </tbody>)

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <table className="table" style={{borderSpacing: '45px 15px'}}>
        {tableHead}
        {tableBodyMap}
      </table>
    </div>
  )
}
