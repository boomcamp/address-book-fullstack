import React, { useState, Fragment, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
// import Chip from "@material-ui/core/Chip";
import { Chip } from "@material-ui/core";
import './groupForm.css'

export default function GroupForm(highprops) {
  const classes = useStyles();

  const [grpState, setgrpState] = useState({
    selectedGroupName: {
      title: ""
    },
    recentGroupState: {
      title: ""
    },
    groupList: [
      {
        title: "work"
      },
      {
        title: "home"
      },
      {
        title: "crew"
      }
    ]
  });

  const [chipState, setChipState] = useState([]);
  const [initChip, setInitChip] = useState([]);

  useEffect(() => {
    getGroup();

    if (highprops.reference_contact) {
      setGroup(highprops.reference_contact);
    } else if (highprops.reference_contact === null) {
      console.log("new group create");
    }

    if (highprops.newContactData) {
      getNewDataDetails(highprops.newContactData);
    }

    console.log(highprops.reference_contact);
    console.log(highprops.newContactData);
  }, [highprops.reference_contact, highprops.newContactData]);

  const grpStateUpdate = (event, value, reason) => {
    setgrpState(prevState => {
      return {
        ...prevState,
        selectedGroupName: {
          title: value
        }
      };
    });
  };

  const setGroup = id => {
    // here

    console.log("settting group", id);

    axios({
      method: "get",
      url: `http://localhost:5000/api/contacts/groups/reference/retrieve/${id}`,
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => {
        try {
          setChipState(data.data);
          setInitChip(data.data);

          console.log(data);
        } catch (err) {
          setgrpState(prevState => {
            return {
              ...prevState,
              selectedGroupName: {
                title: ""
              }
            };
          });
        }
      })
      .catch(e => console.log(e));
  };

  const updateGroups = () => {
    if (highprops.reference_contact) {
      //for removed items
      checkRemovedGroups();
      // for added items
      checkAddedGroups(highprops.reference_contact);
    } else if (highprops.reference_contact === null) {
      // checkAddedGroups();
    }
  };

  const checkRemovedGroups = () => {
    let chips = [];
    let removed = [];

    chipState.map(chip => {
      chips.push(chip.group_name);
    });

    initChip.map((chip, index) => {
      return chips.indexOf(chip.group_name) > -1
        ? ""
        : removed.push(chip.group_name);
    });

    console.log("deleting", chipState);

    deleteGroups(removed);
  };

  const getNewDataDetails = data => {
    console.log("recieving new data details 1902");
    console.log(data);
    checkAddedGroups(data.data.id);
  };

  const checkAddedGroups = (id = highprops.reference_contact) => {
    console.log("adding new group to ", id);

    // let chips = [];
    let init = [];
    let added = [];

    initChip.map(chip => {
      init.push(chip.group_name);
    });

    chipState.map((chip, index) => {
      return init.indexOf(chip) > -1 ? "" : added.push(chip.group_name);
    });

    newGroups(added, id);
  };

  const newGroups = (added, id) => {
    console.log("new groups", added);

    added.map(data => {
      axios({
        method: "post",
        url: "http://localhost:5000/api/contacts/groups/reference",
        data: {
          group_name: data,
          contactid: id,
          past_group: grpState.recentGroupState
            ? grpState.recentGroupState.title
            : ""
        },
        headers: { Authorization: sessionStorage.getItem("token") }
      })
        .then(data => {
          console.log(data);
          return data;
        })
        .catch(e => console.log(e));
    });
  };

  const deleteGroups = removed => {
    removed.map(data => {
      axios({
        method: "delete",
        url: "http://localhost:5000/api/contacts/groups/reference/delete",
        data: {
          group_name: data,
          contactid: highprops.reference_contact
        },
        headers: { Authorization: sessionStorage.getItem("token") }
      })
        .then(data => {
          console.log(data);

          return data;
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  const getGroup = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/contacts/get/groups",
      headers: { Authorization: sessionStorage.getItem("token") }
    })
      .then(data => {
        console.log(grpState);

        let groupContainer = [];

        data.data.map(gdata => {
          groupContainer.push({ title: gdata.group_name });
        });

        setgrpState(prevState => {
          return {
            ...prevState,
            groupList: groupContainer
          };
        });

        console.log(grpState);
      })
      .catch(e => console.log(e));
  };

  const addToGroup = () => {
    let rechip = Object.assign([], chipState);
    rechip.push({ group_name: grpState.selectedGroupName.title });
    setChipState(rechip);
    console.log(chipState);
  };

  const handleDelete = chipToDelete => e => {
    console.log(chipToDelete);

    console.info("You clicked the delete icon.");

    setChipState(rechip =>
      rechip.filter(chip => chip.group_name !== chipToDelete.group_name)
    );
    // here
    deleteGroups([chipToDelete.group_name]);
    // checkRemovedGroups();
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <div  style={{ margin: "20px" }}>
      <div className="group-form-container" style={styles.addToGroup}>
        <Autocomplete
          freeSolo
          id="group-box"
          value={grpState.selectedGroupName}
          options={grpState.groupList}
          getOptionLabel={option => option.title}
          // style={{ width: 300 }}
          onInputChange={grpStateUpdate}
          className={classes.textfields}
          renderInput={params => (
            <TextField
              {...params}
              // onChange={grpStateUpdate}
              label="Add to a group"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <p className="add-group-btn" onClick={addToGroup}>
          +
        </p>

        {/* <button type="submit" style={styles.submitBtn} onClick={updateGroups}>
          Check
        </button> */}
      </div>

      <div className={classes.chip} style={{ width: "400px" }}>
        {chipState
          ? chipState.map(data => {
              return (
                <Chip
                  value={data}
                  style={{ margin: "0 3px 0 0" }}
                  label={data.group_name}
                  // label="Custom delete icon"
                  onDelete={handleDelete(data)}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  textfields: {
    width: "300px",
    margin: "10px"
  },
  chip: {
    margin: "20px"
  }
}));

const styles = {
  // submitBtn: {
  //   width: "50px",
  //   height: "32px",
  //   background: "#2196F3",
  //   color: "white",
  //   border: "none",
  //   marginTop: "25px",
  //   marginBottom: "20px",
  //   borderRadius: "4px",
  //   cursor: "pointer",
  //   height: "43px",
  //   position: "relative",
  //   top: "-7px"
  // },
  addToGroup: {
    width: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"

    // flexDirection: "column"
  }
};
