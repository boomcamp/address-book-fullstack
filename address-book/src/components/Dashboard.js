import React from 'react'
import TemplateMainPage from './tools/TemplateMainPage'
import AddressBookTable from './Contacts/AddressBookTable'

export default  function Dashboard() {
    return (
        <TemplateMainPage>
            <AddressBookTable />  
        </TemplateMainPage>
    );
}