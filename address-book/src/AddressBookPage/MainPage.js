import React from "react";
import ContactsTable from "./ContactsTable";
import Header from "./Header";
import { Redirect } from "react-router-dom";

export default function MainPage() {
  if (!sessionStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header title="Address Book" />
      <ContactsTable />
    </>
  );
}
