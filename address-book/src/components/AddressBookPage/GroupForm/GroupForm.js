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
      <div className={classes.grpFormContainer}>
        <Autocomplete
          // freeSolo
          className={classes.textfields}
          id="group-box"
          options={grpState.groupList}
          getOptionLabel={option => option.title}
          onInputChange={grpStateUpdate}
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
        <p className={classes.addbtn} onClick={addToGroup}>
          +
        </p>
      </div>

      <p className={classes.addCaption}>click + button to confirm action</p>

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
    margin: "10px",
    [theme.breakpoints.up("md")]: {
      width: "700px",
      position: "relative",
      right: "20px"
    },
    [theme.breakpoints.down("md")]: {
      width: "700px",
      position: "relative",
      right: "20px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "300px",
      position: "relative",
      right: "20px"
    },
    [theme.breakpoints.down(420)]: {
      width: "200px",
      position: "relative",
      right: "20px"
    }
  },
  addCaption: {
    fontSize: "0.6em",
    color: "#b7b7b7",
    position: "relative",
    top: "-18px",
    left: "-4px",
    [theme.breakpoints.down("md")]: {
      left: "-146px"
    },
    [theme.breakpoints.down("sm")]: {
      left: "-5px"
    }
  },
  chip: {
    width: "428px",
    position: "relative",
    left: "-157px",
    top: "-13px",
    [theme.breakpoints.down("md")]: {
      width: "298px",
      left: "-65px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "298px",
      left: "-65px"
    },
    [theme.breakpoints.down(420)]: {
      width: "200px",
      left: "-14px"
    }
  },
  addbtn: {
    width: "70px",
    color: "rgb(182, 182, 182)",
    border: "none",
    marginTop: "0",
    marginBottom: "0",
    borderRadius: "4px",
    cursor: "pointer",
    height: "50px",
    position: "relative",
    top: "-1px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid rgb(182, 182, 182)",
    marginLeft: "2px",
    "&:hover": {
      color: "#2196f3",
      border: "2px solid #2196f3"
    },
    [theme.breakpoints.up("md")]: {
      right: "24px"
    },
    [theme.breakpoints.down("md")]: {
      width: "70px",
      position: "relative",
      right: "24px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "40px",
      position: "relative",
      right: "24px"
    }
  },
  grpFormContainer: {
    width: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: "150px",
    [theme.breakpoints.down("md")]: {
      width: "500px",
      right: "150px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "400px",
      right: "74px"
    }
  }
}));
