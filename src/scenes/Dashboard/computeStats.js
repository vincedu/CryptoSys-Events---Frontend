/* eslint-disable radix */

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
        totalSoldTickets += computeTicketsSold(event.ticketsListedSale);
    });
    return totalSoldTickets;
};

const computeTotalResaleTickets = (events) => {
    let totalResaleTickets = 0;
    events.forEach((event) => {
        totalResaleTickets += computeResaleTickets(event.ticketsListedSale);
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
