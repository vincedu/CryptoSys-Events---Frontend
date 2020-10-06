import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ChipInput from 'material-ui-chip-input';
import { TitledPaper } from '@components/TitledPaper';
import ImageUpload from './ImageUpload';

const galleryImageList = [
    'https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    'https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg',
    'https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg',
    'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg',
];

class GeneralInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
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
                                id="name"
                                label="Nom de l'événement"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                color="primary"
                            />
                            <TextField
                                id="description"
                                label="Description"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Autocomplete
                                id="type"
                                options={['1', '2', '3']}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField {...params} label="Type" variant="outlined" margin="normal" />
                                )}
                            />
                            <Autocomplete
                                id="category"
                                options={['1', '2', '3']}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField {...params} label="Catégorie" variant="outlined" margin="normal" />
                                )}
                            />
                            <ChipInput
                                id="language"
                                label="Langue(s)"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                newChipKeys={[' ']}
                                // onChange={(chips) => {handleChange(chips)}}
                            />
                            <ChipInput
                                id="tags"
                                label="#étiquettes"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                newChipKeys={[' ']}
                                // onChange={(chips) => {handleChange(chips)}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <ImageUpload cardName="Input Image" imageGallery={galleryImageList} />
                        </Grid>
                    </Grid>
                </TitledPaper>
            </div>
        );
    }
}

// export default connect(
//   null,
//   {  }
// )(GeneralInfo);
export default GeneralInfo;
