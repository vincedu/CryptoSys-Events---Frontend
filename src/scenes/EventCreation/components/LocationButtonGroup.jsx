import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const values = {
    venue: 'Venue',
    online: 'Online event',
    tbd: 'To be announced',
};

const LocationButtonGroup = (props) => {
    const handleClick = (button) => {
        props.onChange('locationType', button);
    };

    return (
        <div>
            {Object.keys(values).map((key) => (
                <Button
                    key={key}
                    value={key}
                    variant={key === props.value ? 'contained' : 'outlined'}
                    color="secondary"
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
