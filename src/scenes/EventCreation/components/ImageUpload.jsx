/* eslint-disable */
// Source code: https://codesandbox.io/s/vj1q68zm25
// imports the React Javascript Library
import React from 'react';
// Card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

import SearchIcon from '@material-ui/icons/Search';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CollectionsIcon from '@material-ui/icons/Collections';

// Search
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ReplayIcon from '@material-ui/icons/Replay';

// Tabs
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    icon: {
        margin: theme.spacing(2),
    },
    iconHover: {
        margin: theme.spacing(2),
        '&:hover': {
            color: red[800],
        },
    },
    cardHeader: {
        textalign: 'center',
        align: 'center',
        backgroundColor: 'white',
    },
    input: {
        display: 'none',
    },
    title: {
        color: blue[800],
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        align: 'center',
    },
    button: {
        color: blue[900],
        margin: 10,
    },
    secondaryButton: {
        color: 'gray',
        margin: 10,
    },
    typography: {
        margin: theme.spacing(2),
        backgroundColor: 'default',
    },

    searchRoot: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    searchInput: {
        marginLeft: 8,
        flex: 1,
    },
    searchIconButton: {
        padding: 10,
    },
    searchDivider: {
        width: 1,
        height: 28,
        margin: 4,
    },
});

class ImageUploadCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainState: 'initial', // initial, search, gallery, uploaded
            // imageUploaded: 0,
            selectedFile: null,
        };
    }

    handleUploadClick = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                selectedFile: [reader.result],
            });
        }.bind(this);
        console.log(url); // Would see a path?

        this.setState({
            mainState: 'uploaded',
            selectedFile: event.target.files[0],
            imageUploaded: 1,
        });
    };

    handleSearchClick = () => {
        this.setState({
            mainState: 'search',
        });
    };

    handleGalleryClick = () => {
        this.setState({
            mainState: 'gallery',
        });
    };

    renderInitialState() {
        const { classes } = this.props;

        return (
            <>
                <CardContent>
                    <Grid container justify="center" alignItems="center">
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.handleUploadClick}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab component="span" className={classes.button}>
                                <AddPhotoAlternateIcon />
                            </Fab>
                        </label>
                        <Fab className={classes.button} onClick={this.handleSearchClick}>
                            <SearchIcon />
                        </Fab>
                        <Fab className={classes.button} onClick={this.handleGalleryClick}>
                            <CollectionsIcon />
                        </Fab>
                    </Grid>
                </CardContent>
            </>
        );
    }

    handleSearchURL = (event) => {
        console.log();
        var file = event.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                selectedFile: [reader.result],
            });
        }.bind(this);
        console.log(url); // Would see a path?

        this.setState({
            selectedFile: event.target.files[0],
            imageUploaded: 1,
        });
    };

    handleImageSearch(url) {
        var filename = url.substring(url.lastIndexOf('/') + 1);
        console.log(filename);
        this.setState({
            mainState: 'uploaded',
            imageUploaded: true,
            selectedFile: url,
            fileReader: undefined,
            filename: filename,
        });
    }

    handleSeachClose = (event) => {
        this.setState({
            mainState: 'initial',
        });
    };

    renderSearchState() {
        const { classes } = this.props;

        return (
            <Paper className={classes.searchRoot} elevation={1}>
                <InputBase className={classes.searchInput} placeholder="Image URL" />
                <IconButton className={classes.button} aria-label="Search" onClick={this.handleImageSearch}>
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.searchDivider} />
                <IconButton
                    color="primary"
                    className={classes.secondaryButton}
                    aria-label="Close"
                    onClick={this.handleSeachClose}
                >
                    <CloseIcon />
                </IconButton>
            </Paper>
        );
    }

    handleAvatarClick(value) {
        var filename = value.url.substring(value.url.lastIndexOf('/') + 1);
        console.log(filename);
        this.setState({
            mainState: 'uploaded',
            imageUploaded: true,
            selectedFile: value.url,
            fileReader: undefined,
            filename: filename,
        });
    }

    renderGalleryState() {
        const { classes } = this.props;
        const listItems = this.props.imageGallery.map((url, index) => (
            <div
                key={index}
                onClick={(value) => this.handleAvatarClick({ url })}
                style={{
                    padding: '5px 5px 5px 5px',
                    cursor: 'pointer',
                }}
            >
                <Avatar src={url} />
            </div>
        ));

        /*const listItems = this.props.imageGallery.map(url => (
      <div
        onClick={value => this.handleAvatarClick({ url })}
        style={{
          padding: "5px 5px 5px 5px",
          cursor: "pointer"
        }}
      >
        <Avatar shape="square" size={100} src={url} />
      </div>
    ));*/

        return (
            <React.Fragment>
                <Grid>
                    {listItems}
                    <IconButton
                        color="primary"
                        className={classes.secondaryButton}
                        aria-label="Close"
                        onClick={this.handleSeachClose}
                    >
                        <ReplayIcon />
                    </IconButton>
                </Grid>
            </React.Fragment>
        );
    }

    renderUploadedState() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CardActionArea onClick={this.imageResetHandler}>
                    <img alt="Alttext" width="100%" className={classes.media} src={this.state.selectedFile} />
                </CardActionArea>
            </React.Fragment>
        );
    }

    imageResetHandler = (event) => {
        console.log('Click!');
        this.setState({
            mainState: 'initial',
            selectedFile: null,
            imageUploaded: 0,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Card className={this.props.cardName}>
                        {(this.state.mainState === 'initial' && this.renderInitialState()) ||
                            (this.state.mainState === 'search' && this.renderSearchState()) ||
                            (this.state.mainState === 'gallery' && this.renderGalleryState()) ||
                            (this.state.mainState === 'uploaded' && this.renderUploadedState())}
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);
