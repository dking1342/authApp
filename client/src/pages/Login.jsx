import { Button, Container, Grid, Icon, TextField, Typography, Backdrop, CircularProgress, FormHelperText } from '@material-ui/core'
import React, { } from 'react'
import useSigninStyles from '../styles/useSigninStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import { useForms } from '../hooks/useForms';

const Login = () => {
    const classes = useSigninStyles();
    const initialState = {
        email:'',
        password:''
    }

    let { 
        values,
        isLoading,
        formError,
        setFormError,
        onChange,
        onSubmit
    } = useForms(initialState);


    return (
        <section className={classes.sectionContainer}>
            <Container maxWidth='xs' >
                <Grid container alignItems='center' justifyContent='center' spacing={3} className={classes.gridContainer}>
                    <Grid item container alignItems='center' direction='column' justifyContent='center'>
                        <Icon className={classes.iconContainerLogin}>
                            <LockOutlinedIcon />
                        </Icon>
                        <Typography variant='h5' component='h5' color='textPrimary' gutterBottom >
                            Sign In
                        </Typography>
                    </Grid>
                    <Grid container direction='column' spacing={2} alignItems='center' className={classes.inputContainer}>
                        <Grid item>
                            <TextField 
                                variant='outlined' 
                                label='Email' 
                                required 
                                name='email'  
                                type='text'
                                value={values.email}
                                onChange={onChange}  
                                onClick={()=>setFormError(null)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                variant='outlined' 
                                label='Password' 
                                required
                                name='password'
                                type='password'
                                value={values.password}
                                onChange={onChange}
                                onClick={()=>setFormError(null)}
                            />
                        </Grid>
                    </Grid>
                    {
                        formError && (
                            <Grid container justifyContent='center' alignContent='center' className={classes.rootContainer}>
                                {
                                    Object.values(formError).map(err => (
                                        <FormHelperText variant='outlined' key={err}>
                                            <Typography variant='button' style={{color:'red'}}>
                                                {err}
                                            </Typography>
                                        </FormHelperText>
                                    ))
                                }
                            </Grid>
                        )
                    }
                    <Grid container className={classes.rootContainer}>
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
                            onClick={(e)=>onSubmit(e,'login','POST')}
                        >
                            Sign In
                        </Button>
                    </Grid>
                    <Grid container alignItems='center' justifyContent='space-between' className={classes.linkContainer}>
                        <Grid item>
                            <Link to='/register' className={classes.links}>
                                <Typography
                                    variant='body2'
                                    color='primary'
                                >
                                    Don't have an account? Register
                                </Typography>
                            </Link>
                        </Grid>    

                    </Grid>
                </Grid>
                <Backdrop className={classes.backdrop} open={isLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Container>
        </section>
    )
}

export default Login

