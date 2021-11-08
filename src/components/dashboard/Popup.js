import React, { useState } from "react";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useAuth } from "../../context/auth-context";
import { Paper } from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
    

};


export default function Popup({ onSubmit }) {
    const [txtNote, setTxtNote] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleTxtNoteChange(val) {
        setTxtNote(val.target.value);
    }

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off">

            </Box>
            <Button onClick={handleOpen} size="small">Rest Day</Button>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h5" gutterBottom component="div" sx={{ color: "#000000" }}>
                                Write something
                            </Typography>
                            <TextField
                                id="outlined-multiline-static"
                                label="Notes"
                                multiline
                                rows={4}
                                onChange={handleTxtNoteChange} />
                            <Stack spacing={2} direction="row">
                                <Button align="left" variant="contained" className="submit" onClick={() => { onSubmit(1, txtNote); handleClose(false); }}>Post</Button>
                                <Button align="right" variant="contained" className="cancel" onClick={() => handleClose(false)}>Cancel</Button>

                            </Stack>
                        </Stack>
                    
                </Box>
            </Modal>
        </>

    )

}
