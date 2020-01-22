import React from 'react';
import {
  Typography,
  ListItemIcon,
  Divider,
  MenuList,
  MenuItem
}from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

import logo from '../assets/sidemenu_logo.jpg';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CarIcon from '@material-ui/icons/DirectionsCar';
import ListIcon from '@material-ui/icons/ListAlt';
import ExitIcon from '@material-ui/icons/ExitToApp';
import OfferIcon from '@material-ui/icons/LocalOffer';
import PeopleIcon from '@material-ui/icons/People';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import NotifyIcon from '@material-ui/icons/NotificationsActive';

import {
  signOut
}  from "../actions/authactions";


function AppMenu() {
  const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(signOut());
  };

    return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center',backgroundColor:'#444444'}}>
        <img style={{marginTop:'20px',marginBottom:'20px',width:'120px',height:'120px'}} src={logo} alt="Logo" />
      </div>
      <Divider/>
      <MenuList>
        <MenuItem component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Typography variant="inherit">Dashboard</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/drivers">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <Typography variant="inherit">Users</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/cartypes">
          <ListItemIcon>
            <CarIcon />
          </ListItemIcon>
          <Typography variant="inherit">Car Types</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/bookings">
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <Typography variant="inherit">Booking History</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/promos">
          <ListItemIcon>
            <OfferIcon />
          </ListItemIcon>
          <Typography variant="inherit">Promos</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/referral">
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <Typography variant="inherit">Referral Bonus</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/notifications">
          <ListItemIcon>
            <NotifyIcon />
          </ListItemIcon>
          <Typography variant="inherit">Push Notifications</Typography>
        </MenuItem>
        <MenuItem onClick={LogOut}>
          <ListItemIcon>
            <ExitIcon />
          </ListItemIcon>
          <Typography variant="inherit">Log Out</Typography>
        </MenuItem>
      </MenuList>
    </div>
  );
}

export default AppMenu;