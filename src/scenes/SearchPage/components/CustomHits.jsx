import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { connectHits } from 'react-instantsearch-dom';
import CustomEventItem from './CustomEventItem';

const CustomHits = () => {
    const { t } = useTranslation();

    const CustomSearchHits = connectHits(({ hits }) => (
        <Grid container spacing={2} justify="flex-start" alignItems="stretch">
            {hits.length ? (
                hits.map((hit) => (
                    <CustomEventItem
                        key={hit.objectID}
                        id={hit.objectID}
                        name={hit.name}
                        description={hit.description}
                        image={hit.image}
                        date={hit.date ? new Date(hit.date).toISOString() : ''}
                        type={hit.type}
                        tags={hit.tags}
                        languages={hit.languages}
                    />
                ))
            ) : (
                <Typography variant="subtitle1">{t('searchPage.noEvent')}</Typography>
            )}
        </Grid>
    ));

    return <CustomSearchHits />;
};
export default CustomHits;
