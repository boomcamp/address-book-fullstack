import React, {useEffect, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationCityIcon from '@material-ui/icons/LocationCity';

export default function CountrySelect({countryFn, country}) {
    const [state, setstate] = useState([])

    useEffect(() => {
        (async () => {
            const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
            const countries = await response.json();

            setstate(Object.keys(countries).map(key => countries[key].item[0]));
        })();

        return () => {};

    }, [])

    return (
        <Autocomplete
            style={{ padding: `10px 0 0 10px`, width:`94%` }}
            value={country}
            onChange={(event, newValue) => countryFn(newValue) }
            options={state.map(option => option.name)}
            renderInput={params => (
                <TextField 
                    {...params} 
                    value={country}
                    label="Country"
                    fullWidth 
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <React.Fragment>
                                <LocationCityIcon color="inherit" size={20} />
                                {params.InputProps.startAdornment}
                            </React.Fragment>
                        )
                    }}
                />
            )}
        />
    );
}
