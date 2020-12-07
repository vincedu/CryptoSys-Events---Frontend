import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import {
    TimelineOppositeContent,
    TimelineItem,
    Timeline,
    TimelineDot,
    TimelineContent,
    TimelineSeparator,
    TimelineConnector,
} from '@material-ui/lab';
import { PageContainer } from '@components';

const GetStarted = () => {
    const { t } = useTranslation();

    return (
        <PageContainer>
            <Grid container>
                <Grid item xs={9} style={{ padding: 20, textAlign: 'center' }}>
                    <Typography style={{ fontFamily: `'Bebas Neue', sans-serif` }} variant="h1" color="secondary">
                        {t('getStarted.title')}
                    </Typography>
                </Grid>
                <Grid item xs={11} sm={10}>
                    <Timeline style={{ paddingBottom: 40 }}>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography style={{ fontWeight: 900, marginTop: '0.75em' }} variant="h4">
                                    <a
                                        href="https://all-access.wax.io/"
                                        style={{ color: '#9f6e01', textDecoration: 'none' }}
                                    >
                                        {t('getStarted.waxOther')}
                                    </a>
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot style={{ backgroundColor: '#fdc830' }}>
                                    <img src="wax_getstarted.svg" alt="wax" style={{ width: '5em', height: '5em' }} />
                                </TimelineDot>
                                <TimelineConnector style={{ backgroundColor: '#fdc830', width: 6 }} />
                            </TimelineSeparator>
                            <TimelineContent style={{ paddingBottom: 100 }}>
                                <Typography variant="h5" color="primary" style={{ fontWeight: 900 }}>
                                    {t('getStarted.waxTitle')}
                                </Typography>
                                <Typography color="primary" variant="body1">
                                    {t('getStarted.waxDescription1')}
                                    <a
                                        href="https://waxsweden.org/create-testnet-account/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Wax Sweden
                                    </a>
                                </Typography>
                                <Typography color="primary" variant="body1">
                                    {t('getStarted.waxDescription2')}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography style={{ fontWeight: 900, marginTop: '0.75em' }} variant="h4">
                                    <a
                                        href="https://greymass.com/anchor/"
                                        style={{ color: '#3650a2', textDecoration: 'none' }}
                                    >
                                        Anchor
                                    </a>
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot style={{ backgroundColor: '#3650a2' }}>
                                    <img
                                        src="anchor_getstarted.svg"
                                        alt="anchor"
                                        style={{ width: '4em', height: '4em', margin: 10 }}
                                    />
                                </TimelineDot>
                                <TimelineConnector style={{ backgroundColor: '#3650a2', width: 6 }} />
                            </TimelineSeparator>
                            <TimelineContent style={{ paddingBottom: 100 }}>
                                <Typography variant="h5" color="primary" style={{ fontWeight: 900 }}>
                                    {t('getStarted.anchorTitle')}
                                </Typography>
                                <Typography color="primary" variant="body1">
                                    {t('getStarted.anchorDescription1')}
                                    <a href="https://greymass.com/en/anchor/" target="_blank" rel="noopener noreferrer">
                                        Greymass
                                    </a>
                                </Typography>
                                <Typography color="primary" variant="body1">
                                    {t('getStarted.anchorDescription2')}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography
                                    color="primary"
                                    style={{ fontWeight: 900, marginTop: '0.75em' }}
                                    variant="h4"
                                >
                                    Spectacular
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="primary">
                                    <img
                                        src="/spectacular.svg"
                                        alt="spectacular"
                                        style={{ width: '3.5em', height: '3.5em', margin: 15 }}
                                    />
                                </TimelineDot>
                                <TimelineConnector style={{ backgroundColor: '#324856', width: 6 }} />
                            </TimelineSeparator>
                            <TimelineContent style={{ paddingBottom: 100 }}>
                                <Typography variant="h5" color="primary" style={{ fontWeight: 900 }}>
                                    {t('getStarted.spectacularTitle')}
                                </Typography>
                                <Typography color="primary" variant="body1">
                                    {t('getStarted.spectacularDescription')}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent>
                                <Typography
                                    color="secondary"
                                    style={{ fontWeight: 900, marginTop: '0.75em' }}
                                    variant="h4"
                                >
                                    {t('getStarted.connect')}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="secondary">
                                    <img
                                        src="/connect.svg"
                                        alt="connect"
                                        style={{ width: '3.5em', height: '3.5em', margin: 15 }}
                                    />
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="h5" color="primary" style={{ fontWeight: 900 }}>
                                    {t('getStarted.connectTitle')}
                                </Typography>
                                <Typography color="primary" variant="body1">
                                    {t('getStarted.connectDescription')}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

GetStarted.propTypes = {};

export default GetStarted;
