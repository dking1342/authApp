import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import useAlbumStyles from '../styles/useAlbumStyles';

const cards = [...Array(9)];

const Dashboard = () => {
    const classes = useAlbumStyles();

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
            </Container>
        </div>
        <Container
            className={classes.cardGrid}
            maxWidth='md'
        >
            <Grid
            container
            spacing={4}
            >
            {
                cards.map((card,i)=>(
                <Grid
                    key={i}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                >
                    <Card
                    className={classes.card}
                    >
                    <CardMedia
                        className={classes.cardMedia}
                        image='https://source.unsplash.com/random'
                        title='Image title'
                    />
                    <CardContent
                        className={classes.cardContent}
                    >
                        <Typography
                        gutterBottom
                        variant='h5'
                        >
                        Heading
                        </Typography>
                        <Typography>
                        This is a media card. You can use this section to describe the content
                        </Typography>
                        <CardActions>
                        <Button
                            size='small'
                            color='primary'
                        >
                            View
                        </Button>
                        <Button
                            size='small'
                            color='primary'
                        >
                            Edit
                        </Button>
                        </CardActions>
                    </CardContent>
                    </Card>
                </Grid>
                ))
            }
            </Grid>
        </Container>
      </>
    )
}

export default Dashboard
