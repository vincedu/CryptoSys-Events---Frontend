import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { TitledPaper } from '@components';
import Script from 'react-load-script';
import LocationButtonGroup from './LocationButtonGroup';

let autocomplete;

const Location = (props) => {
    const handleChange = (name, l) => {
        props.onChange(name, l);
    };
    const { t } = useTranslation();
    const handlePlaceSelect = () => {
        const addressObject = autocomplete.getPlace();
        if (addressObject) {
            const address = addressObject.formatted_address;
            handleChange('location', address);
        }
    };

    const handleScriptLoad = () => {
        // Declare Options For Autocomplete
        const options = {}; // To disable any eslint 'google not defined' errors

        // Initialize Google Autocomplete
        /* global google */ autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('location'),
            options,
        );

        // Avoid paying for data that you don't need by restricting the set of
        // place fields that are returned to just the address components and formatted
        // address.
        autocomplete.setFields(['address_components', 'formatted_address']);

        // // Fire Event when a suggested name is selected
        autocomplete.addListener('place_changed', handlePlaceSelect);
    };

    return (
        <TitledPaper title={t('createEvent.location.title')}>
            <Typography variant="subtitle1" style={{ paddingBottom: 15 }}>
                {t('createEvent.location.description')}
            </Typography>
            <Grid container spacing={2} direction="column">
                <Grid item xs={8}>
                    <LocationButtonGroup value={props.value.locationType.value} onChange={handleChange} />
                    <Script
                        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDZHQdnlyuo3spiKtfixH818xkohVXExh8&libraries=places"
                        onLoad={handleScriptLoad}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    hidden={props.value.locationType.value === 'online' || props.value.locationType.value === 'tbd'}
                >
                    <TextField
                        id="location"
                        placeholder={t('createEvent.location.search')}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        color="primary"
                        InputProps={{ startAdornment: <Search style={{ marginRight: 10 }} /> }}
                        value={props.value.locationType.value === 'venue' ? props.value.location.value : ''}
                        error={props.value.location.error}
                        onChange={(e) => handleChange('location', e.target.value)}
                    />
                </Grid>
            </Grid>
        </TitledPaper>
    );
};

Location.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({
        location: PropTypes.shape({
            value: PropTypes.string,
            error: PropTypes.bool,
        }),
        locationType: PropTypes.shape({
            value: PropTypes.string,
            error: PropTypes.bool,
        }),
    }).isRequired,
};

export default Location;
