import React, { useState } from 'react'
import '../flex-test/flex-test.css';
import { maxWidth, minHeight, minWidth, styled } from '@mui/system';
import { Box, Grid, Paper } from '@mui/material';
import { green } from '@mui/material/colors';


export default function FlexTest() {
    const [userCount, setUserCount] = useState(10);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        [theme.breakpoints.only('lg')]: {
            maxWidth: '35rem',
            maxWidth: `${userCount <= 6 ? '30rem' : userCount <= 12 ? '20rem' : userCount > 12 ? '16rem' : '14rem'}`,
            minHeight: `${userCount <= 6 ? '18rem' : userCount <= 12 ? '14rem' : userCount > 12 ? '12rem' : '12rem'}`,
            backgroundColor: 'white'
        },
        [theme.breakpoints.only('md')]: {
            maxWidth: '35rem',
            maxWidth: `${userCount <= 6 ? '30rem' : userCount <= 12 ? '18rem' : userCount > 12 ? '12rem' : '14rem'}`,
            minHeight: `${userCount <= 6 ? '14rem' : userCount <= 12 ? '14rem' : userCount > 12 ? '8rem' : '12rem'}`,
            backgroundColor: 'green'
        },
        [theme.breakpoints.only('sm')]: {
            minHeight: '5rem',
            maxWidth: `${userCount <= 6 ? '18rem' : userCount <= 12 ? '18rem' : userCount > 12 ? '12rem' : '14rem'}`,
            minHeight: `${userCount <= 6 ? '12rem' : userCount <= 12 ? '8rem' : userCount > 12 ? '8rem' : '12rem'}`,
            backgroundColor: 'yellow'
        },
        [theme.breakpoints.only('xs')]: {
            minWidth: `${userCount <= 6 ? '10rem' : userCount <= 12 ? '10rem' : userCount > 12 ? '12rem' : '14rem'}`,
            height: `${userCount <= 6 ? '13rem' : userCount <= 12 ? '10rem' : userCount > 12 ? '8rem' : '12rem'}`,
            backgroundColor: 'blue'
        }

    }));

    return (

        <Box sx={{ pt: 4, pb: 8, height: '100vh', overflow: 'auto', alignItems:'center' }}>
            <Grid container spacing={{ md: 1, lg: 1, sm: 1, xs: 1 }} columns={{
                xs: `${userCount >= 3 ? 6 : 1}`,
                sm: `${userCount <= 6 ? 6 : userCount <= 12 ? 8 : 12}`,
                md: `${userCount <= 6 ? 6 : userCount <= 12 ? 12 : 12}`,
                lg: `${userCount <= 6 ? 6 : userCount <= 12 ? 12 : 16}`
            }}
                sx={{ minWidth: '100%' }}>
                {Array.from(Array(userCount)).map((_, index) => (
                    <Grid item md={2} lg={2} sm={2} xs={`${userCount >= 3 ? 3 : 1}`} key={index}>
                        <Item>xs={index}</Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

