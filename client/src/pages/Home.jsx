import React, { useContext } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import useAlbumStyles from '../styles/useAlbumStyles';
import { UserContext } from '../store/user';
import { useHistory } from 'react-router';

const Home = () => {
    const classes = useAlbumStyles();
    const history = useHistory();
    const { state } = useContext(UserContext);

    const handleClick = () => {
        if(state.userInfo){
            history.push('/dashboard');
        } else {
            history.push('/login');
        }
    }

    return (
        <>
        <div className={classes.container}>
            <Container
                maxWidth='sm'
            >
            <Typography
                variant='h2'
                align='center'
                color='textPrimary'
                gutterBottom
            >
                Photo Album
            </Typography>
            <Typography
                variant='h5'
                align='center'
                color='textSecondary'
                paragraph
            >
                Hello everyone! This is a photo album Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, porro!
            </Typography>
            <div className={classes.buttons}>
                <Grid
                container
                spacing={2}
                justifyContent='center'
                >
                <Grid
                    item
                >
                    <Button
                    variant='contained'
                    color='primary'
                    onClick={handleClick}
                    >
                    See My Photos
                    </Button>
                </Grid>
                </Grid>
            </div>
            </Container>
        </div>

      </>
    )
}

export default Home
