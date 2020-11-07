import React from 'react';
import { Grid, TextField, Chip, Typography, makeStyles } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Autocomplete } from '@material-ui/lab';
import ChipInput from 'material-ui-chip-input';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { TitledPaper, ImageUpload } from '@components';
import { TYPES, CATEGORIES, LANGUAGES } from '../../../lists';

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

    const { t } = useTranslation();
    const classes = useStyles();

    const handleTextChange = (event) => {
        event.persist();
        props.onChange(event.target.name, event.target.value);
    };

    const handleSelectCategory = (inputName, newValue) => {
        props.onChange(inputName, newValue);
    };

    const handleSelectType = (inputName, newValue) => {
        props.onChange(inputName, newValue);
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
        <TitledPaper title={t('createEvent.generalInfo.title')}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                    <Typography variant="body1">{t('createEvent.generalInfo.description')}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="name"
                        label={t('createEvent.generalInfo.eventName')}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        className={classes.textField}
                        value={props.value.name.value}
                        error={props.value.name.error}
                        onChange={handleTextChange}
                    />
                    <Autocomplete
                        name="category"
                        options={CATEGORIES}
                        getOptionLabel={(option) => t(option)}
                        value={props.value.category.value}
                        onChange={(__, newValue) => handleSelectCategory('category', newValue)}
                        popupIcon={<ArrowDropDownIcon color="primary" />}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t('createEvent.generalInfo.category')}
                                variant="outlined"
                                margin="normal"
                                required
                                className={classes.textField}
                                error={props.value.category.error}
                            />
                        )}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        multiline
                        rows={9}
                        rowsMax={10}
                        className={classes.textField}
                        value={props.value.description.value}
                        error={props.value.description.error}
                        onChange={handleTextChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ImageUpload
                        value={props.value.imageFile.value}
                        error={
                            props.value.imageFile.error
                                ? t('createEvent.generalInfo.image.missingImageError')
                                : undefined
                        }
                        onChange={(image) => props.onChange('imageFile', image)}
                    />
                    <Autocomplete
                        name="type"
                        options={TYPES}
                        getOptionLabel={(option) => t(option)}
                        value={props.value.type.value}
                        onChange={(__, newValue) => handleSelectType('type', newValue)}
                        popupIcon={<ArrowDropDownIcon color="primary" />}
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
                        name="languages"
                        options={LANGUAGES}
                        getOptionLabel={(option) => t(option)}
                        inputValue=""
                        onChange={(event) => handleLanguageAdd(event.target)}
                        popupIcon={<ArrowDropDownIcon color="primary" />}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t('createEvent.generalInfo.languages')}
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
                        value={props.value.tags.value}
                        error={props.value.tags.error}
                        onChange={(chips) => {
                            props.onChange('tags', chips);
                        }}
                    />
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
    onImageUpload: PropTypes.object,
    value: PropTypes.shape({
        name: propString,
        description: propString,
        type: propString,
        category: propString,
        languages: propArray,
        tags: propArray,
        imageFile: PropTypes.shape({
            value: PropTypes.object,
            error: PropTypes.bool,
        }),
    }).isRequired,
};
GeneralInfo.defaultProps = {
    onImageUpload: {},
};

export default GeneralInfo;
