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

const TotalRevenueWidget = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { totalRevenue } = props;

    return (
        <Card className={classes.fullHeightCard}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom variant="body2">
                    {t('eventsDashboard.totalRevenue')}
                </Typography>
                <Typography variant="h3">{totalRevenue}</Typography>
                <Typography variant="caption">{t('eventsDashboard.currency')}: WAX</Typography>
            </CardContent>
        </Card>
    );
};

TotalRevenueWidget.propTypes = {
    totalRevenue: PropTypes.number.isRequired,
};

export default TotalRevenueWidget;
