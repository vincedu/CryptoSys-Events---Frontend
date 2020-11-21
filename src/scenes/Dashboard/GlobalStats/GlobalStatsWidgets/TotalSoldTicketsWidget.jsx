import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles, Typography, Card, CardContent, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 500,
    },
    progress: {
        marginTop: theme.spacing(2),
        height: '8px',
        borderRadius: '10px',
    },
    fullHeightCard: {
        height: '100%',
    },
}));

const TotalSoldTicketsWidget = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { totalSoldTickets, totalTickets } = props;

    const calculateProgress = () => {
        return (totalSoldTickets / totalTickets) * 100;
    };

    return (
        <Card className={classes.fullHeightCard}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom variant="body2">
                    {t('eventsDashboard.totalSoldTickets')}
                </Typography>
                <Typography variant="h3">{totalSoldTickets}</Typography>
                <LinearProgress className={classes.progress} value={calculateProgress()} variant="determinate" />
                <Typography color="textSecondary" variant="body2" align="right">
                    {totalSoldTickets} / {totalTickets}
                </Typography>
            </CardContent>
        </Card>
    );
};

TotalSoldTicketsWidget.propTypes = {
    totalSoldTickets: PropTypes.number.isRequired,
    totalTickets: PropTypes.number.isRequired,
};

export default TotalSoldTicketsWidget;
