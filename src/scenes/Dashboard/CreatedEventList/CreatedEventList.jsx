/* eslint-disable radix */
import React from 'react';
import {
    makeStyles,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
} from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SalesData from './SalesData';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '16px',
        boxShadow: 'none',
        backgroundColor: 'transparent',
    },
    header: {
        paddingBottom: '16px',
    },
    title: {
        fontStyle: `'Roboto', sans-serif`,
        fontWeight: 900,
        color: '#242424',
        [theme.breakpoints.down('xs')]: {
            fontSize: '2em',
        },
    },
}));

const CreatedEventList = (props) => {
    const { t } = useTranslation();
    const { events } = props;

    const classes = useStyles();
    return (
        <div className={classes.eventListContainer}>
            {events.data ? (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell> </TableCell>
                                <TableCell align="left">{t('eventsDashboard.tableHeader.name')}</TableCell>
                                <TableCell align="left">{t('eventsDashboard.tableHeader.date')}</TableCell>
                                <TableCell align="left">{t('eventsDashboard.tableHeader.location')}</TableCell>
                                <TableCell align="right">{t('eventsDashboard.tableHeader.soldTickets')}</TableCell>
                                <TableCell align="right">{t('eventsDashboard.tableHeader.listedResale')}</TableCell>
                                <TableCell align="right">{t('eventsDashboard.tableHeader.soldResale')}</TableCell>
                                <TableCell align="right">{t('eventsDashboard.tableHeader.gross')}</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.data.ticketsSalesByAccountName.map((event) => (
                                <SalesData key={event.id} event={event} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="h6">{t('searchPage.noEvent')}</Typography>
            )}
        </div>
    );
};

CreatedEventList.propTypes = {
    events: PropTypes.array.isRequired,
};

export default CreatedEventList;
