import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../store/user';
import useHeaderStyles from '../styles/useHeaderStyles'

const Header = () => {
    const classes = useHeaderStyles();
    const history = useHistory();
    const { state, logout } = useContext(UserContext);

    const handleLogout = () => {
      logout();
      history.push('/');
    }

    return (
        <AppBar
        position='relative'
      >
        <Toolbar
          variant='regular'
          classes={{root:classes.toolbar}}
        >
          <nav className={classes.navStart}>
              <Link to='/'>
                <Typography
                  variant='h6'
                  component='button'
                  className={classes.link}
                >
                  PERN JWT App
                </Typography>

              </Link>
          </nav>
          <nav className={classes.navEnd}>
              {
                  state.userInfo ? (
                      <>
                        <Link to='/dashboard'
                        >
                        <Typography
                            className={classes.link}
                            component='button'
                        >
                            Album
                        </Typography>
                        </Link>
                        <Link to='#' onClick={handleLogout}>
                        <Typography
                            className={classes.link}
                            component='button'
                        >
                            Logout
                        </Typography>
                        </Link>
                      </>
                  ) : (
                      <>
                        <Link to='/login'>
                        <Typography
                            className={classes.link}
                            component='button'
                        >
                            Sign In
                        </Typography>
                        </Link>
                        <Link to='/register'>
                        <Typography
                            className={classes.link}
                            component='button'
                        >
                            Register
                        </Typography>
                        </Link>
                      </>
                  )
              }
          </nav>
        </Toolbar>
      </AppBar>
    )
}

export default Header
