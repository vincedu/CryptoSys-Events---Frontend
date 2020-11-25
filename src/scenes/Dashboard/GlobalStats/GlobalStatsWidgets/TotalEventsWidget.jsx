import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles, Typography, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    title: {
        fontWeight: 500,
    },
    fullHeightCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

const TotalEventsWidget = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { totalEvents } = props;

    return (
        <Card className={classes.fullHeightCard}>
            <CardContent style={{ textAlign: 'center' }}>
                <Typography className={classes.title} color="textSecondary" gutterBottom variant="body2">
                    {t('eventsDashboard.totalEvents')}
                </Typography>
                <Typography variant="h3">{totalEvents}</Typography>
            </CardContent>
        </Card>
    );
};

TotalEventsWidget.propTypes = {
    totalEvents: PropTypes.number.isRequired,
};

export default TotalEventsWidget;
