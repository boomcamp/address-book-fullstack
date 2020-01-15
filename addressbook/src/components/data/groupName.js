import React, { useEffect, useState } from "react";
import { url } from "../../url";
import Axios from "axios";

export const GroupName = props => {
  const { user } = props;
  const [groupName, setGroupName] = useState("");
  useEffect(() => {
    if (props.groupId) {
      const getData = async () => {
        const response = await Axios.get(`${url}/groups/${props.groupId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setGroupName(response.data[0].groupName);
      };
      getData();
    }
  }, [props, groupName]);
  return <span>{groupName}</span>;
};
