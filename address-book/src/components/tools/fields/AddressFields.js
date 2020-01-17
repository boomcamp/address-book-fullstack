import React from 'react'
import { TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import CountrySelect from './CountrySelect'

export default function AddressFields({cityFn, stateProvinceFn, postalCodeFn, countryFn, city, stateProvince, postalCode, country}) {
    return (
        <fieldset style={{width:`50%`}}>
            <legend>Address: </legend>
            <TextValidator
                style={{ margin: '10px', width:`95%` }}
                label="City"
                onChange={cityFn}
                name="city"
                value={city}
                validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
                errorMessages={['This Field is Required', 'Numbers and special characters are not Valid']}
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
                validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
                errorMessages={['This Field is Required', 'Numbers and special characters are not Valid']}
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

            {/* <TextValidator
                style={{ margin: '10px', width:`95%` }}
                label="Country"
                onChange={countryFn}
                name="country"
                value={country}
                validators={['required', 'matchRegexp:^[A-Za-z ]+$']}
                errorMessages={['This Field is Required', 'Numbers and special characters are not Valid']}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <LocationCityIcon />
                    </InputAdornment>
                    ),
                }}
            ></TextValidator> */}
            <CountrySelect country={country} countryFn={countryFn}/>
        </fieldset>
    )
}
