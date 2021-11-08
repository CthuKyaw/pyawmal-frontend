
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DataTableActionMenu({ userId, activeStatus, onSuspend }) {
  const [anchorEl, setAnchorEl] = React.useState(null);


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSuspend = (id, activeStatus) => {

    onSuspend(id,activeStatus);
    setAnchorEl(null);
  }

  const handleRemove = (id) => {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon></MoreVertIcon>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => { handleSuspend(userId, activeStatus) }}>
          {activeStatus != 2 ? 'Suspend' : 'Unsuspend'}</MenuItem>
        <MenuItem onClick={() => { handleRemove(userId) }}>Remove User</MenuItem>
      </Menu>
    </div>
  );
}

