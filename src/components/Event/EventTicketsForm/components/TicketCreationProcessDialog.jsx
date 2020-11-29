import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    makeStyles,
    Step,
    StepLabel,
    Stepper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NFTContext } from '@providers';
import { DEFAULT_TICKET_IMAGE_IPFS_HASH } from '@constants';
import { useMutation } from '@apollo/client';
import { LINK_NFT_TEMPLATES_TO_EVENT_MUTATION, PIN_TICKET_IMAGE_TO_IPFS_MUTATION } from '@graphql/mutations';

const useStyles = makeStyles({
    dialogActionsContainer: {
        padding: '16px 24px',
    },
    title: {
        padding: '16px 24px 0 24px',
        textAlign: 'center',
    },
});

const TicketCreationProcessDialog = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isOpen, onClose, onFinish, onCancel, ticket, eventId } = props;
    const theme = useTheme();
    const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [activeStep, setActiveStep] = useState(0);
    const [ticketTemplates, setTicketTemplates] = useState(undefined);
    const [assetsForSale, setAssetsForSale] = useState(undefined);

    const [pinTicketImageMutation] = useMutation(PIN_TICKET_IMAGE_TO_IPFS_MUTATION);
    const [linkNftTemplatesToEvent] = useMutation(LINK_NFT_TEMPLATES_TO_EVENT_MUTATION);

    const { createTicketTemplates, mintTickets, sellTickets } = useContext(NFTContext);

    const handleCreateTicketTypes = async () => {
        try {
            let ticketImageIpfsHash = DEFAULT_TICKET_IMAGE_IPFS_HASH;
            if (ticket.image) {
                const pinTicketImageResult = await pinTicketImageMutation({
                    variables: { file: ticket.image, ticketName: ticket.name, eventName: eventId },
                });
                ticketImageIpfsHash = pinTicketImageResult.data.pinTicketImageToIpfs.ipfsHash;
            }

            const ticketNFTs = [
                {
                    ticketData: {
                        name: ticket.name,
                        description: ticket.description,
                        eventId,
                        image: ticketImageIpfsHash,
                    },
                    maxSupply: ticket.quantity,
                    price: ticket.price,
                },
            ];

            const ticketTemplatesData = await createTicketTemplates(ticketNFTs);
            setTicketTemplates(ticketTemplatesData);

            setActiveStep(1);
        } catch (error) {
            onCancel();
        }
    };

    const handleMintTickets = async () => {
        try {
            if (ticketTemplates) {
                setAssetsForSale(await mintTickets(ticketTemplates));
                const templateIds = ticketTemplates.map((ticketTemplate) => ticketTemplate.templateId.toString());
                if (templateIds.length > 0) {
                    await linkNftTemplatesToEvent({ variables: { eventId, templateIds } });
                }
                setActiveStep(2);
            }
        } catch (error) {
            onCancel();
        }
    };

    const handleSellTickets = async () => {
        try {
            if (assetsForSale) {
                await sellTickets(assetsForSale);
                onFinish();
            }
        } catch (error) {
            onCancel();
        }
    };

    const getActionButtonLabel = () => {
        switch (activeStep) {
            case 0:
                return t('createEvent.tickets.ticketCreationProcessDialog.createTicketType');
            default:
            case 1:
                return t('createEvent.tickets.ticketCreationProcessDialog.mintTickets');
            case 2:
                return t('createEvent.tickets.ticketCreationProcessDialog.putUpForSale');
        }
    };

    const getActionButtonOnClick = () => {
        switch (activeStep) {
            case 0:
                return handleCreateTicketTypes;
            default:
            case 1:
                return handleMintTickets;
            case 2:
                return handleSellTickets;
        }
    };

    return (
        <Dialog onClose={onClose} open={isOpen} fullScreen={isFullScreen} disableBackdropClick disableEscapeKeyDown>
            <Typography variant="h4" className={classes.title}>
                {t('createEvent.tickets.ticketCreationProcessDialog.title')}
            </Typography>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            <Step key={0}>
                                <StepLabel>
                                    {t('createEvent.tickets.ticketCreationProcessDialog.createTicketType')}
                                </StepLabel>
                            </Step>
                            <Step key={1}>
                                <StepLabel>
                                    {t('createEvent.tickets.ticketCreationProcessDialog.mintTickets')}
                                </StepLabel>
                            </Step>
                            <Step key={2}>
                                <StepLabel>
                                    {t('createEvent.tickets.ticketCreationProcessDialog.putUpForSale')}
                                </StepLabel>
                            </Step>
                        </Stepper>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogActionsContainer}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            type="submit"
                            onClick={getActionButtonOnClick()}
                        >
                            {getActionButtonLabel()}
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

TicketCreationProcessDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    ticket: PropTypes.object.isRequired,
    eventId: PropTypes.string.isRequired,
};

export default TicketCreationProcessDialog;
