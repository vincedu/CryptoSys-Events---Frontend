/* eslint-disable radix */
import React, { useState } from 'react';
import {
    CircularProgress,
    makeStyles,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    IconButton,
    MenuItem,
    Menu,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { TICKETS_SALES_BY_ACCOUNT_NAME_QUERY } from '@graphql/queries';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useTranslation } from 'react-i18next';

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

const CreatedEventList = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const displayVenue = (location) => {
        if (location.type === 'venue') {
            return location.location;
        }
        if (location.type === 'tbd') {
            return 'To be announced';
        }
        return location.type;
    };

    const computeGross = (tickets) => {
        let totalGross = 0;
        tickets.original.forEach((ticketType) => {
            const totalTicketsSold = parseInt(ticketType.sales.length);
            if (ticketType.sales.length > 0) {
                const price = parseInt(ticketType.sales[0].price.amount);
                totalGross += totalTicketsSold * price;
            }
        });

        tickets.resale.forEach((ticketType) => {
            const totalTicketsSold = parseInt(ticketType.sales.length);
            if (ticketType.sales.length > 0) {
                ticketType.sales.forEach((sale) => {
                    const price = parseInt(sale.price.amount);
                    totalGross += totalTicketsSold * price * 0.03; // Taux redonner au propriétaire de la collection (Decider lors de la creation de la collection)
                });
            }
        });
        return totalGross;
    };

    const displayGross = (tickets) => {
        const gross = computeGross(tickets);
        return `${gross} WAX`;
    };

    const computeMaxTickets = (tickets) => {
        let totalTickets = 0;
        tickets.original.forEach((ticketType) => {
            totalTickets += parseInt(ticketType.template.maxSupply);
        });
        return totalTickets;
    };

    const computeResaleTickets = (tickets) => {
        let totalTicketsInResale = 0;
        tickets.resale.forEach((ticketType) => {
            totalTicketsInResale += parseInt(ticketType.sales.length);
        });
        return totalTicketsInResale;
    };

    const computeTicketsSold = (tickets) => {
        let totalTicketsInSale = 0;
        tickets.original.forEach((ticketType) => {
            totalTicketsInSale += parseInt(ticketType.sales.length);
        });
        const maxTickets = computeMaxTickets(tickets);
        return maxTickets - totalTicketsInSale;
    };

    const displaySoldTickets = (tickets) => {
        const amountTicketsSold = computeTicketsSold(tickets);
        const maxTicket = computeMaxTickets(tickets);
        return `${amountTicketsSold} / ${maxTicket}`;
    };

    const displayResaleTickets = (tickets) => {
        console.log(tickets);
        const amountResaleTickets = computeResaleTickets(tickets);
        return `${amountResaleTickets}`;
    };

    const handleModifyEventGeneralClick = (eventId) => {
        history.push(`/modifyEvent/${eventId}/general`);
    };

    const handleModifyEventTicketsClick = (eventId) => {
        history.push(`/modifyEvent/${eventId}/tickets`);
    };

    const events = useQuery(TICKETS_SALES_BY_ACCOUNT_NAME_QUERY, {
        variables: { createdBy: 'TODO enlever le param' },
        fetchPolicy: 'network-only',
    });

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();
    return (
        <div className={classes.eventListContainer}>
            {events.loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell> </TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Location</TableCell>
                                <TableCell align="left">Sold Tickets</TableCell>
                                <TableCell align="left">Listed Resale Tickets</TableCell>
                                <TableCell align="left">Sold Resale Tickets</TableCell>
                                <TableCell align="left">Gross</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.data.ticketsSalesByAccountName.map((event) => (
                                <TableRow key={event.name}>
                                    <TableCell>
                                        <Avatar src={`${event.image}`} className={classes.large} />
                                    </TableCell>
                                    <TableCell align="left">{event.name}</TableCell>
                                    <TableCell align="left">{moment(event.startDate).format('LLLL')}</TableCell>
                                    <TableCell align="left">{displayVenue(event.location)}</TableCell>
                                    <TableCell align="left">{displaySoldTickets(event.ticketsListedSale)}</TableCell>
                                    <TableCell align="left">{displayResaleTickets(event.ticketsListedSale)}</TableCell>
                                    <TableCell align="left">{displayResaleTickets(event.ticketsSoldSale)}</TableCell>
                                    <TableCell align="left">{displayGross(event.ticketsSoldSale)}</TableCell>
                                    <TableCell align="left">
                                        <IconButton
                                            aria-label="Show more"
                                            aria-controls="event-options"
                                            aria-haspopup="true"
                                            onClick={handleMenuOpen}
                                            color="inherit"
                                        >
                                            <MoreIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            id="event-options"
                                            keepMounted
                                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            open={isMenuOpen}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={() => handleModifyEventGeneralClick(event.id)}>
                                                {t('manageEvents.moreOptions.modifyGeneral')}
                                            </MenuItem>
                                            <MenuItem onClick={() => handleModifyEventTicketsClick(event.id)}>
                                                {t('manageEvents.moreOptions.modifyTickets')}
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

CreatedEventList.propTypes = {};
CreatedEventList.defaultProps = {
    title: '',
};

export default CreatedEventList;