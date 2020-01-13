import React, { useState } from "react";
import ContactsTable from "./ContactsTable";
import Header from "./Header";
import { Redirect } from "react-router-dom";
import ContactForm from "./ContactForm";

export default function MainPage() {
  const [state, setState] = useState({});

  if (!sessionStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  const tranferData = data => {
    setState(data.data);
  };

  const prepareNewData = () => {
    setState(null);
  };

  return (
    <>
      <Header title="Address Book" />
      <ContactForm contactData={state} prepareNewData={state === null ? true:false}/>
      <ContactsTable
        contactTransfer={tranferData}
        prepareNewData={prepareNewData}
      />
    </>
  );
}
