import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const values = {
    venue: 'Lieu',
    online: 'Événement en ligne',
    tbd: 'À communiquer',
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
