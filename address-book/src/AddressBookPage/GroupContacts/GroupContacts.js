import React, { useEffect, useState } from "react";
import "./group.css";
import axios from "axios";
import GroupsContainer from "./GroupsContainer";

export default function GroupContacts(highprops) {
  const [state, setState] = useState(null);

  let group_active = [];

  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/contacts/groups/active",
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => {
        normalizeGroup(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const normalizeGroup = data => {
    console.log(data);

    let unique = [];

    data.map(data => {
      if (unique.indexOf(data.group_name) < 0 && data.group_name !== "") {
        unique.push(data.group_name);
        group_active.push(data);
      }
    });

    setState(group_active);
  };

  const getGroups = e => {
    // here
    axios({
      method: "get",
      url: `http://localhost:5000/api/contacts/groups/${e}`,
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => {
        // console.log(data.data)
        return highprops.setDataGroup(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getAllContacts = () => {
    // here
    axios({
      method: "get",
      url: `http://localhost:5000/api/contacts`,
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => {
        // console.log(data.data)
        return highprops.setDataGroup(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="group-context-container">
      <p style={{margin:'20px'}}>Active Contact Groups</p>
      {state
        ? state.map(data => {
            return (
              <GroupsContainer
                glist={data}
                getGroups={getGroups}
                closetab={highprops.close}
              />
            );
          })
        : ""}
      <div
        className="group-definition-container get-all-container"
        onClick={() => {
          getAllContacts();
        }}
      >
        Show all contacts
      </div>
    </div>
  );
}
