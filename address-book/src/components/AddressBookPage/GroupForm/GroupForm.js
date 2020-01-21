import React, { useState, Fragment, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Chip } from "@material-ui/core";
import "./groupForm.css";

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
      // console.log("new group create");
    }

    if (highprops.newContactData) {
      getNewDataDetails(highprops.newContactData);
    }
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

  const getNewDataDetails = data => {
    checkAddedGroups(data.data.id);
  };

  const checkAddedGroups = (id = highprops.reference_contact) => {
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
      })
      .catch(e => console.log(e));
  };

  const addToGroup = () => {
    let rechip = Object.assign([], chipState);
    if (
      grpState.selectedGroupName.title !== " " ||
      grpState.selectedGroupName.title !== ""
    ) {
      rechip.push({ group_name: grpState.selectedGroupName.title });
    }

    setgrpState(prevState => {
      return { ...prevState, selectedGroupName: { title: "" } };
    });

    setChipState(rechip);
  };

  const handleDelete = chipToDelete => e => {
    setChipState(rechip =>
      rechip.filter(chip => chip.group_name !== chipToDelete.group_name)
    );
    deleteGroups([chipToDelete.group_name]);
  };

  return (
    <div>
      <div className="group-form-container">
        <Autocomplete
          // freeSolo
          id="group-box"
          options={grpState.groupList}
          getOptionLabel={option => option.title}
          onInputChange={grpStateUpdate}
          className={classes.textfields}
          value={grpState.selectedGroupName}
          renderInput={params => (
            <TextField
              {...params}
              label="Add to a group"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <p className="add-group-btn" onClick={addToGroup}>
          +
        </p>
      </div>

      <p
        style={{
          fontSize: "0.6em",
          color: "#b7b7b7",
          position: "relative",
          top: "-18px",
          left: "-56px"
        }}
      >
        click + button to confirm action
      </p>

      <div className={classes.chip}>
        {chipState
          ? chipState.map(data => {
              return (
                <Chip
                  value={data}
                  style={{
                    margin: "0 3px 0 0",
                    background: "#03A9F4",
                    color: "white",
                    borderColor: "#58b2fb"
                  }}
                  label={data.group_name}
                  onDelete={handleDelete(data)}
                  variant="outlined"
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  textfields: {
    width: "2000px",
    margin: "10px"
  },
  chip: {
    width: "353px",
    position: "relative",
    left: "-68px",
    top: "-13px"
  }
}));
