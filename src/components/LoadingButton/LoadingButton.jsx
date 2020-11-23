import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import RetryActionDialog from './components/RetryActionDialog';

const useStyles = makeStyles({
    progressContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContent: {
        opacity: 0.5,
    },
});

const LoadingButton = (props) => {
    const classes = useStyles();
    const { children, onClick, onCancel, disabled, disableRetryAction, ...buttonProps } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [retry, setRetry] = useState({ callback: undefined });

    const asyncOnClick = async () => {
        if (!isLoading) {
            try {
                setIsLoading(true);
                await onClick();
                setIsLoading(false);
            } catch (error) {
                if (disableRetryAction) {
                    throw error;
                } else {
                    setRetry({ callback: asyncOnClick });
                }
            }
        }
    };

    const handleRetry = async () => {
        if (retry.callback) {
            retry.callback();
            setRetry({ callback: undefined });
        }
    };

    const handleRetryDialogClose = () => {
        setRetry({ callback: undefined });
    };

    return (
        <>
            <Button {...buttonProps} onClick={asyncOnClick} disabled={disabled || isLoading}>
                <div className={isLoading ? classes.loadingContent : undefined}>{children}</div>
                {isLoading ? (
                    <div className={classes.progressContainer}>
                        <CircularProgress size={24} color="inherit" />
                    </div>
                ) : null}
            </Button>
            <RetryActionDialog
                open={retry.callback !== undefined}
                onClose={handleRetryDialogClose}
                onRetry={handleRetry}
                onCancel={onCancel}
            />
        </>
    );
};

LoadingButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    disableRetryAction: PropTypes.bool,
};

LoadingButton.defaultProps = {
    disabled: false,
    disableRetryAction: false,
};

export default LoadingButton;
