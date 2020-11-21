import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { LocalizationProvider, DateRangePicker, DateRangeDelimiter } from '@material-ui/pickers';
import { connectRange, connectSortBy } from 'react-instantsearch-dom';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import frLocale from 'date-fns/locale/fr';
import { withRouter } from 'react-router-dom';
import {
    Chip,
    Typography,
    makeStyles,
    TextField,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    withStyles,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ArrowDropDown, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.primary.main,
        padding: '10px 0',
        fontWeight: 'bold',
    },
    accordion: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
}));

const CustomAccordion = withStyles({
    root: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(Accordion);

const CustomAccordionSummary = withStyles({
    root: {
        minHeight: 20,
        padding: 0,
        '&$expanded': {
            minHeight: 20,
        },
    },
    content: {
        margin: '5px 0',
        '&$expanded': {
            margin: '5px 0 0 0',
        },
    },
    expanded: {},
})(AccordionSummary);

const CustomAccordionDetails = withStyles({
    root: {
        padding: 0,
    },
})(AccordionDetails);

const CustomDate = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    CustomDate.propTypes = {
        attribute: PropTypes.string.isRequired,
        location: PropTypes.object.isRequired,
    };

    const SortBy = connectSortBy(({ items, refine, createURL }) => (
        <Autocomplete
            options={items}
            getOptionLabel={(option) => (option.label ? t(`searchPage.${option.label}`) : t(option.label))}
            getOptionSelected={(option, value) => option.label === value.label}
            onChange={(_, sort) => {
                refine(sort?.value ? sort.value : 'events');
                createURL(sort?.value ? sort.value : 'events');
            }}
            popupIcon={<ArrowDropDown color="primary" />}
            renderInput={(params) => (
                <TextField {...params} label={t(`searchPage.sortDate`)} variant="outlined" margin="dense" />
            )}
        />
    ));

    const RangeInput = connectRange(({ currentRefinement, refine }) => {
        const handleDateChange = (date) => {
            console.log(date);
            refine({
                ...(date[0] && { min: +date[0] }),
                ...(date[1] && { max: date[1] === date[0] ? +date[0] + 24 * 60 * 60 * 1000 : +date[1] }),
            });
        };

        const handleDelete = (chipLabel) => {
            if (chipLabel === 'max') refine({ ...(currentRefinement.min && { min: currentRefinement.min }) });
            if (chipLabel === 'min') refine({ ...(currentRefinement.max && { max: currentRefinement.max }) });
        };
        return (
            <>
                <LocalizationProvider {...(t('language') === 'fr' && { locale: frLocale })} dateAdapter={DateFnsUtils}>
                    <DateRangePicker
                        disablePast
                        startText={t('searchPage.from')}
                        endText={t('searchPage.to')}
                        calendars={1}
                        value={[currentRefinement.min, currentRefinement.max]}
                        onChange={(date) => handleDateChange(date)}
                        renderInput={(start, end) => {
                            const endProps = { ...end };
                            endProps.error = false;
                            endProps.helperText = '';
                            const startProps = { ...start };
                            startProps.error = false;
                            startProps.helperText = '';
                            return (
                                <div style={{ width: '100%' }}>
                                    <TextField
                                        {...startProps}
                                        variant="outlined"
                                        style={{ marginBottom: 12, width: '100%' }}
                                        margin="dense"
                                    />
                                    <DateRangeDelimiter />
                                    <TextField
                                        {...endProps}
                                        variant="outlined"
                                        style={{ width: '100%' }}
                                        margin="dense"
                                    />
                                </div>
                            );
                        }}
                    />
                </LocalizationProvider>
                {currentRefinement.min ? (
                    <Chip
                        style={{ fontSize: '0.8em', height: 28, margin: 5, width: 'fit-content' }}
                        onDelete={() => handleDelete('min')}
                        label={`${t('searchPage.from')} ${new Date(currentRefinement.min).toString().substr(0, 10)}`}
                        color="primary"
                    />
                ) : null}
                {currentRefinement.max ? (
                    <Chip
                        style={{ fontSize: '0.8em', height: 28, margin: 5, width: 'fit-content' }}
                        onDelete={() => handleDelete('max')}
                        label={`${t('searchPage.to')} ${new Date(currentRefinement.max).toString().substr(0, 10)}`}
                        color="primary"
                    />
                ) : null}
            </>
        );
    });

    const attribute = {};
    if (props.location.state?.date)
        attribute.defaultRefinement = {
            min: +props.location.state.date.min,
            max: +props.location.state.date.max,
        };
    attribute.attribute = props.attribute;

    return (
        <CustomAccordion defaultExpanded={window.innerWidth > 600 || attribute.defaultRefinement}>
            <CustomAccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h5" className={classes.title}>
                    {t('searchPage.date')}
                </Typography>
            </CustomAccordionSummary>
            <CustomAccordionDetails style={{ flexDirection: 'column', padding: '0 15px' }}>
                <RangeInput {...attribute} />
                <SortBy
                    defaultRefinement="events"
                    items={[
                        { value: 'events', label: 'featured' },
                        { value: 'events_asc', label: 'asc' },
                        { value: 'events_desc', label: 'desc' },
                    ]}
                />
            </CustomAccordionDetails>
        </CustomAccordion>
    );
};
export default withRouter(CustomDate);
