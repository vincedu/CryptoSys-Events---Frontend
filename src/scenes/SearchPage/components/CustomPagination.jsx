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
    const Pagination = connectPagination(({ currentRefinement, refine, createURL, nbPages }) => (
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
            {new Array(5).fill(null).map((_, index) => {
                const page = index + 1;
                if (index < nbPages) {
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
    ));

    return <Pagination totalPages={5} />;
};
export default CustomPagination;
