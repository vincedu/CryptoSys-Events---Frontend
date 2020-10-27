import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Grid } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';

import { TitledPaper } from '@components';

const DateTime = (props) => {
    const handleChange = (name, value) => {
        props.onChange(name, value);
    };

    return (
        <TitledPaper title="Date & Time">
            <p>Let potential attendees know when your event starts and ends so that they can plan their visit.</p>
            <Grid container>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item container md={8} spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDatePicker
                                required
                                variant="inline"
                                disablePast
                                margin="normal"
                                inputVariant="outlined"
                                label="Start Date"
                                format="MM/dd/yyyy"
                                name="startDate"
                                value={props.value.start}
                                error={props.value.error}
                                onChange={(event) => handleChange('start', event)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                    color: 'primary',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <KeyboardTimePicker
                                required
                                variant="inline"
                                disablePast
                                margin="normal"
                                inputVariant="outlined"
                                label="Start Time"
                                name="startDate"
                                value={props.value.start}
                                error={props.value.error}
                                onChange={(event) => handleChange('start', event)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                    color: 'primary',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <KeyboardDatePicker
                                required
                                variant="inline"
                                disablePast
                                margin="normal"
                                inputVariant="outlined"
                                label="End Date"
                                format="MM/dd/yyyy"
                                name="endDate"
                                value={props.value.end}
                                error={props.value.error}
                                onChange={(event) => handleChange('end', event)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                    color: 'primary',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <KeyboardTimePicker
                                required
                                variant="inline"
                                disablePast
                                margin="normal"
                                inputVariant="outlined"
                                label="End Time"
                                name="endDate"
                                value={props.value.end}
                                error={props.value.error}
                                onChange={(event) => handleChange('end', event)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                    color: 'primary',
                                }}
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
        </TitledPaper>
    );
};

DateTime.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({
        start: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date),
        error: PropTypes.bool,
    }).isRequired,
};

export default DateTime;
