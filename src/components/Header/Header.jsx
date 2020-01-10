import React from "react";
import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";

function Header() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#1d1d23',
      },
      secondary: {
        main: '#c0301b',
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}/>
          {/* <Button color="inherit">Logout</Button> */}
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  );
}
export default Header;
