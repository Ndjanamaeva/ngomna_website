import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import { TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'grey',
    },
  },
});

const AddUserForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/adduser', {
        username,
        password,
      });
      console.log(response.data);
      setUsername('');
      setPassword('');
      alert('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default function FAQ() {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : '');
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="black"
        fontFamily="Arial"
        sx={{
          fontSize: '29px',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
          marginTop: '-50px',
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Accordion
          sx={{ "&:hover": { backgroundColor: "rgb(206, 255, 210)" } }}
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="h3" variant="subtitle2" sx={{ fontSize: "19px", color: "black" }}>
              Can I reset my account details in case I have forgotten my password?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              fontSize="19px"
              color="gray"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Yes! nGomna permits you to recover your account details by sending you a code to your mobile phone number.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{ "&:hover": { backgroundColor: "rgb(206, 255, 210)" } }}
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="h3" variant="subtitle2" fontSize="19px" color="black">
              I have a new phone, do I have to change my account details to access nGomna?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              fontSize="19px"
              color="gray"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              No! Simply reinstall nGomna on your phone and fill in your actual account details.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{ "&:hover": { backgroundColor: "rgb(206, 255, 210)" } }}
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="h3" variant="subtitle2" fontSize="19px" color="black">
              Can I help someone else to get his/her payslip on my phone application?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              fontSize="19px"
              color="gray"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              No! nGomna is for personal use ONLY to guarantee security and privacy of users' information.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{ "&:hover": { backgroundColor: "rgb(206, 255, 210)" } }}
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography component="h3" variant="subtitle2" fontSize="19px" color="black">
              Do I need to come to CENADI to have solutions to problems concerned by nGomna?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              fontSize="19px"
              color="grey"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              No! If you do not find solutions to your problem here, simply contact the maintenance team.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
      <br />
      <Typography sx={{ marginTop: '60px', fontSize: '29px', color: "black", fontFamily: "Arial"}} variant="h4" component="h2">
        Any other Problem?
      </Typography>
      <Typography sx={{ fontSize: '19px', textAlign: 'center' }} variant="body2" color="grey" mb={2}>
        <p>Please type your problem below</p>
        <p>A confirmation will be sent to your email</p>
      </Typography>
      <Stack direction="row" spacing={2} useFlexGap sx={{marginBottom: '100px'}}>
        <CustomTextField
          sx={{ backgroundColor: "white" }}
          id="outlined-basic"
          hiddenLabel
          size="small"
          variant="outlined"
          fullWidth
          aria-label="Enter your problem"
          placeholder="Your problem"
          inputProps={{
            autoComplete: 'off',
            'aria-label': 'Enter your problem',
          }}
        />
        <CustomTextField
          sx={{ backgroundColor: "white" }}
          id="outlined-basic"
          hiddenLabel
          size="small"
          variant="outlined"
          fullWidth
          aria-label="Enter your email address"
          placeholder="Your email address"
          inputProps={{
            autoComplete: 'off',
            'aria-label': 'Enter your email address',
          }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ flexShrink: 0, borderRadius: 2, fontFamily: "Arial", fontSize: '17px', background: 'linear-gradient(#001F0E, #00FF66)', color: "white", "&:hover": { background: 'linear-gradient(#001F0E, #00FF66)', boxShadow: "0px 4px 20px rgba(173, 255, 47, 0.5)" } }}>
          Submit
        </Button>
      </Stack>
    </Container>
  );
}
