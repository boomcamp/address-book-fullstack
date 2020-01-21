import React, { useEffect } from "react";
import "./selectsort.css";
import axios from "axios";

export default function SelectSort(highprops) {
  const selectSort = e => {

    console.log(highprops.setGroupRef);
    
    // http://localhost:5000/api/contacts/groups/${sessionStorage.getItem(
    //   "userid"/${highprops.setGroupRef}?order=${e.target.value}


    axios({
      method: "get",
      url: highprops.setGroupRef ? 
      
      `http://localhost:5000/api/contacts/groups/${sessionStorage.getItem('userid')}/ ${highprops.setGroupRef}?order=${e.target.value}`:

      `http://localhost:5000/api/contacts/groups/${sessionStorage.getItem("userid")}/sort/${e.target.value}/${highprops.setGroupRef}`
      // url: `http://localhost:5000/api/contacts/groups/${sessionStorage.getItem(
      //   "userid"
      // )}/sort/${e.target.value == 2 ? "ASC" : "DESC"}/${highprops.setGroupRef}`
    })
      .then(data => {
        console.log(data);
        highprops.setTableData(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="select-sort-container">
        <select className="select-sort" onChange={selectSort}>
          <option value="0" default>
            SORT LAST NAME BY
          </option>
          {/* <option value="1">LastName</option> */}
          <option value="ASC">Ascendling</option>
          <option value="DESc">Descending</option>
        </select>
      </div>
    </>
  );
}
