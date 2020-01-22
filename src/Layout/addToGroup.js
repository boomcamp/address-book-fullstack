import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import axios from "axios";

const ITEM_HEIGHT = 48;

export default function AddToGroup({ headers, groups, idContact }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdd = (id, name) => {
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
      .then(() =>
        alert(`Added to Group ${name[0].toUpperCase() + name.slice(1)}`)
      )
      .catch(error => {
        try {
          alert(error.response.data.error);
        } catch {
          console.log(error);
        }
      });
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
            <MenuItem
              key={i}
              onClick={() => handleAdd(group.id, group.groupname)}
            >
              {group.groupname}
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
}
