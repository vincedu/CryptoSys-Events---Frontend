import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ChipInput from 'material-ui-chip-input';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';

import { TitledPaper } from '@components';

const GeneralInfo = (props) => {
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

    const handleChipsChange = (chips, name) => {
        props.onChange(name, chips);
    };

    return (
        <div style={{ padding: 20 }}>
            <TitledPaper title="General information">
                <p>
                    Name your event and explain to the prospect why they really need to attend the event. Add
                    information underlining the uniqueness of your event
                </p>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="name"
                            label="Event name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
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
                            rows={9}
                            value={props.value.description.value}
                            error={props.value.description.error}
                            onChange={handleTextChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Autocomplete
                            name="type"
                            options={['1', '2', '3']}
                            getOptionLabel={(option) => option}
                            inputValue={props.value.type.value || ''}
                            onChange={(event) => handleSelect(event, 'type')}
                            renderInput={(params) => (
                                <TextField {...params} label="Type" variant="outlined" margin="normal" required />
                            )}
                        />
                        <Autocomplete
                            name="category"
                            options={['1', '2', '3']}
                            getOptionLabel={(option) => option}
                            inputValue={props.value.category.value || ''}
                            onChange={(event) => handleSelect(event, 'category')}
                            renderInput={(params) => (
                                <TextField {...params} label="Category" variant="outlined" margin="normal" required />
                            )}
                        />
                        <ChipInput
                            name="languages"
                            label="Language(s)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            newChipKeys={[' ']}
                            required
                            onChange={(chips) => {
                                handleChipsChange(chips, 'languages');
                            }}
                        />
                        <ChipInput
                            name="tags"
                            label="#tags"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            newChipKeys={[' ']}
                            required
                            onChange={(chips) => {
                                handleChipsChange(chips, 'tags');
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <ImageUploader
                            withIcon
                            singleImage
                            withPreview
                            buttonText="Choose Image"
                            onChange={props.onImageUpload}
                            imgExtension={['.jpg', '.gif', '.png']}
                            maxFileSize={5242880}
                        />
                        {/* <ImageUpload cardName="Input Image" imageGallery={galleryImageList} /> */}
                    </Grid>
                </Grid>
            </TitledPaper>
        </div>
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
    }).isRequired,
};

export default GeneralInfo;
