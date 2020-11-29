import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { TitledPaper } from '@components';
import Script from 'react-load-script';
import LocationButtonGroup from './LocationButtonGroup';

let autocomplete;

const LocationForm = (props) => {
    const [location, setLocation] = useState(props.value.location.value);
    const [locationType, setLocationType] = useState(props.value.locationType.value);
    const [link, setLink] = useState(props.value.link.value);

    const handleChange = (name, l) => {
        if (name === 'locationType') {
            setLocationType(l);
        } else if (name === 'location') {
            setLocation(l);
        } else if (name === 'link') {
            setLink(l);
        }
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
        <div>
            <Script
                url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDZHQdnlyuo3spiKtfixH818xkohVXExh8&libraries=places"
                onLoad={handleScriptLoad}
            />
            <TitledPaper title={t('createEvent.location.title')}>
                <Typography variant="subtitle1" style={{ paddingBottom: 15 }}>
                    {t('createEvent.location.description')}
                </Typography>
                <Grid container spacing={2} direction="column">
                    <Grid item xs={12} sm={8}>
                        <LocationButtonGroup value={props.value.locationType.value} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={8} hidden={locationType === 'online' || locationType === 'tbd'}>
                        <TextField
                            id="location"
                            placeholder={t('createEvent.location.search')}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            color="primary"
                            InputProps={{ startAdornment: <Search style={{ marginRight: 10 }} /> }}
                            value={locationType === 'venue' ? location : ''}
                            error={props.value.location.error}
                            onChange={(e) => handleChange('location', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} hidden={locationType === 'venue' || locationType === 'tbd'}>
                        <TextField
                            id="online-event-link"
                            placeholder={t('createEvent.location.link')}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            color="primary"
                            value={locationType === 'online' ? link : ''}
                            error={props.value.link.error}
                            onChange={(e) => handleChange('link', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </TitledPaper>
        </div>
    );
};

LocationForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({
        location: PropTypes.shape({
            value: PropTypes.string,
            error: PropTypes.bool,
        }),
        link: PropTypes.shape({
            value: PropTypes.string,
            error: PropTypes.bool,
        }),
        locationType: PropTypes.shape({
            value: PropTypes.string,
            error: PropTypes.bool,
        }),
    }).isRequired,
};

export default LocationForm;
