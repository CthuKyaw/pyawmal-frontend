import React, { useEffect, useState } from "react";
import moment from "moment";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from "./Dialog";
import { IconButton, Link, Stack, Tooltip } from "@mui/material";
import { red, green, blue, grey, orange, yellow } from '@mui/material/colors';
import MessageOutlined from '@mui/icons-material/MessageOutlined';
import Badge from '@mui/material/Badge';
import InfoSharp from '@mui/icons-material/InfoSharp';
import DataTableActionMenu from "./DataTableActionMenu";
import { useAuth } from "../../context/auth-context";
import RefreshIcon from '@mui/icons-material/Refresh'; 
import { Navigate } from "react-router";

export default function DataTable({ results, onSuspend, loginUserRole }) {

  const [showAlert, setShowAlert] = useState(false);
  const {getCurrentUser} = useAuth();

  function handleShowAlert(s) {
    setShowAlert(s);
  }

  function handleSeeMoreClick(val) {
    return alert(val);
  }

  function getRecDate(recDateTime) {
    const moment = require('moment');
    let date = moment().toDate();
    let currentDate = moment(date).format('DD/MM/YYYY');
    let recDate = moment(recDateTime).format('DD/MM/YYYY');


    if (currentDate === recDate) {
      return "Today"
    }
    else if (date.getMonth() == new Date(recDateTime).getMonth() &&
      date.getFullYear() == new Date(recDateTime).getFullYear()
    ) {
      if ((date.getDate() - new Date(recDateTime).getDate()) == 1) {
        return "Yesterday"
      }
      else {
        return `${date.getDate() - new Date(recDateTime).getDate()} days ago`;
      }
    }
    else if (date.getMonth() != new Date(recDateTime).getMonth() &&
      date.getFullYear() == new Date(recDateTime).getFullYear()) {
      if ((date.getMonth() - new Date(recDateTime).getMonth()) == 1) {
        return `1 month ago`;
      }
      else {
        return `${date.getMonth() - new Date(recDateTime).getMonth()} months ago`;
      }
    }
    else {
      return `${date.getFullYear() - new Date(recDateTime).getFullYear()} Year(s) ago`;
    }

  }

  return (
    <>
      {results && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow> 
                <TableCell sx={{fontSize:'1rem', color:'#fff',textAlign:'left'}}>Name</TableCell>
                <TableCell sx={{fontSize:'1rem', color:'#fff',textAlign:'center'}}>Last active</TableCell>
                <TableCell sx={{fontSize:'1rem', color:'#fff',textAlign:'left'}}> 
                  <IconButton onClick={<Navigate to="/dashboard"/>} Tooltip="Refresh">
                  <RefreshIcon></RefreshIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((obj, index) => (
                <TableRow
                  key={obj.UserId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: obj.Status > 0 ? red[100] : grey[10] }}>
                  <TableCell component="th" scope="row">
                    <Stack direction="row">
                      {obj.UserName}
                      {obj.Active == 2 &&
                        <Tooltip title="User Suspended">
                          <InfoSharp style={{ color: orange[800] }} />
                        </Tooltip>
                      }

                    </Stack>

                  </TableCell>
                  <TableCell align="center">{getRecDate(obj.RecDate)} {moment(obj.RecDate).format('hh:mm a')}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row"
                      justifyContent="flex-end"
                      alignItems="flex-end">

                      {obj.Status > 0 &&
                        <IconButton onClick={() => handleSeeMoreClick(obj.Note)}>
                          <Badge badgeContent={1} color="secondary">
                            <MessageOutlined sx={{ color: grey[600] }} />
                          </Badge>
                        </IconButton>}

                      { (loginUserRole !== 2 && getCurrentUser().data.id !== obj.UserId) &&
                        <DataTableActionMenu userId={obj.UserId}
                          activeStatus={obj.Active} onSuspend={onSuspend}>
                        </DataTableActionMenu>
                      }

                    </Stack>
                  </TableCell>

                </TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
