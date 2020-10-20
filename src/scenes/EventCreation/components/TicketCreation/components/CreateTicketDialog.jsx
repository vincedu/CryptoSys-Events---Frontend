import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputAdornment,
    makeStyles,
    TextField,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
    // startDate: {
    //     value: new Date(),
    //     error: false,
    // },
    // endDate: {
    //     value: new Date(),
    //     error: false,
    // },
};

const DEFAULT_TICKET_DATE = {
    start: new Date(),
    end: new Date(),
    error: false,
};

const useStyles = makeStyles({
    createTicketDialogActionsContainer: {
        padding: '16px 24px',
    },
    datePickersContainer: {
        maxWidth: 'none',
    },
});

const CreateTicketDialog = (props) => {
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

    // const handleStartDateChange = (date) => {
    //     setForm({
    //         ...form,
    //         startDate: {
    //             value: date,
    //             error: form.startDate.error,
    //         },
    //     });
    // };

    // const handleEndDateChange = (date) => {
    //     setForm({
    //         ...form,
    //         endDate: {
    //             value: date,
    //             error: form.endDate.error,
    //         },
    //     });
    // };

    return (
        <Dialog onClose={handleClose} open={isOpen} fullScreen={isFullScreen}>
            <DialogTitle onClose={handleClose}>Create a ticket</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label="Ticket Name"
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
                            label="Ticket Description"
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
                            label="Quantity"
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
                            label="Unit price"
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
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container spacing={3} className={classes.datePickersContainer}>
                                <Grid item xs={6}>
                                    <KeyboardDatePicker
                                        required
                                        margin="normal"
                                        inputVariant="outlined"
                                        label="Start Date"
                                        format="MM/dd/yyyy"
                                        name="startDate"
                                        value={date.start}
                                        error={date.error}
                                        onChange={(value) => handleDateChange('start', value)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <KeyboardTimePicker
                                        required
                                        margin="normal"
                                        inputVariant="outlined"
                                        label="Start Time"
                                        name="startDate"
                                        value={date.start}
                                        error={date.error}
                                        onChange={(value) => handleDateChange('start', value)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} className={classes.datePickersContainer}>
                                <Grid item xs={6}>
                                    <KeyboardDatePicker
                                        required
                                        margin="normal"
                                        inputVariant="outlined"
                                        label="End Date"
                                        format="MM/dd/yyyy"
                                        name="endDate"
                                        value={date.end}
                                        error={date.error}
                                        onChange={(value) => handleDateChange('end', value)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <KeyboardTimePicker
                                        required
                                        margin="normal"
                                        inputVariant="outlined"
                                        label="End Time"
                                        name="endDate"
                                        value={date.end}
                                        error={date.error}
                                        onChange={(value) => handleDateChange('end', value)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.createTicketDialogActionsContainer}>
                <Grid container justify="space-between" spacing={3}>
                    <Grid item sm={3} xs={12}>
                        <Button fullWidth variant="contained" color="default" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            type="submit"
                            onClick={handleCreateTicket}
                        >
                            Create
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
