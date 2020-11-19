import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { connectRange, connectSortBy } from 'react-instantsearch-dom';
import DateFnsUtils from '@date-io/date-fns';
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
                <TextField {...params} label={t(`searchPage.sortDate`)} variant="outlined" margin="normal" />
            )}
        />
    ));

    const RangeInput = connectRange(({ currentRefinement, refine }) => (
        <div>
            <MuiPickersUtilsProvider {...(t('language') === 'fr' && { locale: frLocale })} utils={DateFnsUtils}>
                <KeyboardDatePicker
                    autoOk
                    variant={window.innerWidth > 600 ? 'static' : 'inline'}
                    disablePast
                    margin="normal"
                    inputVariant="outlined"
                    label={t('searchPage.filterDate')}
                    format="MM/dd/yyyy"
                    style={{ width: '100%' }}
                    value={currentRefinement?.min ? new Date(currentRefinement.min) : new Date()}
                    onChange={(newDate) => {
                        refine({
                            min: +newDate,
                            max: +newDate + 24 * 60 * 60 * 1000,
                        });
                    }}
                    KeyboardButtonProps={{
                        color: 'primary',
                    }}
                />
            </MuiPickersUtilsProvider>
            {currentRefinement.min ? (
                <Chip
                    label={new Date(currentRefinement.min).toUTCString().substring(0, 16)}
                    onDelete={() =>
                        refine({
                            min: 0,
                            max: Number.MAX_VALUE,
                        })
                    }
                    color="primary"
                />
            ) : null}
        </div>
    ));

    const attribute = {};
    if (props.location.state?.date)
        attribute.defaultRefinement = {
            min: +new Date(props.location.state.date),
            max: +new Date(props.location.state?.date) + 24 * 60 * 60 * 1000,
        };
    attribute.attribute = props.attribute;

    return (
        <CustomAccordion className={classes.accordion}>
            <CustomAccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h5" className={classes.title}>
                    {t('searchPage.date')}
                </Typography>
            </CustomAccordionSummary>
            <CustomAccordionDetails style={{ flexDirection: 'column' }}>
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
