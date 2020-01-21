import React, { useEffect, useState } from "react";
import { url } from "../../url";
import Axios from "axios";
import styled from "styled-components";

const Span = styled.span`
  font-size: 14px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-style: italic;
  padding: 5px 10px 5px 10px;
`;

export const GroupName = props => {
  const { user } = props;
  const [groupName, setGroupName] = useState("Not assigned");
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
    if (!props.group_id) {
      setGroupName("Not assigned");
    }
  }, [props, groupName, user]);
  return (
    <Span
      style={
        groupName === "Not assigned" ? { textDecoration: "line-through" } : {}
      }
    >
      {groupName}
    </Span>
  );
};
