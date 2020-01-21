import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import axios from "axios";

const ITEM_HEIGHT = 48;

export default function AddToGroup({ headers, match, idContact, groups }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdd = id => {
    setAnchorEl(null);
    axios
      .post(
        `http://localhost:3001/group/add/${idContact}`,
        {
          groupid: id,
          contactid: idContact
        },
        headers
      )
      .then(() => alert("Added"));
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <GroupAddIcon style={{ color: "black" }} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        {groups.length === 0 ? (
          <MenuItem key={groups.length}>No Group/s Added</MenuItem>
        ) : (
          groups.map((group, i) => (
            <MenuItem key={i} onClick={() => handleAdd(group.id)}>
              {group.groupname}
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
}
