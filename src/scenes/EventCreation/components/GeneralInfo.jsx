import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ChipInput from 'material-ui-chip-input';
import { TitledPaper } from '@components';
import PropTypes from 'prop-types';

import ImageUpload from './ImageUpload';

const galleryImageList = [
    'https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    'https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg',
    'https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg',
    'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg',
];

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
            <TitledPaper title="Informations générales">
                <p>
                    Nommez votre événement et expliquez aux participants potentiels pourquoi ils doivent absolument
                    venir. Ajoutez des informations soulignant son caractère unique.
                </p>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            name="name"
                            label="Nom de l'événement"
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
                                <TextField {...params} label="Catégorie" variant="outlined" margin="normal" required />
                            )}
                        />
                        <ChipInput
                            name="languages"
                            label="Langue(s)"
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
                            label="#étiquettes"
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
                        <ImageUpload cardName="Input Image" imageGallery={galleryImageList} />
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
