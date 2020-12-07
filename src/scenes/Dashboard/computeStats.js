/* eslint-disable radix */
import { RESALE_COMMISSION } from '@constants/ticket';

const computeGrossPerTemplateOriginal = (template) => {
    let gross = 0;
    const totalTicketsSold = parseInt(template.sales.length);
    if (template.sales.length > 0) {
        const price = parseInt(template.sales[0].price.amount);
        gross += totalTicketsSold * price;
    }
    return gross;
};

const computeGrossPerTemplateResale = (template) => {
    let gross = 0;
    template.sales.forEach((sale) => {
        const price = parseInt(sale.price.amount);
        gross += price * RESALE_COMMISSION; // Taux redonner au propriétaire de la collection (Decider lors de la creation de la collection)
    });
    return gross;
};

const computeGross = (tickets) => {
    let totalGross = 0;
    tickets.original.forEach((ticketType) => {
        totalGross += computeGrossPerTemplateOriginal(ticketType);
    });

    tickets.resale.forEach((ticketType) => {
        if (ticketType.sales.length > 0) {
            totalGross += computeGrossPerTemplateResale(ticketType);
        }
    });
    return totalGross;
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
    return totalTicketsInSale;
};

const computeTotalEvents = (events) => {
    return parseInt(events.length);
};

const computeTotalRevenue = (events) => {
    let totalRevenue = 0;
    events.forEach((event) => {
        totalRevenue += computeGross(event.ticketsSoldSale);
    });
    return totalRevenue;
};

const computeTotalSoldTickets = (events) => {
    let totalSoldTickets = 0;
    events.forEach((event) => {
        totalSoldTickets += computeTicketsSold(event.ticketsSoldSale);
    });
    return totalSoldTickets;
};

const computeTotalResaleTickets = (events) => {
    let totalResaleTickets = 0;
    events.forEach((event) => {
        totalResaleTickets += computeResaleTickets(event.ticketsSoldSale);
    });
    return totalResaleTickets;
};

const computeTotalTickets = (events) => {
    let totalTickets = 0;
    events.forEach((event) => {
        totalTickets += computeMaxTickets(event.ticketsListedSale);
    });
    return totalTickets;
};

export {
    computeGrossPerTemplateOriginal,
    computeGrossPerTemplateResale,
    computeGross,
    computeMaxTickets,
    computeResaleTickets,
    computeTicketsSold,
    computeTotalEvents,
    computeTotalRevenue,
    computeTotalSoldTickets,
    computeTotalResaleTickets,
    computeTotalTickets,
};
