import React from 'react';
import { PageContainer, TitledPaper } from '@components';
import { Grid } from '@material-ui/core';
import TicketCard from '../../EventCreation/components/TicketCreation/components/TicketCard';
import { DEFAULT_TICKET_IMAGE_IPFS_HASH } from '../../EventCreation/components/TicketCreation/index';

export default function TicketList() {
    const mockTicket = {
        name: 'Electronic music',
        description: 'Lorem ipsum dolor sit amet',
        startDate: new Date(1995, 11, 17),
        endDate: new Date(1995, 12, 17),
        soldQuantity: 10,
        quantity: 20,
        price: 2,
    };

    return (
        <PageContainer title="My Tickets">
            <Grid container spacing={3} direction="column" justify="flex-start">
                <Grid item xs={12}>
                    <TitledPaper title="Tickets">
                        <div>
                            <TicketCard
                                key={mockTicket.name}
                                ticket={mockTicket}
                                defaultTicketImageUrl={`https://ipfs.io/ipfs/${DEFAULT_TICKET_IMAGE_IPFS_HASH}`}
                            />
                        </div>
                    </TitledPaper>
                </Grid>
                <Grid item xs={12}>
                    <TitledPaper title="Past Tickets">
                        <div>no past tickets</div>
                    </TitledPaper>
                </Grid>
            </Grid>
        </PageContainer>
    );
}
