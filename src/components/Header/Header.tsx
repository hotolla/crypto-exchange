import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import AdbIcon from '@mui/icons-material/Adb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { Switch } from '@mui/material';
import { LangSwitcher } from './LangSwitcher';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import * as authApi from '../../api/auth';
import { useState } from 'react';
const pages = [ 'Currencies', 'Trade', 'Orders' ];
const settings = [ 'Profile', 'Account', 'Dashboard', 'Logout' ];

interface Props {
  isDarkTheme: boolean,
  onThemeToggle: () => void,
}
interface IUser {
  name: string,
  email: string,
};

export const Header = ({ isDarkTheme, onThemeToggle }: Props) => {
  const [ anchorElNav, setAnchorElNav ] = React.useState<null | HTMLElement>(null);
  const [ anchorElUser, setAnchorElUser ] = React.useState<null | HTMLElement>(null);
  const [ user, setUser ] = useState<IUser>();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const defineUser  = (user: IUser) => {
    authApi.login(user).then(() => {
      console.log(user);
      return user;
    });
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <CurrencyBitcoinIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
            <Typography variant="h5" align="center" mr={6}>Crypto exchange</Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user?.name}>
              <IconButton color="inherit" onClick={handleOpenUserMenu}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Switch checked={isDarkTheme} onChange={onThemeToggle} />
          <LangSwitcher />

          <Link href="/login" passHref legacyBehavior>
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => defineUser}
            >
              Login to account
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};