import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';

const values = {
    venue: 'Venue',
    online: 'Online event',
    tbd: 'To be announced',
};

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
    const handleClick = (button) => {
        props.onChange('locationType', button);
    };

    return (
        <div>
            {Object.keys(values).map((key) => (
                <Button
                    key={key}
                    value={key}
                    variant={key === props.value ? 'outlined' : 'text'}
                    className={`${classes.button} ${key === props.value ? classes.selected : classes.notSelected}`}
                    color="primary"
                    onClick={() => handleClick(key)}
                >
                    {values[key]}
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
