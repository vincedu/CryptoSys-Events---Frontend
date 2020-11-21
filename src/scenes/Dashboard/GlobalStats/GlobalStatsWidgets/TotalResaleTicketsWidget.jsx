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
    },
}));

const TotalResaleTicketsWidget = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { totalResaleTickets } = props;

    return (
        <Card className={classes.fullHeightCard}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom variant="body2">
                    {t('eventsDashboard.totalResaleTickets')}
                </Typography>
                <Typography variant="h3">{totalResaleTickets}</Typography>
            </CardContent>
        </Card>
    );
};

TotalResaleTicketsWidget.propTypes = {
    totalResaleTickets: PropTypes.number.isRequired,
};

export default TotalResaleTicketsWidget;
