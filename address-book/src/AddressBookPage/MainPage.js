import React, { useState } from "react";
import ContactsTable from "./ContactsTable";
import Header from "./Header";
import { Redirect } from "react-router-dom";
import ContactForm from "./ContactForm";
import GroupForm from "./GroupForm";
import SideBar from "./SideBar/SideBar";

export default function MainPage() {
  const [state, setState] = useState(null);
  let ping = 0;

  if (!sessionStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  const tranferData = data => {
    setState(data.data);
    // console.log(data.data)
  };

  const prepareNewData = () => {
    // console.log('call for prepare')
    setState(null);
  };

  return (
    <>
      <Header title="Address Book" />
      <SideBar
        contactData={state}
        prepareNewData={state === null ? true : false}
      />
      {/* <ContactForm
        contactData={state}
        // prepareNewData={state === null ? true : false}
      /> */}
      <ContactsTable
        contactTransfer={tranferData}
        prepareNewData={prepareNewData}
      />
    </>
  );
}
