import React from 'react';
import { Button } from '@material-ui/core';

const values = {
    place: 'Lieu',
    online: 'Événement en ligne',
    tbd: 'À communiquer',
};

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: 'place' };
    }

    handleClick = (selected) => {
        this.setState({ selected });
    };

    render() {
        return (
            <div>
                {Object.keys(values).map((key) => (
                    <Button
                        value={key}
                        variant={key === this.state.selected ? 'contained' : 'outlined'}
                        color="secondary"
                        onClick={() => this.handleClick(key)}
                    >
                        {values[key]}
                    </Button>
                ))}
            </div>
        );
    }
}

// export default connect(
//   null,
//   {  }
// )(GeneralInfo);
export default Location;
