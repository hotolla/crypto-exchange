import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { Switch } from '@mui/material';
import { LangSwitcher } from './LangSwitcher';
import { Link } from 'react-router-dom';

const pages = ['Currencies', 'Trade', 'Orders'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface Props {
  isDarkTheme: boolean,
  onThemeToggle: () => void,
}

export const Header = ({ isDarkTheme, onThemeToggle }: Props) => {
  const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null | undefined>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <CurrencyBitcoinIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
            <Typography variant="h5" align="center">Crypto exchange</Typography>
        
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
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon  color="primary" />
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
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Button
              color="inherit"
              startIcon={<LoginIcon />}
              component={Link}
              to="/login"
          >
            Login to account
          </Button>
          <Switch checked={isDarkTheme} onChange={onThemeToggle} />
          <LangSwitcher />         
        </Toolbar>
      </Container>
    </AppBar>
  );
};