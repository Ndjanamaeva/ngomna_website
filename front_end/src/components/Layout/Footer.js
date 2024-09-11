import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ngomna_logo from '../assets/ngomna_logo.png';
import cenadi_logo from '../assets/logo_cenadi-removebg-preview.png';
import minfi_logo from '../assets/logo_minfi-removebg-preview.png';

import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { styled } from '@mui/system';

const StyledLink = styled(Link)({
  color: 'black',
  textDecoration: 'none',
  fontSize: '17px',
  fontFamily: 'Arial',
  
  '&:hover': {
    color: 'green',
    fontSize: '17px',
    textDecoration: 'underline',
    textDecorationColor: 'green'
    
  },
});

const StyledTypography = styled(Typography)({
  fontFamily: "Arial",
  fontSize: "17px",
  fontWeight: "bold",
  color: "black",
});

const minfiLogoStyle = {
  width: '100px',
  height: 'auto',
};

const cenadiLogoStyle = {
  width: '100px',
  height: 'auto',
};

const ngomnaLogoStyle = {
  width: '140px',
  height: 'auto',
};

function Copyright() {
  return (
    <Typography variant="body2" color="black">
      {'Copyright © '}
      <Link sx={{color: 'green', textDecoration: "none", fontFamily: "Arial", "&:hover": {textDecoration: 'underline', textDecorationColor: 'green'}}} href="/"> nGomna </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container maxWidth="none"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left'},
        mt: -8,
        backgroundColor: "white",
        height: "250px",
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row'},
          width: '100%',
          justifyContent: 'space-between',
          height: "250px",
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            minWidth: { xs: '100%', sm: '60%'},
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '30%' } }}>
            <Box sx={{ ml: '-15px' }}>
                <Link href="https://minfi.gov.cm/en/home/">
                  <img
                    src={minfi_logo}
                    style={minfiLogoStyle}
                    alt="logo of minfi"
                  />
                </Link>
              </Box>
          </Box>
          <Box sx={{ width: { xs: '100%', sm: '30%' } }}>
            <Box sx={{ ml: '-15px' }}>
                <Link href="https://www.cenadi.cm/">
                  <img
                    src={cenadi_logo}
                    style={cenadiLogoStyle}
                    alt="logo of cenadi"
                  />
                </Link>
              </Box>
          </Box>
          <Box sx={{ width: { xs: '100%', sm: '10%'}}}>
            <Box sx={{ ml: '-150px' }}>
                <Link href="/">
                  <img
                    src={ngomna_logo}
                    style={ngomnaLogoStyle}
                    alt="logo of ngomna"
                  />
                </Link>
              </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <StyledTypography>
            Features
          </StyledTypography>
          <StyledLink href="Payslips">
            Payslips
          </StyledLink>
          <StyledLink href="Information">
            Information
          </StyledLink>
          <StyledLink href="Notification">
            Notification
          </StyledLink>
          <StyledLink href="Census">
            Census
          </StyledLink>
          <StyledLink href="Messaging">
            Messaging
          </StyledLink>
          <StyledLink href="Children">
            Children
          </StyledLink>
          <StyledLink href="Security">
            Security
          </StyledLink>
          <StyledLink href="OTP">
            OTP
          </StyledLink>
          <StyledLink href="DGI">
            DGI
          </StyledLink>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <StyledTypography>
            About
          </StyledTypography>
          <StyledLink href="Mission">
            Mission
          </StyledLink>
          <StyledLink href="Vision">
            Vision
          </StyledLink>
          <StyledLink href="Perspectives">
            Perspectives
          </StyledLink>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <StyledTypography>
          Contact
          </StyledTypography>
          <StyledLink href="https://wa.me/+237650780347">
            Whatsapp
          </StyledLink>
          <StyledLink href="mailto:app.contact@cenadi.cm">
            E-mail
          </StyledLink>
          <StyledLink href="https://www.facebook.com/profile.php?id=61550797871692">
            Facebook
          </StyledLink>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
          mb: -10,
        }}
      >
        <div>
          <Copyright />
        </div>
        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          useFlexGap
          sx={{mb:2}}
        >
          <IconButton
            href="https://wa.me/+237650780347"
            aria-label="whatsapp"
            sx={{ alignSelf: 'center', '&:hover': { color: 'green' }  }}
          >
            <WhatsAppIcon/>
          </IconButton>
          <IconButton
            href="mailto:app.contact@cenadi.cm"
            aria-label="mail"
            sx={{ alignSelf: 'center', '&:hover': { color: 'green' } }}
          >
            <MailIcon/>
          </IconButton>
          <IconButton
            href="https://www.facebook.com/profile.php?id=61550797871692"
            aria-label="facebook"
            sx={{ alignSelf: 'center', '&:hover': { color: 'green' } }}
          >
            <FacebookIcon/>
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}