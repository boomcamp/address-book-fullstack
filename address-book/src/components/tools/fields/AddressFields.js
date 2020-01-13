import React from 'react'
import { TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocationCityIcon from '@material-ui/icons/LocationCity';

export default function AddressFields({cityFn, stateProvinceFn, postalCodeFn, countryFn, city, stateProvince, postalCode, country}) {
    return (
        <fieldset>
            <legend>Address: </legend>
            <TextValidator
                style={{ margin: '10px', width:`95%` }}
                label="City"
                onChange={cityFn}
                name="city"
                value={city}
                validators={['required']}
                errorMessages={['This Field is Required']}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <LocationCityIcon />
                    </InputAdornment>
                    ),
                }}
            ></TextValidator>

            <TextValidator
                style={{ margin: '10px', width:`95%` }}
                label="State/Province"
                onChange={stateProvinceFn}
                name="stateProvince"
                value={stateProvince}
                validators={['required']}
                errorMessages={['This Field is Required']}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <LocationCityIcon />
                    </InputAdornment>
                    ),
                }}
            ></TextValidator>

            <TextValidator
                style={{ margin: '10px', width:`95%` }}
                label="Postal Code"
                onChange={postalCodeFn}
                name="postalCode"
                value={postalCode}
                validators={['required']}
                errorMessages={['This Field is Required']}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <LocationCityIcon />
                    </InputAdornment>
                    ),
                }}
            ></TextValidator>

            <TextValidator
                style={{ margin: '10px', width:`95%` }}
                label="Country"
                onChange={countryFn}
                name="country"
                value={country}
                validators={['required']}
                errorMessages={['This Field is Required']}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <LocationCityIcon />
                    </InputAdornment>
                    ),
                }}
            ></TextValidator>
        </fieldset>
    )
}
