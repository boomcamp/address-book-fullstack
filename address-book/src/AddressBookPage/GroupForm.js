import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export default function GroupForm(highprops) {

    const addgroup = () => {
        
    }

  const classes = useStyles();
  return (
    <>
      {/* <div className="group-add-btn-container" style={style.addContainer}>
        <p>+ ADD GROUP</p>
      </div> */}
      <div className="group-add-form-container">
        {/* <form className={classes.root} noValidate autoComplete="on"> */}
          <TextField
            // required
            id="outlined-required"
            label="Group Name"
            defaultValue="Hello World"
            variant="outlined"
            select='true'
          />
          {/* <Button type="submit">Save</Button> */}
        {/* </form> */}
      </div>
      {/* <div className="group-context-container">
        <div style={style.groupContainer}>
          <p>Work Contacts</p>
        </div>
        <div style={style.groupContainer}>
          <p>Home Contacts</p>
        </div>
        <div style={style.groupContainer}>
          <p>Crew Contacts</p>
        </div>
      </div> */}
    </>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const style = {
  groupContainer: {
    border: "1px solid #ececec",
    width: "200px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    margin: "20px",
    background: "#f3f3f3",
    cursor: "pointer"
  },
  addContainer: {
    border: "1px solid #ececec",
    width: "200px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    margin: "20px",
    background: "rgb(20, 34, 115)",
    cursor: "pointer",
    color: "white",
    fontSize: "0.7em"
  }
};
