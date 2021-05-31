import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenToMenuFromFirestore } from "../../app/firestore/firestoreService";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import { listenToMenu } from "../nav/navActions";
import { Pagination } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function MenuList() {
  const { menu } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

   const [data, setData] = useState([]);
   const [activePage, setActivePage] = useState(1);


  useFirestoreCollection({
    query: () => listenToMenuFromFirestore(),
    data: (menu) => dispatch(listenToMenu(menu)),
    deps: [dispatch],
  });

  const menuList = menu.map(
    ({ url, title, hassubmenu, submenu_name, id }) => {
      //  if (hassubmenu === 1) {
      //    return (
      //      <li key={index}>
      //        <NavLink exact to={url} activeClassName="active">
      //          {title}
      //        </NavLink>
      //        <i className="fa fa-sort-desc"></i>
      //        <ul className="submenu-list">{eval(submenu_name)}</ul>
      //      </li>
      //    );
      //  } else {
      return (
        <li key={id}>
          <NavLink exact to={url} activeClassName="active">
            {title}
          </NavLink>
        </li>
      );
    }
    // }
  );

  return (
    <>
      <Pagination />

      <div>
        <ul>{menuList}</ul>
      </div>
    </>
  );
}
