import React from 'react';

import Navbar from './Navbar';
import Profiles from './AddressBookUsers/Profiles';

export default function AddressBook() {
    return (
        <React.Fragment>
            <Navbar />
            <Profiles />
        </React.Fragment>
    );
}