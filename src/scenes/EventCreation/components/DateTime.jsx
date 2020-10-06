import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Grid } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';

import { TitledPaper } from '@components/TitledPaper';

const DateTime = (props) => {
    const handleChange = (name, value) => {
        props.onChange(name, value);
    };

    return (
        <div style={{ padding: 20 }}>
            <TitledPaper title="Date et heure">
                <p>
                    Indiquez aux participants potentiels quand votre événement commence et se termine pour qu’ils
                    puissent planifier au mieux leur venue.
                </p>
                <Grid container>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <KeyboardDatePicker
                                    required
                                    margin="normal"
                                    inputVariant="outlined"
                                    label="Start Date"
                                    format="MM/dd/yyyy"
                                    name="startDate"
                                    value={props.value.startDate.value}
                                    error={props.value.startDate.error}
                                    onChange={(event) => handleChange('startDate', event)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <KeyboardTimePicker
                                    required
                                    margin="normal"
                                    inputVariant="outlined"
                                    label="Start Time"
                                    name="startDate"
                                    value={props.value.startDate.value}
                                    error={props.value.startDate.error}
                                    onChange={(event) => handleChange('startDate', event)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <KeyboardDatePicker
                                    required
                                    margin="normal"
                                    inputVariant="outlined"
                                    label="End Date"
                                    format="MM/dd/yyyy"
                                    name="endDate"
                                    value={props.value.endDate.value}
                                    error={props.value.endDate.error}
                                    onChange={(event) => handleChange('endDate', event)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <KeyboardTimePicker
                                    required
                                    margin="normal"
                                    inputVariant="outlined"
                                    label="End Time"
                                    name="endDate"
                                    value={props.value.endDate.value}
                                    error={props.value.endDate.error}
                                    onChange={(event) => handleChange('endDate', event)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
            </TitledPaper>
        </div>
    );
};

DateTime.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({
        startDate: PropTypes.shape({
            value: PropTypes.instanceOf(Date),
            error: PropTypes.bool,
        }),
        endDate: PropTypes.shape({
            value: PropTypes.instanceOf(Date),
            error: PropTypes.bool,
        }),
    }).isRequired,
};

export default DateTime;
