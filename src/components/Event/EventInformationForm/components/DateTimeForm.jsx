import React from 'react';
import PropTypes from 'prop-types';
import { LocalizationProvider, DateTimePicker } from '@material-ui/pickers';
import { Grid, Typography, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { TitledPaper } from '@components';
import frLocale from 'date-fns/locale/fr';

const DateTimeForm = (props) => {
    const handleChange = (name, value) => {
        props.onChange(name, value);
    };
    const { t } = useTranslation();

    return (
        <TitledPaper title={t('createEvent.date.title')}>
            <Typography variant="subtitle1" style={{ paddingBottom: 15 }}>
                {t('createEvent.date.description')}
            </Typography>
            <Grid container spacing={3}>
                <LocalizationProvider {...(t('language') === 'fr' && { locale: frLocale })} dateAdapter={DateFnsUtils}>
                    <Grid item xs={12} sm={5}>
                        <DateTimePicker
                            renderInput={(inputProps) => (
                                <TextField variant="outlined" style={{ width: '100%' }} {...inputProps} />
                            )}
                            required
                            disablePast
                            OpenPickerButtonProps={{ color: 'primary', style: { marginRight: 0 } }}
                            label={t('createEvent.date.startDate')}
                            value={props.value.start}
                            error={props.value.error}
                            onChange={(event) => handleChange('start', event)}
                            style={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <DateTimePicker
                            renderInput={(inputProps) => (
                                <TextField variant="outlined" style={{ width: '100%' }} {...inputProps} />
                            )}
                            required
                            disablePast
                            OpenPickerButtonProps={{ color: 'primary', style: { marginRight: 0 } }}
                            label={t('createEvent.date.endDate')}
                            value={props.value.end}
                            error={props.value.error}
                            onChange={(event) => handleChange('end', event)}
                            style={{ width: '100%' }}
                            minDateTime={props.value.start}
                        />
                    </Grid>
                </LocalizationProvider>
            </Grid>
        </TitledPaper>
    );
};

DateTimeForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({
        start: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date),
        error: PropTypes.bool,
    }).isRequired,
};

export default DateTimeForm;
