// // import React, { useState, useEffect } from "react";
// // import { makeStyles } from "@material-ui/core/styles";
// // import Input from "@material-ui/core/Input";
// // import InputLabel from "@material-ui/core/InputLabel";
// // import MenuItem from "@material-ui/core/MenuItem";
// // import FormControl from "@material-ui/core/FormControl";
// // import ListItemText from "@material-ui/core/ListItemText";
// // import Select from "@material-ui/core/Select";
// // import Checkbox from "@material-ui/core/Checkbox";
// // import axios from "axios";
// // import jwt from "jsonwebtoken";

// // const useStyles = makeStyles(theme => ({
// //   formControl: {
// //     width: "100%"
// //   },
// //   chips: {
// //     display: "flex",
// //     flexWrap: "wrap"
// //   },
// //   chip: {
// //     margin: 2
// //   },
// //   noLabel: {
// //     marginTop: theme.spacing(3)
// //   }
// // }));

// // const ITEM_HEIGHT = 48;
// // const ITEM_PADDING_TOP = 8;
// // const MenuProps = {
// //   PaperProps: {
// //     style: {
// //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// //       width: 250
// //     }
// //   }
// // };
// // // function hasValue(obj, key, value) {
// // //   return obj.hasOwnProperty(key) && obj[key] === value;
// // // }
// // export default function AddToGroupList({ setIds, ids }) {
// //   const tokenDecoded = jwt.decode(localStorage.getItem("Token"));
// //   const [groupList, setGroupList] = useState([]);
// //   const [value, setValue] = React.useState([ids[1], ids[2]]);
// //   const [pendingValue, setPendingValue] = React.useState([]);
// //   const classes = useStyles();
// //   setIds(ids);
// //   const handleChange = (e, newValue) => {
// //     console.log(newValue);
// //     setIds(e.target.value);
// //     // console.log(e.target.value);
// //     if (ids) {
// //       console.log(ids);
// //       // const checkUsername = obj =>
// //       //   obj.id === e.target.value[e.target.value.length - 1].id;

// //       // if (ids.some(checkUsername)) {
// //       //   var index = ids.findIndex(function(o) {
// //       //     return o.id === e.target.value[e.target.value.length - 1].id;
// //       //   });
// //       //   const newArr = index !== -1 ? ids.splice(index, 1) : ids;
// //       //   setIds(newArr);
// //       // } else {
// //       // setIds(e.target.value);
// //       // }
// //     }
// //     // console.log(ids);
// //     // const index = ids.findIndex(
// //     //   x => x.id === event.target.value[ids.length - 1].id
// //     // );
// //     // console.log(index);
// //     // if (ids.indexOf(event.target.value)) {
// //     //   setIds(ids.splice(x, 1));
// //     // }
// //     // console.log(ids.some(res => hasValue(res, "id", 5)));
// //     // setIds(event.target.value);
// //   };
// //   useEffect(() => {
// //     async function result() {
// //       await axios({
// //         method: "get",
// //         url: `http://localhost:3004/group/${tokenDecoded.userId}`
// //       })
// //         .then(res => {
// //           //   console.log(res.data);
// //           setGroupList(res.data);
// //         })
// //         .catch(err => console.log(err));
// //     }
// //     result();
// //   }, [tokenDecoded.userId]);
// //   // console.log(ids);
// //   return (
// //     <FormControl className={classes.formControl}>
// //       <InputLabel id="demo-mutiple-checkbox-label">Group List</InputLabel>
// //       <Select
// //         labelId="demo-mutiple-checkbox-label"
// //         id="demo-mutiple-checkbox"
// //         multiple
// //         value={pendingValue}
// //         onChange={(event, newValue) => {
// //           setPendingValue(newValue);
// //         }}
// //         options={[...labels].sort((a, b) => {
// //           // Display the selected labels first.
// //           let ai = value.indexOf(a);
// //           ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
// //           let bi = value.indexOf(b);
// //           bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
// //           return ai - bi;
// //         })}
// //         input={<Input />}
// //         // renderValue={selected => selected.map(a => a.groupname).join(", ")}
// //         MenuProps={MenuProps}
// //       >
// //         {groupList.map((data, key) => (
// //           <MenuItem key={key} value={data}>
// //             <Checkbox checked={ids.map(a => a.id).indexOf(data.id) > -1} />
// //             <ListItemText primary={data.groupname} />
// //           </MenuItem>
// //         ))}
// //       </Select>
// //     </FormControl>
// //   );
// // }
// // const labels = [
// //   {
// //     name: "good first issue",
// //     color: "#7057ff",
// //     description: "Good for newcomers"
// //   },
// //   {
// //     name: "help wanted",
// //     color: "#008672",
// //     description: "Extra attention is needed"
// //   },
// //   {
// //     name: "priority: critical",
// //     color: "#b60205",
// //     description: ""
// //   }
// // ];

// import React from "react";
// import { useTheme, fade, makeStyles } from "@material-ui/core/styles";
// import Popper from "@material-ui/core/Popper";
// import SettingsIcon from "@material-ui/icons/Settings";
// import CloseIcon from "@material-ui/icons/Close";
// import DoneIcon from "@material-ui/icons/Done";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import ButtonBase from "@material-ui/core/ButtonBase";
// import InputBase from "@material-ui/core/InputBase";

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: 221,
//     fontSize: 13
//   },
//   button: {
//     fontSize: 13,
//     width: "100%",
//     textAlign: "left",
//     paddingBottom: 8,
//     color: "#586069",
//     fontWeight: 600,
//     "&:hover,&:focus": {
//       color: "#0366d6"
//     },
//     "& span": {
//       width: "100%"
//     },
//     "& svg": {
//       width: 16,
//       height: 16
//     }
//   },
//   tag: {
//     marginTop: 3,
//     height: 20,
//     padding: ".15em 4px",
//     fontWeight: 600,
//     lineHeight: "15px",
//     borderRadius: 2
//   },
//   popper: {
//     border: "1px solid rgba(27,31,35,.15)",
//     boxShadow: "0 3px 12px rgba(27,31,35,.15)",
//     borderRadius: 3,
//     width: 300,
//     zIndex: 1,
//     fontSize: 13,
//     color: "#586069",
//     backgroundColor: "#f6f8fa"
//   },
//   header: {
//     borderBottom: "1px solid #e1e4e8",
//     padding: "8px 10px",
//     fontWeight: 600
//   },
//   inputBase: {
//     padding: 10,
//     width: "100%",
//     borderBottom: "1px solid #dfe2e5",
//     "& input": {
//       borderRadius: 4,
//       backgroundColor: theme.palette.common.white,
//       padding: 8,
//       transition: theme.transitions.create(["border-color", "box-shadow"]),
//       border: "1px solid #ced4da",
//       fontSize: 14,
//       "&:focus": {
//         boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//         borderColor: theme.palette.primary.main
//       }
//     }
//   },
//   paper: {
//     boxShadow: "none",
//     margin: 0,
//     color: "#586069",
//     fontSize: 13
//   },
//   option: {
//     minHeight: "auto",
//     alignItems: "flex-start",
//     padding: 8,
//     '&[aria-selected="true"]': {
//       backgroundColor: "transparent"
//     },
//     '&[data-focus="true"]': {
//       backgroundColor: theme.palette.action.hover
//     }
//   },
//   popperDisablePortal: {
//     position: "relative"
//   },
//   iconSelected: {
//     width: 17,
//     height: 17,
//     marginRight: 5,
//     marginLeft: -2
//   },
//   color: {
//     width: 14,
//     height: 14,
//     flexShrink: 0,
//     borderRadius: 3,
//     marginRight: 8,
//     marginTop: 2
//   },
//   text: {
//     flexGrow: 1
//   },
//   close: {
//     opacity: 0.6,
//     width: 18,
//     height: 18
//   }
// }));

// import React from "react";
// import Chip from "@material-ui/core/Chip";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";

// export default function AddToGroupList() {
//   const handleChange = e => {
//     console.log(e);
//     // setIds(e.target.value);
//   };
//   return (
//     <Autocomplete
//       multiple
//       id="fixed-tags-demo"
//       options={top100Films}
//       getOptionLabel={option => option.groupname}
//       defaultValue={top100Films}
//       renderTags={(value, getTagProps) =>
//         value.map((option, index) => (
//           <Chip label={option.groupname} {...getTagProps({ index })} />
//         ))
//       }
//       onChange={handleChange}
//       style={{ width: 500 }}
//       renderInput={params => (
//         <TextField
//           {...params}
//           label="Fixed tag"
//           variant="outlined"
//           placeholder="Favorites"
//           fullWidth
//         />
//       )}
//     />
//   );
// }

import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
// // import React, { useState, useEffect } from "react";
// // import { makeStyles } from "@material-ui/core/styles";
// // import Input from "@material-ui/core/Input";
// // import InputLabel from "@material-ui/core/InputLabel";
// // import MenuItem from "@material-ui/core/MenuItem";
// // import FormControl from "@material-ui/core/FormControl";
// // import ListItemText from "@material-ui/core/ListItemText";
// // import Select from "@material-ui/core/Select";
// // import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import jwt from "jsonwebtoken";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

var top100Films = [
  { id: 5, userid: 1, groupname: "Helloooo" },
  { id: 4, userid: 1, groupname: "Lancerrrrr" },
  { id: 41, userid: 1, groupname: "Hello" }
];

export default function AddToGroupList({ setIds, ids, groupList }) {
  const tokenDecoded = jwt.decode(localStorage.getItem("Token"));
  // const [groupList, setGroupList] = useState([]);
  // useEffect(() => {
  //   async function result() {
  //     await axios({
  //       method: "get",
  //       url: `http://localhost:3004/group/${tokenDecoded.userId}`
  //     })
  //       .then(res => {
  //         //   console.log(res.data);
  //         setGroupList([...res.data]);
  //       })
  //       .catch(err => console.log(err));
  //   }
  //   result();
  // }, [tokenDecoded.userId]);
  // console.log(groupList);
  const handleChange = e => {
    console.log(e);
    // console.log(groupList);
    // console.log(top100Films);
    // setIds(e.target.value);
  };
  top100Films = groupList;
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      defaultValue={[top100Films[0]]}
      disableCloseOnSelect
      getOptionLabel={option => {
        if (option !== "undefined") {
          // console.log(option.groupname);
        }
        return option.groupname;
      }}
      onChange={(e, v) => handleChange(v)}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.groupname}
        </React.Fragment>
      )}
      style={{ width: 500 }}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          label="Checkboxes"
          placeholder="Favorites"
          fullWidth
        />
      )}
    />
  );
}
