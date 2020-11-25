/* eslint-disable radix */
import React, { useState } from 'react';
import {
    Grid,
    makeStyles,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    Collapse,
    Button,
    Typography,
} from '@material-ui/core';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
    computeGrossPerTemplateOriginal,
    computeGrossPerTemplateResale,
    computeGross,
    computeMaxTickets,
    computeResaleTickets,
    computeTicketsSold,
} from '../computeStats';
import SalesGraph from './SalesGraph';

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

const SalesData = (props) => {
    const { event } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const [openRow, setOpenRow] = useState(false);

    const displayVenue = () => {
        if (event.location.type === 'venue') {
            return event.location.location;
        }
        if (event.location.type === 'tbd') {
            return 'To be announced';
        }
        return event.location.type;
    };

    const displayGross = () => {
        const gross = computeGross(event.ticketsSoldSale);
        return `${gross.toFixed(2)} WAX`;
    };

    const displayGrossPerTemplate = (templateIndex) => {
        const gross =
            computeGrossPerTemplateOriginal(event.ticketsSoldSale.original[templateIndex]) +
            computeGrossPerTemplateResale(event.ticketsSoldSale.resale[templateIndex]);
        return `${gross.toFixed(2)} WAX`;
    };

    const displaySoldTickets = () => {
        const amountTicketsSold = computeTicketsSold(event.ticketsSoldSale);
        const maxTicket = computeMaxTickets(event.ticketsSoldSale);
        return `${amountTicketsSold} / ${maxTicket}`;
    };

    const displaySoldTicketsPerTemplate = (templateIndex) => {
        return `${event.ticketsSoldSale.original[templateIndex].sales.length} / ${
            event.ticketsSoldSale.original[templateIndex].sales.length +
            event.ticketsListedSale.original[templateIndex].sales.length
        }`;
    };

    const displayResoldTicketsPerTemplate = (templateIndex) => {
        return event.ticketsSoldSale.resale.length > 0 ? event.ticketsSoldSale.resale[templateIndex].sales.length : 0;
    };

    const displayResaleTickets = (ticketsSale) => {
        const amountResaleTickets = computeResaleTickets(ticketsSale);
        return `${amountResaleTickets}`;
    };

    const handleModifyEventGeneralClick = (eventId) => {
        history.push(`/modifyEvent/${eventId}/general`);
    };

    const handleModifyEventTicketsClick = (eventId) => {
        history.push(`/modifyEvent/${eventId}/tickets`);
    };

    const handleEventClick = () => {
        setOpenRow(!openRow);
    };

    const classes = useStyles();
    return (
        // eslint-disable-next-line react/jsx-fragments
        <React.Fragment>
            <TableRow
                key={event.name}
                selected={openRow}
                hover
                style={{ cursor: 'pointer' }}
                onClick={handleEventClick}
            >
                <TableCell>
                    <Avatar src={`${event.image}`} className={classes.large} />
                </TableCell>
                <TableCell align="left">{event.name}</TableCell>
                <TableCell align="left">{moment(event.startDate).format('LLLL')}</TableCell>
                <TableCell align="left">{displayVenue()}</TableCell>
                <TableCell align="right">{displaySoldTickets()}</TableCell>
                <TableCell align="right">{displayResaleTickets(event.ticketsListedSale)}</TableCell>
                <TableCell align="right">{displayResaleTickets(event.ticketsSoldSale)}</TableCell>
                <TableCell align="right">{displayGross()}</TableCell>
                <TableCell align="left">{openRow ? <ExpandLess /> : <ExpandMore />}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}> </TableCell>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7} align="right">
                    <Collapse in={openRow} timeout="auto" unmountOnExit>
                        <Typography variant="h6" align="left" style={{ paddingTop: 20 }}>
                            {t('eventsDashboard.eventDetails')}
                        </Typography>
                        <Grid container direction="column" spacing={3} alignItems="center">
                            <Grid item xs={12}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> </TableCell>
                                            <TableCell>{t('eventsDashboard.tableHeader.ticketName')}</TableCell>
                                            <TableCell align="right">
                                                {t('eventsDashboard.tableHeader.soldTickets')}
                                            </TableCell>
                                            <TableCell align="right">
                                                {t('eventsDashboard.tableHeader.listedResale')}
                                            </TableCell>
                                            <TableCell align="right">
                                                {t('eventsDashboard.tableHeader.soldResale')}
                                            </TableCell>
                                            <TableCell align="right">
                                                {t('eventsDashboard.tableHeader.gross')}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {event.ticketsListedSale.original.map((ticketType, i) => (
                                            <TableRow key={ticketType.template.templateId}>
                                                <TableCell component="th" scope="row">
                                                    <Avatar
                                                        src={`https://ipfs.io/ipfs/${ticketType.template.image}`}
                                                        className={classes.large}
                                                    />
                                                </TableCell>
                                                <TableCell>{ticketType.template.name}</TableCell>
                                                <TableCell align="right">{displaySoldTicketsPerTemplate(i)}</TableCell>
                                                <TableCell align="right">
                                                    {event.ticketsListedSale.resale[i].sales.length}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {displayResoldTicketsPerTemplate(i)}
                                                </TableCell>
                                                <TableCell align="right">{displayGrossPerTemplate(i)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Grid>
                            <Grid item>
                                <SalesGraph event={event} />
                            </Grid>
                            <Grid item container spacing={2} justify="flex-end" style={{ paddingBottom: 40 }}>
                                <Grid item>
                                    <Button variant="outlined" onClick={() => handleModifyEventGeneralClick(event.id)}>
                                        {t('manageEvents.moreOptions.modifyGeneral')}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" onClick={() => handleModifyEventTicketsClick(event.id)}>
                                        {t('manageEvents.moreOptions.modifyTickets')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

const ticketSale = PropTypes.shape({
    original: PropTypes.array.isRequired,
    resale: PropTypes.array.isRequired,
}).isRequired;
SalesData.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        ticketsListedSale: ticketSale,
        ticketsSoldSale: ticketSale,
    }).isRequired,
};

export default SalesData;
