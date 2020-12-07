import React, { useEffect, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

const GoogleAutocomplete = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const loaded = useRef(false);

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZHQdnlyuo3spiKtfixH818xkohVXExh8&libraries=places',
                document.querySelector('head'),
                'google-maps',
            );
        }

        loaded.current = true;
    }

    const fetch = useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
                props.onChange('location', newValue?.description ? newValue.description : '');
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={props.error}
                    label={t('createEvent.location.search')}
                    variant="outlined"
                    fullWidth
                />
            )}
            renderOption={(option) => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
};

GoogleAutocomplete.propTypes = {
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
};

export default GoogleAutocomplete;
