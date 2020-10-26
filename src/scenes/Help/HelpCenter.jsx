import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    img: {
        width: '100%',
        objectFit: 'contain',
    },
    caracteristic: {
        padding: '40px',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            padding: '20px!important',
        },
    },
}));

export default function HelpCenter() {
    const classes = useStyles();

    return (
        <Grid style={{ width: '100%' }} container direction="column" alignItems="center">
            <Grid item xs={12} sm={10} md={9} style={{ padding: '40px' }}>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h3">Help Center</Typography>
                        <hr />
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                        <div className={classes.ticketText}>
                            {/* NFT text */}
                            <Typography variant="h4">Why choose EOS Event?</Typography>
                            <br />
                            <Typography variant="body1">
                                EOS Event is a decentralized ticket sale plateform. With the power of EOS IO&apos;s
                                blockchain, all tickets are unique and cannot be revoke by the seller.
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={10} sm={4} md={6}>
                        <img
                            src="eosHelp.png"
                            alt="eos"
                            className={classes.img}
                            style={{ padding: '50px 30px 10px 0px' }}
                        />
                    </Grid>
                    <Grid item xs={10} sm={5} md={6}>
                        <img src="ticket.png" alt="ticket" className={classes.img} />
                    </Grid>
                    <Grid item xs={12} sm={7} md={6}>
                        <div className={classes.ticketText}>
                            {/* NFT text */}
                            <Typography variant="h4">Non-Fungible Tokens</Typography>
                            <br />
                            <Typography variant="subtitle1">
                                NFT is a special type of cryptographic token which represents something unique. They can
                                represent ownership of digitally scares good such as pieces of art or collectibles EOS
                                Event takes advantage of this by creating NFT for each event&apos;s tickets. That way,
                                you know your ticket is original and cannot be copied or faked.
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={9} md={7} style={{ width: '100%' }}>
                <Grid container direction="row" alignItems="stretch">
                    <Grid item xs={4}>
                        <Grid container className={classes.caracteristic}>
                            <Grid item xs={11}>
                                <img src="safe.png" alt="safe" className={classes.img} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h4">Safe</Typography>
                                <Typography variant="subtitle1">
                                    NFT is safer than traditional ticket systems.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container className={classes.caracteristic}>
                            <Grid item xs={12}>
                                <img src="fast.png" alt="safe" className={classes.img} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h4">Fast</Typography>
                                <Typography variant="body1">EOS.IO is one of the fastest blockchain.</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container className={classes.caracteristic}>
                            <Grid item xs={12}>
                                <img src="eosHelp.png" alt="safe" className={classes.img} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h4">EOS.IO</Typography>
                                <Typography variant="body1">Built on EOS.IO blockchain.</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
