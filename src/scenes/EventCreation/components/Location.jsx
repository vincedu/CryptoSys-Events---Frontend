import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import LocationButtonGroup from './LocationButtonGroup';
import { TitledPaper } from '../../../components/TitledPaper';

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{ padding: 20 }}>
                <TitledPaper title="Endroit">
                    <p>
                        Faites découvrir votre événement aux personnes de la région et faites-leur savoir où cela se
                        passe.
                    </p>
                    <LocationButtonGroup />
                    <Grid container spacing={2}>
                        <Grid item sm={6}>
                            <TextField
                                id="location"
                                label="Emplacement"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                color="primary"
                            />
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
export default Location;
