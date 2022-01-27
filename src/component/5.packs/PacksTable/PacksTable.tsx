import {CardPacksType} from "../../../api/api-packs";
import {dateConvertor} from "../../3.features/Helpers/Helpers";
import {Link} from "react-router-dom";
import style from "./PacksTable.module.css"
import {Sort} from "../../3.features/Sort/Sort";
import React, {Dispatch, SetStateAction, useState} from "react";
import PopUpDeletePack from "../DeletePack/PopUpDeletePack";
import PopUpEditPack from "../EditPack/PopUpEditPack";

type PacksTablePropsType = {
  packs: CardPacksType[]
  userId: string
  removePack: (packId: string) => void
  renamePack: (_id: string, name: string) => void
  sortItems: (sortValue: string) => void
}

export const PacksTable = (
  {
    packs,
    userId,
    removePack,
    renamePack,
    sortItems,
  }: PacksTablePropsType) => {

  // Ui Table
  const tableHead =
    <thead>
    <tr>
      <th>Name <Sort value="name" sortItems={sortItems}/></th>
      <th>Cards <Sort value="cardsCount" sortItems={sortItems}/></th>
      <th>Last Update <Sort value="updated" sortItems={sortItems}/></th>
      <th>Created by <Sort value="user_name" sortItems={sortItems}/></th>
      <th>Actions</th>
    </tr>
    </thead>

   const tableBodyMap = packs.map(item => {
    return (
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
              <PopUpDeletePack
                deletePack={()=>removePack(item._id)}
                header={'Delete Pack'}
                name={item.name}/>
              <PopUpEditPack
                renamePack={renamePack}
                header={'Rename Pack'}
                PackId={item._id}/>
            </>
            }
            <Link
              className={style.wrapperItem}
              to={`/learn/${item._id}/${item.name}`}
              role="button">
              Learn
            </Link>
          </div>
        </td>
      </tr>
      </tbody>)
  })

  // Ui Table

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <table className="table" style={{borderSpacing: '45px 15px'}}>
        {tableHead}
        {tableBodyMap}
      </table>
    </div>
  )
}
