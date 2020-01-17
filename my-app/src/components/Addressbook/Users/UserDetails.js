import React, { useState, useEffect } from 'react';

import { makeStyles, TextField, Grid } from '@material-ui/core';

export default function UserDetails(props) {
	const classes = useStyles();
	const { data } = props;
	return (
		<form className={classes.form} noValidate>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<h2>Details</h2>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						autoComplete="fname"
						name="firstname"
						fullWidth
						id="firstName"
						label="First Name"
						value={Object.keys(data).length !== 0 ? data.firstname : ''}
						InputProps={{
							disableUnderline: true,
							readOnly: true
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						autoComplete="lastname"
						name="lastname"
						fullWidth
						id="lastname"
						label="Last Name"
						value={Object.keys(data).length !== 0 ? data.lastname : ''}
						InputProps={{
							disableUnderline: true,
							readOnly: true
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						autoComplete="username"
						name="username"
						fullWidth
						id="username"
						label="Username"
						value={Object.keys(data).length !== 0 ? data.username : ''}
						InputProps={{
							disableUnderline: true,
							readOnly: true
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						autoComplete="home_phone"
						name="home_phone"
						fullWidth
						id="home_phone"
						label="Home Phone"
						value={'N/A'}
						InputProps={{
							disableUnderline: true,
							readOnly: true
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						autoComplete="mobile_phone"
						name="mobile_phone"
						fullWidth
						id="mobile_phone"
						label="Mobile Phone"
						value={'N/A'}
						InputProps={{
							disableUnderline: true,
							readOnly: true
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						autoComplete="work_phone"
						name="work_phone"
						fullWidth
						id="work_phone"
						label="Work Phone"
						value={'N/A'}
						InputProps={{
							disableUnderline: true,
							readOnly: true
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						autoComplete="email"
						name="email"
						fullWidth
						id="email"
						label="Email"
						value={Object.keys(data).length !== 0 ? data.email : ''}
						InputProps={{
							disableUnderline: true,
							readOnly: true
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						autoComplete="city"
						name="city"
						fullWidth
						id="city"
						label="City"
						value={'N/A'}
						InputProps={{
							disableUnderline: true,
							readOnly: true
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						autoComplete="state_or_province"
						name="state_or_province"
						fullWidth
						id="state_or_province"
						label="State/Provice"
						value={'N/A'}
						InputProps={{
							disableUnderline: true,
							readOnly: true
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						autoComplete="postal_code"
						name="postal_code"
						fullWidth
						id="postal_code"
						label="Postal Code"
						value={'N/A'}
						InputProps={{
							disableUnderline: true,
							readOnly: true
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						autoComplete="country"
						name="country"
						fullWidth
						id="country"
						label="Country"
						value={'N/A'}
						InputProps={{
							disableUnderline: true,
							readOnly: true
						}}
					/>
				</Grid>
			</Grid>
		</form>
	);
}

const useStyles = makeStyles(theme => ({
	form: {
		width: '100%'
	}
}));
