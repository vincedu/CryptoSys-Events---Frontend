import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    InputAdornment,
    makeStyles,
    TextField,
    useMediaQuery,
    useTheme,
    Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider, DatePicker } from '@material-ui/pickers';
import frLocale from 'date-fns/locale/fr';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { ImageUpload } from '@components';

const DEFAULT_TICKET_FORM = {
    name: {
        value: '',
        error: false,
    },
    description: {
        value: '',
        error: false,
    },
    quantity: {
        value: '',
        error: false,
    },
    price: {
        value: '',
        error: false,
    },
    image: {
        value: undefined,
        error: false,
    },
};

const DEFAULT_TICKET_DATE = {
    start: new Date(),
    end: new Date(),
    error: false,
};

const useStyles = makeStyles((theme) => ({
    createTicketDialogActionsContainer: {
        padding: '16px 24px',
    },
    datePickersContainer: {
        maxWidth: 'none',
    },
    button: {
        backgroundColor: `${theme.palette.primary.main} !important`,
        borderRadius: '3px !important',
    },
    title: {
        padding: '16px 24px 0 24px',
    },
}));

const CreateTicketDialog = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isOpen, onClose, onSubmit } = props;

    const [form, setForm] = useState(DEFAULT_TICKET_FORM);
    const [date, setDate] = useState(DEFAULT_TICKET_DATE);
    const theme = useTheme();
    const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const isValueValid = (value) => {
        return value !== '';
    };

    const areDatesValid = () => {
        return date.start <= date.end;
    };

    const isFormValid = () => {
        let isValid = true;

        Object.values(form).forEach((value) => {
            if (value.error || value.value === '') {
                isValid = false;
            }
        });
        if (!areDatesValid()) {
            isValid = false;
        }
        return isValid;
    };

    const updateFormErrors = () => {
        const updatedForm = {};
        Object.keys(form).forEach((key) => {
            updatedForm[key] = {
                value: form[key].value,
                error: !isValueValid(form[key].value),
            };
        });
        setForm(updatedForm);
        setDate({ ...date, error: !areDatesValid() });
    };

    const mapFormToTicket = () => {
        const ticket = {};
        Object.keys(form).forEach((key) => {
            ticket[key] = form[key].value;
        });
        ticket.startDate = date.start;
        ticket.endDate = date.end;

        return ticket;
    };

    const handleClose = () => {
        setForm(DEFAULT_TICKET_FORM);
        onClose();
    };

    const handleCreateTicket = () => {
        if (isFormValid()) {
            onSubmit(mapFormToTicket());
            handleClose();
        } else {
            updateFormErrors();
        }
    };

    const handleFormChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        const inputType = event.target.type;

        let parsedValue;
        switch (inputType) {
            case 'number':
                if (isValueValid(inputValue)) {
                    parsedValue = inputName === 'price' ? parseFloat(inputValue) : parseInt(inputValue, 10);
                } else {
                    parsedValue = '';
                }
                break;
            default:
                parsedValue = inputValue;
        }

        setForm({
            ...form,
            [inputName]: {
                value: parsedValue,
                error: !isValueValid(inputValue),
            },
        });
    };

    const handleDateChange = (field, value) => {
        let error;
        if (field === 'start') error = value > date.end;
        else error = value < date.start;
        setDate({ ...date, [field]: value, error });
    };

    const handleImageUpload = (image) => {
        setForm({
            ...form,
            image: {
                value: image,
                error: form.image.error,
            },
        });
    };

    return (
        <Dialog onClose={handleClose} open={isOpen} fullScreen={isFullScreen} disableEnforceFocus>
            <Typography variant="h4" className={classes.title}>
                {t('createEvent.tickets.createTicket')}
            </Typography>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ImageUpload value={form.image.value} onChange={handleImageUpload} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label={t('createEvent.tickets.ticketName')}
                            variant="outlined"
                            name="name"
                            value={form.name.value}
                            error={form.name.error}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            multiline
                            rows={4}
                            label={t('createEvent.tickets.ticketDescription')}
                            variant="outlined"
                            name="description"
                            value={form.description.value}
                            error={form.description.error}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label={t('createEvent.tickets.quantity')}
                            variant="outlined"
                            type="number"
                            name="quantity"
                            value={form.quantity.value}
                            error={form.quantity.error}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label={t('createEvent.tickets.unitPrice')}
                            variant="outlined"
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            name="price"
                            value={form.price.value}
                            error={form.price.error}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider
                            {...(t('language') === 'fr' && { locale: frLocale })}
                            dateAdapter={DateFnsUtils}
                        >
                            <Grid container justify="space-evenly">
                                <DatePicker
                                    renderInput={(inputProps) => <TextField variant="outlined" {...inputProps} />}
                                    required
                                    allowSameDateSelection
                                    disablePast
                                    OpenPickerButtonProps={{ color: 'primary', style: { marginRight: 0 } }}
                                    label={t('createEvent.date.startDate')}
                                    value={date.start}
                                    error={date.error}
                                    onChange={(value) => handleDateChange('start', value)}
                                    style={{ width: '100%' }}
                                />
                                <DatePicker
                                    renderInput={(inputProps) => <TextField variant="outlined" {...inputProps} />}
                                    required
                                    allowSameDateSelection
                                    disablePast
                                    OpenPickerButtonProps={{ color: 'primary', style: { marginRight: 0 } }}
                                    label={t('createEvent.date.endDate')}
                                    value={date.end}
                                    error={date.error}
                                    onChange={(value) => handleDateChange('end', value)}
                                    style={{ width: '100%' }}
                                />
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.createTicketDialogActionsContainer}>
                <Grid container justify="space-between" spacing={3}>
                    <Grid item sm={3} xs={12}>
                        <Button fullWidth variant="outlined" color="primary" onClick={handleClose}>
                            {t('cancel')}
                        </Button>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            type="submit"
                            style={{ fontWeight: 900 }}
                            onClick={handleCreateTicket}
                        >
                            {t('create')}
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

CreateTicketDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default CreateTicketDialog;
