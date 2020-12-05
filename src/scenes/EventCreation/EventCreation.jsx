import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Grid, Stepper, StepLabel, Step, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { CREATE_EVENT_MUTATION } from '@graphql/mutations';
import { PageContainer, EventInformationForm, EventTicketsForm } from '@components';
import { Confirm } from './components/Confirm';
import { CreationWarningDialog } from './components/CreationWarningDialog';

const DEFAULT_EVENT_FORM = {
    name: {
        value: '',
        error: false,
    },
    description: {
        value: '',
        error: false,
    },
    type: {
        value: '',
        error: false,
    },
    category: {
        value: '',
        error: false,
    },
    languages: {
        value: [],
        error: false,
    },
    tags: {
        value: [],
        error: false,
    },
    image: {
        value: undefined,
        error: false,
    },
};

const DEFAULT_EVENT_LOCATION = {
    location: {
        value: '',
        error: false,
    },
    link: {
        value: '',
        error: false,
    },
    locationType: {
        value: 'venue',
        error: false,
    },
};

const DEFAULT_EVENT_DATE = {
    start: new Date(),
    end: new Date(),
    error: false,
};

const useStyles = makeStyles(() => ({
    stepper: {
        backgroundColor: 'transparent',
    },
    stepButtonContainer: {
        padding: '60px 16px 16px 16px',
    },
    stepButton: {
        padding: 15,
    },
    nextButton: {
        fontWeight: 900,
    },
}));

const variables = {};
const EventCreation = () => {
    const [activeStep, setActiveStep] = useState(0);
    switch (window.location.pathname) {
        case '/createEvent/createTicket':
            if (activeStep !== 2) {
                setActiveStep(2);
            }
            break;
        case '/createEvent/confirm':
            if (activeStep !== 1) {
                setActiveStep(1);
            }
            break;
        case '/createEvent/general':
            if (activeStep !== 0) {
                setActiveStep(0);
            }
            break;
        default:
    }

    const classes = useStyles();
    const [generalInfoForm, setGeneralInfoForm] = useState(DEFAULT_EVENT_FORM);
    const [locationForm, setLocationForm] = useState(DEFAULT_EVENT_LOCATION);
    const [dateForm, setDateForm] = useState(DEFAULT_EVENT_DATE);
    const [tickets, setTickets] = useState([]);
    const [isWarningDialogOpen, setIsWarningDialogOpen] = useState(false);
    const [createdEventId, setCreatedEventId] = useState(undefined);
    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);
    const { t } = useTranslation();

    const PROGRESSION_STEPS = t('createEvent.stepper', { returnObjects: true });

    const isValueValid = (value) => {
        return value && (value.length > 0 || value.size);
    };

    const areDatesValid = () => {
        return dateForm.start <= dateForm.end;
    };

    const isAddressValid = () => {
        if (locationForm.locationType.value === 'venue') {
            return locationForm.location.value !== '';
        }
        return true;
    };

    const isLinkValid = () => {
        if (locationForm.locationType.value === 'online') {
            return locationForm.link.value !== '';
        }
        return true;
    };

    const isLocationValid = () => {
        return isAddressValid() && isLinkValid();
    };

    const history = useHistory();

    const handleBackStep = () => {
        history.goBack();
    };

    const isFormValid = () => {
        let isValid = true;

        Object.keys(generalInfoForm).forEach((key) => {
            if (generalInfoForm[key].error || !isValueValid(generalInfoForm[key].value)) {
                isValid = false;
            }
        });
        if (!isLocationValid()) {
            isValid = false;
        }
        if (!areDatesValid()) {
            isValid = false;
        }
        return isValid;
    };

    const updateFormErrors = () => {
        const updatedForm = {};
        Object.keys(generalInfoForm).forEach((key) => {
            updatedForm[key] = {
                value: generalInfoForm[key].value,
                error: !isValueValid(generalInfoForm[key].value),
            };
        });
        setGeneralInfoForm(updatedForm);
        setLocationForm({
            ...locationForm,
            location: { ...locationForm.location, error: !isAddressValid() },
            link: { ...locationForm.link, error: !isLinkValid() },
        });
        setDateForm({ ...dateForm, error: !areDatesValid() });
    };

    const handleGeneralInfoNextButtonClick = () => {
        if (isFormValid()) {
            Object.entries(generalInfoForm).forEach(([key, value]) => {
                variables[key] = value;
            });
            history.push({ pathname: '/createEvent/confirm' });
        } else {
            updateFormErrors();
        }
    };

    const handleTicketsFinishButtonClick = () => {
        history.push('/userProfile/manageEvents');
    };

    const handleCreateTicket = (ticketData) => {
        setTickets([...tickets, ticketData]);
    };

    const handleGeneralInfoFormChange = (field, value) => {
        setGeneralInfoForm({ ...generalInfoForm, [field]: { value, error: !isValueValid(value) } });
    };

    const handleLocationFormChange = (field, value) => {
        setLocationForm({ ...locationForm, [field]: { value, error: !isValueValid(value) } });
    };

    const handleDateFormChange = (field, value) => {
        let error;
        if (field === 'start') error = value > dateForm.end;
        else error = value < dateForm.start;
        setDateForm({ ...dateForm, [field]: value, error });
    };

    const redirectAfterCreation = () => {
        history.push('/');
    };

    const handleSubmit = async () => {
        let eventId;
        try {
            Object.keys(generalInfoForm).forEach((key) => {
                if (key === 'image') {
                    variables.imageFile = generalInfoForm[key].value;
                } else {
                    variables[key] = generalInfoForm[key].value;
                }
            });
            variables.locationType = locationForm.locationType.value;
            if (variables.locationType === 'venue') {
                variables.location = locationForm.location.value;
            } else if (variables.locationType === 'online') {
                variables.location = locationForm.link.value;
            } else if (variables.locationType === 'tbd') {
                variables.location = null;
            }
            variables.startDate = dateForm.start;
            variables.endDate = dateForm.end;

            const createEventResult = await createEvent({ variables: { ...variables } });
            setCreatedEventId(createEventResult.data.createEvent.id);
            history.push({ pathname: '/createEvent/createTicket' });
        } catch (error) {
            if (eventId) {
                setIsWarningDialogOpen(true);
            } else {
                throw error;
            }
        }
    };

    const handleCloseWarningDialog = () => {
        setIsWarningDialogOpen(false);
        redirectAfterCreation();
    };

    return (
        <PageContainer title={t('createEvent.title')}>
            <Grid item xs={12} sm={10} md={8} style={{ margin: 'auto' }}>
                <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
                    {Object.values(PROGRESSION_STEPS).map((name) => (
                        <Step key={name}>
                            <StepLabel>{name}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Grid>
            <Grid item xs={12} style={{ margin: 'auto' }}>
                <Switch>
                    <Route path="/createEvent/general">
                        <EventInformationForm
                            generalInfoForm={generalInfoForm}
                            locationForm={locationForm}
                            dateForm={dateForm}
                            onGeneralInfoFormChange={handleGeneralInfoFormChange}
                            onLocationFormChange={handleLocationFormChange}
                            onDateFormChange={handleDateFormChange}
                        />
                        <Grid container justify="flex-end" className={classes.stepButtonContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={`${classes.stepButton} ${classes.nextButton}`}
                                onClick={handleGeneralInfoNextButtonClick}
                            >
                                {t('next')}
                            </Button>
                        </Grid>
                    </Route>

                    <Route path="/createEvent/confirm">
                        {isFormValid() ? (
                            <>
                                <Confirm
                                    history={history}
                                    tickets={tickets}
                                    handleSubmit={handleSubmit}
                                    handleCancel={redirectAfterCreation}
                                    handleBackStep={handleBackStep}
                                    variables={variables}
                                    date={dateForm}
                                />
                                <CreationWarningDialog open={isWarningDialogOpen} onClose={handleCloseWarningDialog} />
                            </>
                        ) : (
                            <Redirect to="/createEvent/general" />
                        )}
                    </Route>

                    <Route path="/createEvent/createTicket">
                        {createdEventId ? (
                            <>
                                <EventTicketsForm
                                    tickets={tickets}
                                    onCreateTicket={handleCreateTicket}
                                    eventId={createdEventId}
                                />
                                <Grid container justify="flex-end" className={classes.stepButtonContainer}>
                                    <Button
                                        variant="contained"
                                        className={`${classes.stepButton} ${classes.nextButton}`}
                                        color="primary"
                                        onClick={handleTicketsFinishButtonClick}
                                    >
                                        {t('finish')}
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <Redirect to="/createEvent/general" />
                        )}
                    </Route>
                </Switch>
            </Grid>
        </PageContainer>
    );
};

EventCreation.propTypes = {};

export default EventCreation;
