import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
    Checkbox,
    Grid,
    makeStyles,
    Button,
    Typography,
    withStyles,
    AccordionSummary,
    Accordion,
    AccordionDetails,
} from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank, ExpandMore, ExpandLess } from '@material-ui/icons';
import { connectRefinementList } from 'react-instantsearch-dom';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    text: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        display: 'flex',
    },
    title: {
        color: theme.palette.primary.main,
        padding: '10px 0',
        fontWeight: 'bold',
    },
    moreButton: {
        fontSize: 'small',
        padding: '2px 7px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
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
        justifyContent: 'flex-start',
        width: 'fit-content',
        '&$expanded': {
            minHeight: 20,
        },
    },
    content: {
        flex: 0,
        margin: '5px 0',
        '&$expanded': {
            margin: '5px 0 0 0',
        },
    },
    expanded: {},
})(AccordionSummary);

const CustomAccordionDetails = withStyles({
    root: {
        padding: '0 16px 8px',
    },
})(AccordionDetails);

const CustomRefinementList = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const location = useLocation();

    const [showMore, setShowMore] = useState(props.numberItems);
    const handleMore = () => {
        setShowMore(showMore + 5);
    };
    const handleLess = () => {
        setShowMore(props.numberItems);
    };

    const RefinementList = connectRefinementList(({ items, refine, createURL }) => (
        <Grid container direction="column">
            {items.map((item) => {
                return (
                    <Grid item key={item.label} className={classes.item}>
                        <a
                            href={createURL(item.label)}
                            style={{ fontWeight: item.isRefined ? 'bold' : '', fontSize: '0.9em' }}
                            onClick={(event) => {
                                event.preventDefault();
                                refine(item.value);
                            }}
                            className={classes.text}
                        >
                            <Checkbox
                                checked={item.isRefined}
                                color="primary"
                                style={{ padding: 4 }}
                                checkedIcon={<CheckBox style={{ width: '0.7em', height: '0.7em' }} />}
                                icon={<CheckBoxOutlineBlank style={{ width: '0.7em', height: '0.7em' }} />}
                            />
                            {`${t(item.label)} (${item.count})`}
                        </a>
                    </Grid>
                );
            })}
            <Grid item style={{ paddingTop: 15 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleMore}
                    disabled={showMore > items.length}
                    className={classes.moreButton}
                    endIcon={<ExpandMore style={{ width: '0.7em', height: '0.7em', marginLeft: -2 }} />}
                >
                    {`${t('searchPage.more')} ${t(`searchPage.${props.attribute}`)}`}
                </Button>
                {showMore > props.numberItems ? (
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleLess}
                        style={{ fontSize: 'small', padding: '2px', minWidth: 0, marginLeft: 10 }}
                    >
                        <ExpandLess style={{ width: '0.7em', height: '0.7em', marginLeft: -2 }} />
                    </Button>
                ) : null}
            </Grid>
        </Grid>
    ));

    const attribute = {};
    if (location.state?.category && props.attribute === 'category')
        attribute.defaultRefinement = [location.state.category];
    if (location.state?.tag && props.attribute === 'tags') attribute.defaultRefinement = [location.state.tag];
    attribute.attribute = props.attribute;
    attribute.limit = showMore;

    return (
        <CustomAccordion defaultExpanded={window.innerWidth > 600 || attribute.defaultRefinement}>
            <CustomAccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h5" className={classes.title}>
                    {t(`searchPage.${props.attribute}`)}
                </Typography>
            </CustomAccordionSummary>
            <CustomAccordionDetails style={{ flexDirection: 'column' }}>
                <RefinementList {...attribute} />
            </CustomAccordionDetails>
        </CustomAccordion>
    );
};

CustomRefinementList.propTypes = {
    attribute: PropTypes.string.isRequired,
    numberItems: PropTypes.number,
};

CustomRefinementList.defaultProps = {
    numberItems: 5,
};

export default CustomRefinementList;
