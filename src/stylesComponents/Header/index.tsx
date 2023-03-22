import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';

import { useCustomContext } from '@/Context';
import SchoolIcon from '@mui/icons-material/School';
import { pages } from './paths';

function ResponsiveAppBar(): JSX.Element {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, setUser } = useCustomContext();

  const router = useRouter();

  const handleOpen = (event: MouseEvent<HTMLElement>, origin: string): void => {
    if (origin === 'user') return setAnchorElUser(event.currentTarget);
    if (origin === 'nav') return setAnchorElNav(event.currentTarget);
  };

  const handleClose = (origin: string): void => {
    if (origin === 'nav') {
      setAnchorElNav(null);
    }
    if (origin === 'user') {
      setAnchorElUser(null);
    }
  };

  const settings = [
    {
      name: 'Profile',
      href: `/user/${user?.id}`,
    },
    {
      name: 'Logout',
      href: '/',
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ACADEMY IT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => handleOpen(event, 'nav')}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleClose('nav')}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => router.push(`/${page.href}`)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ACADEMY IT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => router.push(`/${page.href}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!user ? (
              <Button
                color="secondary"
                onClick={() => router.push('/login')}
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={(event) => handleOpen(event, 'user')}
                    sx={{ p: 0 }}
                  >
                    <Avatar alt="Remy Sharp" src={user.image} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={() => handleClose('user')}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={() => {
                        if (setting.name === 'Logout') {
                          setUser(null);
                          handleClose('user');
                          return router.push(`/${setting.href}`);
                        }
                        router.push(`/${setting.href}`);
                      }}
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
