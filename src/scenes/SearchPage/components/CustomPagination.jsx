import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { withStyles } from '@material-ui/core';
import { connectPagination } from 'react-instantsearch-dom';

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
        margin: theme.spacing(0.5),
        border: 'none',
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}))(ToggleButtonGroup);

const CustomPagination = () => {
    const Pagination = connectPagination(({ currentRefinement, refine, createURL, nbPages }) => {
        const pages = [];
        if (currentRefinement - 4 > 0) pages.push(currentRefinement - 4);
        if (currentRefinement - 3 > 0) pages.push(currentRefinement - 3);
        if (currentRefinement - 2 > 0) pages.push(currentRefinement - 2);
        if (currentRefinement - 1 > 0) pages.push(currentRefinement - 1);
        pages.push(currentRefinement);
        if (currentRefinement + 1 < nbPages) pages.push(currentRefinement + 1);
        if (currentRefinement + 2 < nbPages) pages.push(currentRefinement + 2);
        if (currentRefinement + 3 < nbPages) pages.push(currentRefinement + 3);
        if (currentRefinement + 4 < nbPages) pages.push(currentRefinement + 4);
        return (
            <StyledToggleButtonGroup
                value={currentRefinement}
                exclusive
                style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}
            >
                <ToggleButton
                    value={currentRefinement - 1}
                    href={createURL(currentRefinement - 1)}
                    onClick={(event) => {
                        event.preventDefault();
                        refine(currentRefinement - 1);
                    }}
                    disabled={currentRefinement - 1 < 1}
                >
                    {'<'}
                </ToggleButton>
                {pages.map((page) => {
                    if (page < nbPages) {
                        return (
                            <ToggleButton
                                value={page}
                                key={page}
                                href={createURL(page)}
                                onClick={(event) => {
                                    event.preventDefault();
                                    refine(page);
                                }}
                            >
                                {page}
                            </ToggleButton>
                        );
                    }
                    return null;
                })}
                <ToggleButton
                    value={currentRefinement + 1}
                    href={createURL(currentRefinement + 1)}
                    onClick={(event) => {
                        event.preventDefault();
                        refine(currentRefinement + 1);
                    }}
                    disabled={currentRefinement + 1 > nbPages}
                >
                    {'>'}
                </ToggleButton>
            </StyledToggleButtonGroup>
        );
    });

    return <Pagination totalPages={5} />;
};
export default CustomPagination;
