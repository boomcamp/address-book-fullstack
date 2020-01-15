import React, { useState, useEffect } from "react";
import "./SideBar.css";
import ContactForm from "../ContactForm";
import GroupContacts from "../GroupContacts/GroupContacts";

export default function SideBar(highprops) {
  const [state, setState] = useState({
    addContact_tab: false,
    contactGroups_tab: true
  });

  const [dataPass, setDataPass] = useState(null);

  useEffect(() => {
    // console.log(highprops.newdataping);

    if (highprops.contactData) {
      setDataPass(highprops.contactData);
      change("open_add");
    }

    if (highprops.prepareNewData) {
      setDataPass(null);
      change("open_add");
    }
  }, [highprops.contactData, highprops.prepareNewData]);

  const change = control => {
    if (control === "open_groups") {
      setState(prevState => {
        return { addContact_tab: false, contactGroups_tab: true };
      });
      setDataPass(null);
    }
    if (control === "open_add") {
      setState(prevState => {
        return { addContact_tab: true, contactGroups_tab: false };
      });
    }
  };

  const close = () => {
    setState(prevState => {
      return { addContact_tab: false, contactGroups_tab: false };
    });
  };

  return (
    <>
      <div className="header-menu-container">
        <div
          className={
            state.contactGroups_tab
              ? "tabs-container active-tab"
              : "tabs-container"
          }
          onClick={() => {
            change("open_groups");
          }}
        >
          <p> Contact Groups </p>
        </div>
        <div
          className={
            state.addContact_tab
              ? "tabs-container active-tab"
              : "tabs-container"
          }
          onClick={() => {
            change("open_add");
          }}
        >
          <p> Add Contact </p>
        </div>
      </div>

      <div className="tabs-body-container">
        {state.addContact_tab ? (
          <ContactForm contactData={dataPass} />
        ) : (
          <GroupContacts />
        )}
      </div>
    </>
  );
}
