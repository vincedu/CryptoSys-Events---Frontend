import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Fab, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';

const ACCEPTED_FILE_EXTENSIONS = ['.jpg', '.gif', '.png', '.gif'];
const MAX_ACCEPTED_FILE_SIZE = 5242880;

const useStyles = (error) =>
    makeStyles((theme) => ({
        container: {
            flexGrow: 1,
            height: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            boxShadow: 'none',
            borderRadius: '3px',
            border: error ? `1px solid ${theme.palette.error.main}` : '1px solid #cacaca',
            margin: '16px 0 8px 0',
            padding: '8px',
            position: 'relative',
        },
        fileInput: {
            display: 'none',
        },
        uploadButton: {},
        removeImageFab: {
            position: 'absolute',
            top: 0,
            right: 0,
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
            boxShadow: 'none',
        },
        imagePreview: {
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }));

const ImageUpload = (props) => {
    const fileInputElement = useRef(undefined);
    const [selectedImage, setSelectedImage] = useState({ file: undefined, dataUrl: undefined });
    const [error, setError] = useState(undefined);
    const classes = useStyles(error || props.error)();
    const { t } = useTranslation();

    const isValidFileExtension = (fileName) => {
        const pattern = `(${ACCEPTED_FILE_EXTENSIONS.join('|').replace(/\./g, '\\.')})$`;
        return new RegExp(pattern, 'i').test(fileName);
    };

    const readFile = async (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                let dataUrl = e.target.result;
                dataUrl = dataUrl.replace(';base64', `;name=${file.name};base64`);
                resolve({ file, dataUrl });
            };

            reader.readAsDataURL(file);
        });
    };

    const triggerFileUpload = () => {
        if (fileInputElement) {
            fileInputElement.current.click();
        }
    };

    const onUploadClick = (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.value = null;
    };

    const handleUpload = async (event) => {
        const file = event.target.files[0];

        if (file) {
            if (!isValidFileExtension(file.name)) {
                setError(t('createEvent.generalInfo.image.invalidTypeError'));
                return;
            }

            if (file.size > MAX_ACCEPTED_FILE_SIZE) {
                setError(t('createEvent.generalInfo.image.fileTooLargeError'));
                return;
            }

            props.onChange(file);
        }
    };

    const resetSelectedImage = () => {
        props.onChange(undefined);
    };

    if (props.value && (!selectedImage || props.value !== selectedImage.file)) {
        readFile(props.value).then((newImage) => {
            setError(undefined);
            setSelectedImage(newImage);
        });
    } else if (!props.value && selectedImage) {
        setSelectedImage(undefined);
    }

    return (
        <div className={classes.container} style={{ border: '' }}>
            <input
                accept="image/*"
                className={classes.fileInput}
                ref={fileInputElement}
                type="file"
                onChange={handleUpload}
                onClick={onUploadClick}
            />
            {selectedImage && selectedImage.file && selectedImage.dataUrl ? (
                <>
                    <Fab className={classes.removeImageFab} size="small" onClick={resetSelectedImage}>
                        <CloseIcon />
                    </Fab>
                    <img src={selectedImage.dataUrl} className={classes.imagePreview} alt="preview" />
                </>
            ) : (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.uploadButton}
                        onClick={triggerFileUpload}
                    >
                        {t('createEvent.generalInfo.image.buttonLabel')}
                    </Button>
                    {error || props.error ? <Typography color="error">{error || props.error}</Typography> : null}
                </>
            )}
        </div>
    );
};

ImageUpload.propTypes = {
    value: PropTypes.object,
    error: PropTypes.string,
    onChange: PropTypes.func,
};

ImageUpload.defaultProps = {
    value: undefined,
    error: undefined,
    onChange: () => {},
};

export default ImageUpload;
