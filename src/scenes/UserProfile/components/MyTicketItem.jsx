import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NFTContext } from '@providers';
import PropTypes from 'prop-types';
import TicketInfoDialog from './TicketInfoDialog';
import ResaleDialog from './ResaleDialog';
import TicketOpeningDialog from './TicketOpeningDialog';

const useStyles = makeStyles({
    ticketCard: {
        margin: '16px 0',
    },
    ticketImage: {
        width: '100%',
        height: '100%',
    },
    ticketName: {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
    },
    ticketDescription: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
    },
    showMoreButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
    },
});

const MyTicketItem = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { sellTicket } = useContext(NFTContext);
    const { name, description, image, templateId, assetId, opened, used } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [infoDialogOpen, setiInfoDialogOpen] = useState(false);
    const [resaleDialogOpen, setResaleDialogOpen] = useState(false);
    const [isTicketOpeningDialogOpen, setIsTicketOpeningDialogOpen] = useState(false);
    const [wasTicketRecentlyOpened, setWasTicketRecentlyOpened] = useState(false);

    const handleInfoDialogOpen = () => {
        setiInfoDialogOpen(true);
        setAnchorEl(null);
    };

    const handleInfoDialogClose = () => {
        setiInfoDialogOpen(false);
    };

    const handleResaleDialogOpen = () => {
        setResaleDialogOpen(true);
        setAnchorEl(null);
    };

    const handleResaleDialogClose = () => {
        setResaleDialogOpen(false);
    };

    const handleTicketOpeningDialogOpen = () => {
        setIsTicketOpeningDialogOpen(true);
        setAnchorEl(null);
    };

    const handleTicketOpeningDialogClose = () => {
        setIsTicketOpeningDialogOpen(false);
    };

    const handleResellTicket = async (price) => {
        await sellTicket(assetId, price);
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'showMore';
    const renderShowMoreMenu = (
        <Menu anchorEl={anchorEl} id={menuId} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleInfoDialogOpen}>{t('ticketList.ticketInfo')}</MenuItem>
            <MenuItem onClick={handleResaleDialogOpen}>{t('ticketList.resellTicket')}</MenuItem>
            {!opened && !wasTicketRecentlyOpened ? (
                <MenuItem onClick={handleTicketOpeningDialogOpen}>{t('ticketList.openTicket')}</MenuItem>
            ) : null}
            <TicketInfoDialog
                open={infoDialogOpen}
                onClose={handleInfoDialogClose}
                name={name}
                description={description}
                image={image}
                templateId={templateId}
                assetId={assetId}
            />
            <ResaleDialog
                isOpen={resaleDialogOpen}
                onSubmit={handleResellTicket}
                onClose={handleResaleDialogClose}
                ticket={{ name, description, image }}
            />
            <TicketOpeningDialog
                isOpen={isTicketOpeningDialogOpen}
                onClose={handleTicketOpeningDialogClose}
                onTicketOpen={() => setWasTicketRecentlyOpened(true)}
                ticket={{ assetId, image, opened, used }}
            />
        </Menu>
    );

    return (
        <Card className={classes.ticketCard}>
            <Grid container>
                <Grid item container xs={4}>
                    <CardMedia className={classes.ticketImage} image={`https://ipfs.io/ipfs/${image}`} />
                </Grid>
                <Grid item container xs={8}>
                    <Grid item md={6} xs={12} className={classes.ticketName}>
                        <Typography variant="h6">{name}</Typography>
                    </Grid>
                    <Grid item container md={6} xs={12}>
                        <Grid item xs={6} className={classes.ticketDescription}>
                            <Typography variant="body2">{description}</Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.showMoreButton}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={menuId}
                                edge="end"
                                aria-haspopup="true"
                                onClick={handleClick}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                            {renderShowMoreMenu}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

MyTicketItem.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    templateId: PropTypes.string.isRequired,
    assetId: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    opened: PropTypes.bool.isRequired,
    used: PropTypes.bool.isRequired,
};

export default MyTicketItem;
