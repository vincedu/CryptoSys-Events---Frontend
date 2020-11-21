import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import { PageContainer } from '@components';

const Unauthorized = () => {
    const { t } = useTranslation();

    return (
        <PageContainer title={t('unauthorized.title')}>
            <Grid container justify="center">
                <Grid item>
                    <Typography variant="h5">{t('unauthorized.message')}</Typography>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default Unauthorized;
