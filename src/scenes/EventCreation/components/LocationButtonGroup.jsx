import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const values = ['venue', 'online', 'tbd'];

const useStyles = makeStyles({
    selected: {
        fontWeight: 900,
    },
    button: {
        margin: 5,
    },
});

const LocationButtonGroup = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const handleClick = (button) => {
        props.onChange('locationType', button);
    };

    return (
        <div>
            {values.map((value) => (
                <Button
                    key={value}
                    value={value}
                    variant={value === props.value ? 'outlined' : 'text'}
                    className={`${classes.button} ${value === props.value ? classes.selected : classes.notSelected}`}
                    color="primary"
                    onClick={() => handleClick(value)}
                >
                    {t(value)}
                </Button>
            ))}
        </div>
    );
};

LocationButtonGroup.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default LocationButtonGroup;
