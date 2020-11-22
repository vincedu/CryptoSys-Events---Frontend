import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { EVENT_BY_ID_QUERY } from '@graphql/queries';
import { CenteredCircularProgress, EventInformationForm, LoadingButton } from '@components';
import { MODIFY_EVENT_MUTATION } from '@graphql/mutations';

const useStyles = makeStyles({
    actionButtonContainer: {
        padding: '60px 16px 16px 16px',
    },
});

const EventGeneralModification = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { eventId } = useParams();
    const [isFormModified, setIsFormModified] = useState(false);
    const [generalInfoForm, setGeneralInfoForm] = useState(undefined);
    const [locationForm, setLocationForm] = useState(undefined);
    const [dateForm, setDateForm] = useState(undefined);
    const eventQuery = useQuery(EVENT_BY_ID_QUERY, {
        variables: { id: eventId },
        fetchPolicy: 'network-only',
    });
    const [modifyEvent] = useMutation(MODIFY_EVENT_MUTATION);

    const isValueValid = (value) => {
        return value && (value.length > 0 || value.size);
    };

    const areDatesValid = () => {
        return dateForm.start <= dateForm.end;
    };

    const isLocationValid = () => {
        if (locationForm.locationType.value === 'venue') {
            return locationForm.location.value !== '';
        }
        return true;
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

    const handleGeneralInfoFormChange = (field, value) => {
        setGeneralInfoForm({ ...generalInfoForm, [field]: { value, error: !isValueValid(value) } });
        setIsFormModified(true);
    };

    const handleLocationFormChange = (field, value) => {
        setLocationForm({ ...locationForm, [field]: { value, error: !isValueValid(value) } });
        setIsFormModified(true);
    };

    const handleDateFormChange = (field, value) => {
        let error;
        if (field === 'start') error = value > dateForm.end;
        else error = value < dateForm.start;
        setDateForm({ ...dateForm, [field]: value, error });
        setIsFormModified(true);
    };

    const fillFormWithEventData = (eventData) => {
        setGeneralInfoForm({
            name: {
                value: eventData.name,
                error: false,
            },
            description: {
                value: eventData.description,
                error: false,
            },
            type: {
                value: eventData.type,
                error: false,
            },
            category: {
                value: eventData.category,
                error: false,
            },
            languages: {
                value: eventData.languages,
                error: false,
            },
            tags: {
                value: eventData.tags,
                error: false,
            },
            image: {
                value: eventData.image,
                error: false,
            },
        });

        setLocationForm({
            location: {
                value: eventData.location.location,
                error: false,
            },
            locationType: {
                value: eventData.location.type,
                error: false,
            },
        });

        setDateForm({
            start: new Date(eventData.startDate),
            end: new Date(eventData.endDate),
            error: false,
        });
    };

    const discardChanges = () => {
        fillFormWithEventData(eventQuery.data.eventById);
        setIsFormModified(false);
        props.onExit();
    };

    const updateEventGeneralInfo = async () => {
        if (isFormValid()) {
            const variables = { eventId };
            Object.keys(generalInfoForm).forEach((key) => {
                if (key === 'image' && typeof generalInfoForm[key].value !== 'string') {
                    variables.imageFile = generalInfoForm[key].value;
                } else {
                    variables[key] = generalInfoForm[key].value;
                }
            });
            variables.location = locationForm.location.value;
            variables.locationType = locationForm.locationType.value;
            variables.startDate = dateForm.start;
            variables.endDate = dateForm.end;
            if (variables.locationType !== 'venue') variables.location = null;

            await modifyEvent({ variables: { ...variables } });
            props.onExit();
        }
    };

    if (eventQuery.data && eventQuery.data.eventById && !(generalInfoForm && locationForm && dateForm)) {
        fillFormWithEventData(eventQuery.data.eventById);
    }

    if (generalInfoForm && locationForm && dateForm) {
        return (
            <>
                <EventInformationForm
                    generalInfoForm={generalInfoForm}
                    locationForm={locationForm}
                    dateForm={dateForm}
                    onGeneralInfoFormChange={handleGeneralInfoFormChange}
                    onLocationFormChange={handleLocationFormChange}
                    onDateFormChange={handleDateFormChange}
                />
                <Grid container justify="space-between" className={classes.actionButtonContainer}>
                    <Button variant="outlined" color="primary" onClick={discardChanges}>
                        {t('modifyEvent.cancel')}
                    </Button>
                    <LoadingButton
                        variant="contained"
                        color="primary"
                        onClick={updateEventGeneralInfo}
                        onCancel={props.onExit}
                        disabled={!isFormModified}
                    >
                        {t('modifyEvent.save')}
                    </LoadingButton>
                </Grid>
            </>
        );
    }

    return <CenteredCircularProgress />;
};

EventGeneralModification.propTypes = {
    onExit: PropTypes.func.isRequired,
};

export default EventGeneralModification;
