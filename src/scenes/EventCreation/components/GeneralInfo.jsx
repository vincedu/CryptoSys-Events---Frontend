import React from 'react';
import { Grid, TextField, Chip, Box, Typography, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ChipInput from 'material-ui-chip-input';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';
import _ from 'lodash';

import { TitledPaper } from '@components';
import { TYPES, CATEGORIES, LANGUAGES } from '../lists';

const GeneralInfo = (props) => {
    const useStyles = makeStyles((theme) => ({
        textField: {
            borderRadius: 0,
        },
        button: {
            backgroundColor: `${theme.palette.primary.main} !important`,
            borderRadius: '3px !important',
        },
    }));
    // .MuiOutlinedInput-root
    const classes = useStyles();

    const handleTextChange = (event) => {
        event.persist();
        props.onChange([event.target.name], event.target.value);
    };

    const handleSelect = (event, name) => {
        event.persist();
        let value = '';
        if (event.target.firstChild) {
            value = event.target.firstChild.data;
        }
        props.onChange(name, value);
    };

    const handleLanguageAdd = (addedLanguage) => {
        let value = '';
        if (addedLanguage.firstChild) {
            value = addedLanguage.firstChild.data;
        }
        const languages = props.value.languages.value;
        if (languages.indexOf(value) === -1) languages.push(value);
        props.onChange('languages', languages);
    };

    const handleLanguageDelete = (removedLanguage) => {
        const languages = props.value.languages.value;
        _.remove(languages, (language) => language === removedLanguage);
        props.onChange('languages', languages);
    };

    return (
        <TitledPaper title="General information">
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body1" style={{ width: '80%' }}>
                        Name your event and explain to the prospect why they really need to attend the event. Add
                        information underlining the uniqueness of your event
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        name="name"
                        label="Event name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        className={classes.textField}
                        value={props.value.name.value}
                        error={props.value.name.error}
                        onChange={handleTextChange}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        multiline
                        inputProps={{
                            style: {
                                paddingBottom: 6,
                            },
                        }}
                        rows={9}
                        className={classes.textField}
                        value={props.value.description.value}
                        error={props.value.description.error}
                        onChange={handleTextChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Autocomplete
                        name="type"
                        options={TYPES}
                        getOptionLabel={(option) => option}
                        onChange={(event) => handleSelect(event, 'type')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Type"
                                variant="outlined"
                                margin="normal"
                                required
                                className={classes.textField}
                                error={props.value.type.error}
                            />
                        )}
                    />
                    <Autocomplete
                        name="category"
                        options={CATEGORIES}
                        getOptionLabel={(option) => option}
                        onChange={(event) => handleSelect(event, 'category')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Category"
                                variant="outlined"
                                margin="normal"
                                required
                                className={classes.textField}
                                error={props.value.category.error}
                            />
                        )}
                    />
                    <Autocomplete
                        name="languages"
                        options={LANGUAGES}
                        getOptionLabel={(option) => option}
                        inputValue=""
                        onChange={(event) => handleLanguageAdd(event.target)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Languages"
                                variant="outlined"
                                margin="normal"
                                required
                                className={classes.textField}
                                error={props.value.languages.error}
                            />
                        )}
                    />
                    {_.map(props.value.languages.value, (language, i) => {
                        return (
                            <Chip
                                key={i}
                                value={language}
                                label={language}
                                onDelete={() => {
                                    handleLanguageDelete(language);
                                }}
                            />
                        );
                    })}
                    <ChipInput
                        name="tags"
                        label="#tags"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        newChipKeys={[' ']}
                        required
                        error={props.value.tags.error}
                        onChange={(chips) => {
                            props.onChange('tags', chips);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ImageUploader
                        withIcon
                        singleImage
                        withPreview
                        withLabel={false}
                        buttonText="Choose Image"
                        onChange={(image) => props.onChange('imageFile', image[0])}
                        imgExtension={['.jpg', '.gif', '.png']}
                        maxFileSize={5242880}
                        buttonClassName={classes.button}
                        fileContainerStyle={{
                            boxShadow: 'none',
                            borderRadius: '3px',
                            border: '1px solid #cacaca',
                            marginTop: 16,
                        }}
                    />
                    <Box hidden={!props.value.imageFile.error}>
                        <Typography color="error">*Missing image</Typography>
                    </Box>
                    {/* <ImageUpload cardName='Input Image' imageGallery={galleryImageList} /> */}
                </Grid>
            </Grid>
        </TitledPaper>
    );
};

const propString = PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.bool,
});

const propArray = PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.bool,
});

GeneralInfo.propTypes = {
    onChange: PropTypes.func.isRequired,
    onImageUpload: PropTypes.func.isRequired,
    value: PropTypes.shape({
        name: propString,
        description: propString,
        type: propString,
        category: propString,
        languages: propArray,
        tags: propArray,
        imageFile: PropTypes.shape({
            // eslint-disable-next-line react/forbid-prop-types
            value: PropTypes.object,
            error: PropTypes.bool,
        }),
    }).isRequired,
};

export default GeneralInfo;
