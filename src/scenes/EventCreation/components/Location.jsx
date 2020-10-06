import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@material-ui/core';
import { TitledPaper } from '@components/TitledPaper';
import LocationButtonGroup from './LocationButtonGroup';

const Location = (props) => {
    const handleChange = (name, l) => {
        props.onChange(name, l);
    };

    return (
        <div style={{ padding: 20 }}>
            <TitledPaper title="Endroit">
                <p>
                    Faites découvrir votre événement aux personnes de la région et faites-leur savoir où cela se passe.
                </p>
                <LocationButtonGroup value={props.value.locationType.value} onChange={handleChange} />
                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <TextField
                            id="location"
                            label="Emplacement"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            color="primary"
                            disabled={
                                props.value.locationType.value === 'online' || props.value.locationType.value === 'tbd'
                            }
                            value={props.value.location.value}
                            error={props.value.location.error}
                            onChange={(e) => handleChange('location', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </TitledPaper>
        </div>
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
