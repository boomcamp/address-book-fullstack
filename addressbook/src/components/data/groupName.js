import React, { useEffect, useState } from "react";
import { url } from "../../url";
import Axios from "axios";

export const GroupName = props => {
  const { user } = props;
  const [groupName, setGroupName] = useState("");
  useEffect(() => {
    if (props.group_id) {
      const getData = async () => {
        const response = await Axios.get(`${url}/groups/${props.group_id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setGroupName(response.data[0].group_name);
      };
      getData();
    }
  }, [props, groupName, user]);
  return <span>{groupName}</span>;
};
