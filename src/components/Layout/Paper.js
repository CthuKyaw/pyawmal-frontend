import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navigator from './Navigator';
import { color, fontSize } from '@mui/system';
import { Container } from '@mui/material';
import { red } from '@mui/material/colors';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ color: '#fff' }}>
      {'Copyright © pyawmal.com '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: '#366268',
      main: '#ebb53b',
      dark: '#006db3',
      drawer: '#135c66'
    },
  },
  typography: {
    h2:{
      color: '#fff',
      fontSize:'2.5rem'
    },
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
      color: '#fff'
    },
    h6: {
      fontWeight: 500,
      letterSpacing: 0.5,
      fontSize: 18,
      color: '#464646'
    }
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  }
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.palette.primary.drawer,
        },
      },
    },
    MuiOutlinedInput:{
      styleOverrides: {
        root: {
          backgroundColor: '#fff'
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#649998'
        },
      },
    },
    MuiTable:{
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          padding: '10px',
          color:'#fff'
        }
        
      }
    },
    MuiTableHead:{
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
          
        }
      }
    },
    MuiMenuItem:{
      styleOverrides: {
        root: {
          color: '#fff',
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize:'1rem',
          color:"#fff"
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          }
         
        },
        dangered:{
          backgroundColor: "#d01429",
          color:red[300],
          
        }
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

export default function Paperbase({ children,...props }) {

  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', minWidth: "100%" }}>
        <CssBaseline />
        <Navigator />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

          <Box component="main" sx={{ flex: 1, py: 6, bgcolor: theme.palette.primary.light }}>
            <Container component="main" maxWidth="xl" sx={{display:'flex',justifyContent:'center'}}>
              {children}
            </Container>

          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: theme.palette.primary.light }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}