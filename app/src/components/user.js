import React, { Component } from "react";
import { Layout, message, Button, Avatar, Card, Icon } from "antd";
import Contact from "./contactTable";
import Addcontact from "./addcontact";
import Addgroup from "./addgroup";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    "@media (maxWidth: 320px)": {
      display: "flex",
      height: "100vh"
    },
    "@media (maxWidth: 768px)": {
      display: "flex",
      height: "100%"
    }
  },
  logout: {
    marginTop: "10px"
  },
  header: {
    display: "flex",
    backgroundColor: "#607C98",
    color: "#fff",
    justifyContent: "flex-end"
  },
  sider: {
    background: "#fff",
    display: "flex",
    justifyContent: "column",
    "@media (max-width: 920px)": {
      width: "100%"
    }
  },
  cardContainer: {
    height: "100%",
    "@media (max-width: 920px)": {
      width: "100%"
    }
  },
  gridStyle: {
    width: "100%",
    textAlign: "center"
  },
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
    padding: " 15px 24px 24px",
    flexFlow: "row wrap",
    "@media (maxWidth: 780px)": {
      backgroundColor: "red",
      flexDirection: "column"
    }
  },
  table: {
    background: "#fff",
    height: "auto",
    width: "60%",
    padding: 24,
    margin: 0,
    "@media (maxWidth: 768px)": {
      display: "flex"
    }
  }
});

class User extends Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.getItem("username"),
      openModal: false,
      query: "",
      data: []
    };
  }

  handleLogout = key => {
    localStorage.clear();
    this.props.history.push("/");
    message.success({ content: "Successfully Logout", key, duration: 2 });
  };
  callback(key) {
    console.log(key);
  }
  showModal = () => {
    this.setState({
      openModal: true
    });
  };

  search = e => {
    this.setState({
      query: ""
    });
  };
  handleCancel = () => {
    this.setState({ openModal: false });
  };

  handleLoad = e => {
    this.setState({ user: e });
  };

  render() {
    const { Header, Content } = Layout;
    const { Meta } = Card;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header className={classes.header}>
          <Button ghost className={classes.logout} onClick={this.handleLogout}>
            Logout
          </Button>
        </Header>

        <div className={classes.container}>
          <div className={classes.sider}>
            <Layout className={classes.cardContainer}>
              <Card
                cover={
                  <img
                    alt="example"
                    src={
                      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    }
                  />
                }
                actions={[
                  <Icon type="setting" key="setting" />,
                  <Icon type="edit" key="edit" />,
                  <Icon type="ellipsis" key="ellipsis" />
                ]}
              >
                <Meta
                  avatar={<Avatar size="large" icon="user" />}
                  description="Boom Address Book  "
                  title={this.state.username}
                />
              </Card>
              <Card>
                <Card.Grid className={classes.gridStyle}>
                  {" "}
                  <Addcontact load={this.handleLoad} />
                </Card.Grid>
                <Card.Grid className={classes.gridStyle}>
                  {" "}
                  <Addgroup load={this.handleLoad} />
                </Card.Grid>
              </Card>
            </Layout>
          </div>

          <Content className={classes.table}>
            {<Contact user={this.state.handleLoad} />}
          </Content>
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(User);
