import React, { useState } from "react";
import ContactsTable from "./ContactsTable";
import Header from "./Header";
import { Redirect } from "react-router-dom";
import ContactForm from "./ContactForm";
import GroupForm from "./GroupForm";

export default function MainPage() {
  const [state, setState] = useState({});

  if (!sessionStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  const tranferData = data => {
    setState(data.data);
    console.log(data.data)
  };

  const prepareNewData = () => {
    setState(null);
  };

  return (
    <>
      <Header title="Address Book" />
      {/* <GroupForm /> */}
      <ContactForm
        contactData={state}
        prepareNewData={state === null ? true : false}
      />
      <ContactsTable
        contactTransfer={tranferData}
        prepareNewData={prepareNewData}
      />
    </>
  );
}
