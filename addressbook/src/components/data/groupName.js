import React, { useState, useEffect } from "react";
import { url } from "../../url";
import Axios from "axios";

export const GroupName = props => {
  const { user } = props;
  const [groupName, setGroupName] = useState("Not assigned");
  useEffect(() => {
    const abortController = new AbortController();

    if (props.group_id) {
      const getData = async () => {
        const response = await Axios.get(
          `${url}/groups/${props.group_id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` }
          },
          { signal: abortController.signal }
        );
        setGroupName(response.data[0].group_name);
      };
      getData();
    }
    if (!props.group_id) {
      setGroupName("Not assigned");
    }
    return () => abortController.abort();
  }, [props, groupName, user]);
  return <span>{groupName}</span>;
};
