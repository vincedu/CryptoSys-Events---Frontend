import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

const values = ['venue', 'online', 'tbd'];

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
        margin: theme.spacing(0.5),
        border: 'none',
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}))(ToggleButtonGroup);

const LocationButtonGroup = (props) => {
    const { t } = useTranslation();
    const [location, setLocation] = useState(props.value);

    const handleLocation = (event, newLocation) => {
        if (newLocation !== null) {
            setLocation(newLocation);
            props.onChange('locationType', newLocation);
        }
    };

    return (
        <StyledToggleButtonGroup value={location} exclusive onChange={handleLocation}>
            {values.map((value) => (
                <ToggleButton key={value} value={value}>
                    {t(value)}
                </ToggleButton>
            ))}
        </StyledToggleButtonGroup>
    );
};

LocationButtonGroup.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default LocationButtonGroup;