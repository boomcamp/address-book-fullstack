import React from 'react'
import { TextValidator } from 'react-material-ui-form-validator';

export default function AddressFields({cityFn, stateProvinceFn, postalCodeFn, countryFn, city, stateProvince, postalCode, country}) {
    return (
        <fieldset>
        <legend>Address: </legend>
        <TextValidator
            style={{ margin: '10px' }}
            label="City"
            onChange={cityFn}
            name="city"
            value={city}
            validators={['required']}
            errorMessages={['This Field is Required']}
        ></TextValidator>
        <TextValidator
            style={{ margin: '10px' }}
            label="State/Province"
            onChange={stateProvinceFn}
            name="stateProvince"
            value={stateProvince}
            validators={['required']}
            errorMessages={['This Field is Required']}
        ></TextValidator>
        <TextValidator
            style={{ margin: '10px' }}
            label="Postal Code"
            onChange={postalCodeFn}
            name="postalCode"
            value={postalCode}
            validators={['required']}
            errorMessages={['This Field is Required']}
        ></TextValidator>
        <TextValidator
            style={{ margin: '10px' }}
            label="Country"
            onChange={countryFn}
            name="country"
            value={country}
            validators={['required']}
            errorMessages={['This Field is Required']}
        ></TextValidator>
    </fieldset>
    )
}
