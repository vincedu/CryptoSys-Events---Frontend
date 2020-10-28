import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { TitledPaper } from '@components';

const DateTime = (props) => {
    const handleChange = (name, value) => {
        props.onChange(name, value);
    };
    const { t } = useTranslation();

    return (
        <TitledPaper title={t('createEvent.date.title')}>
            <Typography variant="subtitle1" style={{ paddingBottom: 15 }}>
                {t('createEvent.date.description')}
            </Typography>
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
                                label={t('createEvent.date.startDate')}
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
                                label={t('createEvent.date.startTime')}
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
                                label={t('createEvent.date.endDate')}
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
                                label={t('createEvent.date.endTime')}
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
