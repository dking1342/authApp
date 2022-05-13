import { Button, Container, Grid, Icon, TextField, Typography, FormHelperText, Backdrop,CircularProgress } from '@material-ui/core'
import React, { } from 'react'
import useSigninStyles from '../styles/useSigninStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import { useForms } from '../hooks/useForms';

const Register = () => {
    const classes = useSigninStyles();
    const initialState ={
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    };

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
                        <Icon className={classes.iconContainerRegister}>
                            <LockOutlinedIcon />
                        </Icon>
                        <Typography variant='h5' component='h5' color='textPrimary' gutterBottom >
                            Register
                        </Typography>
                    </Grid>
                    <Grid container direction='column' spacing={2} alignItems='center' className={classes.inputContainer}>
                        <Grid item>
                            <TextField 
                                variant='outlined' 
                                label='Username'
                                required 
                                color='secondary'
                                name='username'
                                type='text'
                                value={values.username}
                                onChange={onChange}
                                onClick={()=>setFormError(null)} 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                variant='outlined' 
                                label='Email' 
                                required
                                color='secondary'
                                name='email'
                                type='email'
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
                                color='secondary'
                                name='password'
                                type='password'
                                value={values.password}
                                onChange={onChange}
                                onClick={()=>setFormError(null)} 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                variant='outlined' 
                                label='Confirm Password' 
                                required
                                color='secondary'
                                name='confirmPassword'
                                type='password'
                                value={values.confirmPassword}
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
                            color='secondary'
                            disableElevation
                            onClick={(e)=>onSubmit(e,'register','POST')}
                        >
                            Register
                        </Button>
                    </Grid>
                    <Grid container alignItems='center' justifyContent='space-between' className={classes.linkContainer}>   
                        <Grid item>
                            <Link to='/login' className={classes.links}>
                                <Typography
                                    variant='body2'
                                    color='primary'
                                >
                                    Already Registered? Sign In
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

export default Register

