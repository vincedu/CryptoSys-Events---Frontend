import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { TitledPaper } from '@components';
import LocationButtonGroup from './LocationButtonGroup';
import GoogleAutocomplete from './GoogleAutocomplete';

const LocationForm = (props) => {
    const [locationType, setLocationType] = useState(props.value.locationType.value);
    const [link, setLink] = useState(props.value.link.value);

    const handleChange = (name, l) => {
        if (name === 'locationType') {
            setLocationType(l);
        } else if (name === 'link') {
            setLink(l);
        }
        props.onChange(name, l);
    };
    const { t } = useTranslation();
    console.log(props.value.location.value);

    return (
        <TitledPaper title={t('createEvent.location.title')}>
            <Typography variant="subtitle1" style={{ paddingBottom: 15 }}>
                {t('createEvent.location.description')}
            </Typography>
            <Grid container spacing={2} direction="column">
                <Grid item xs={12} sm={8}>
                    <LocationButtonGroup value={props.value.locationType.value} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={8} hidden={locationType === 'online' || locationType === 'tbd'}>
                    <GoogleAutocomplete
                        onChange={handleChange}
                        error={props.value.location.error}
                        value={props.value.location.value}
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
