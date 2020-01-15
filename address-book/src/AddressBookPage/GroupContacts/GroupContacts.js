import React, { useEffect, useState } from "react";
import "./group.css";
import axios from "axios";
import GroupsContainer from "./GroupsContainer";

export default function GroupContacts() {
  const [state, setState] = useState(null);
  const [control, setControl] = useState(false);

  let group_active = [];

  useEffect(() => {
    getGroup();
  });

  const getGroup = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/contacts/groups/active",
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => {
        // setState();
        normalizeGroup(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const normalizeGroup = data => {
    // console.log(state.data);
    data.map(data => {
      // console.log(data.group_name)
      if (group_active.indexOf(data.group_name) < 0 && data.group_name !== "") {
        group_active.push(data.group_name);
      }
    });

    setState(group_active);
    // console.log(group_active);
    // state.data.map(data => {
    //   return console.log(data.group_name);
    // });
    console.log(state);
    setControl(true);
  };

  console.log(group_active);

  return (
    <>
      {state
        ? state.map(data => {
            return <GroupsContainer glist={data} />;
          })
        : ""}
    </>
  );
}
