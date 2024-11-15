import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import mission from '../components/assets/Mission (3).png';
import Vision from '../components/assets/vision.png';
import Perspectives from '../components/assets/perspectives.png';

const AnimatedTypography = ({ text, resetTrigger }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    if (resetTrigger) {
      setDisplayText('');
      setCurrentIndex(0);
    }
  }, [resetTrigger]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, text]);

  return (
    <Typography 
    component="h2"
    variant="h4"
    sx={{ fontFamily: 'Arial', mt: '-50px', fontSize: '29px', textAlign: 'center'}}>
      {displayText}
    </Typography>
  );
};

const tiers = [
  {
    title: 'THE MISSION',
    icon: mission,
    description: [
      'Payslip Access',
      'Real-Time Notifications',
      'Operational Support',
    ],
    link: '/Mission',
  },
  {
    title: 'THE VISION',
    icon: Vision,
    description: [
      'Public Servant Engagement',
      'Citizens Engagement',
      'E-Citizenship',
      'Data Protection',
    ],
    link: '/Vision',
  },
  {
    title: 'THE PERSPECTIVES',
    icon: Perspectives,
    description: [
      'Governmental Electronic Messaging',
      'Data Sovereignty',
      'E-state Services',
    ],
    link: '/Perspectives',
  },
];

export default function Aboutngomna() {
  const aboutRef = useRef(null);
  const [animationActive, setAnimationActive] = React.useState(false);
  const [resetTrigger, setResetTrigger] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationActive(true);
          setResetTrigger((prev) => !prev); 
        }
      },
      { threshold: 0.5 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <Container id="About_ngomna"
      ref={aboutRef}
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        pr: { xs: 6, sm: 6 },
        pl: { xs: 6, sm: 6 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
        marginBottom: 10,
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        {animationActive && <AnimatedTypography text="About nGomna" resetTrigger={resetTrigger} />}
      </Box>
      <Grid container spacing={5} alignItems="stretch" justifyContent="center">
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === 'THE PERSPECTIVES' ? 12 : 6}
            md={4}
          >
            <Link to={tier.link} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  background: '#FFFFFF',
                  color: '#000000',
                  width: '100%',
                  height: '100%',
                  boxShadow: '0px 4px 20px rgb(128, 128, 128)',
                  borderRadius: 5,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0px 4px 20px rgb(128, 128, 128)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <img src={tier.icon} alt={tier.title} style={{ width: '50px' }} />
                    <Typography component="h3" variant="h6" sx={{ fontFamily: 'Arial', mt: 2, fontWeight: 'bold' }}>
                      {tier.title}
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      my: 2,
                      opacity: 0.2,
                      borderColor: 'grey.500',
                    }}
                  />
                  {tier.description.map((line, index) => (
                    <Box
                      key={line}
                      sx={{
                        py: 1,
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'center',
                      }}
                    >
                      <CheckCircleRoundedIcon
                        sx={{
                          width: 20,
                          color: 'green',
                        }}
                      />
                      <Typography
                        component="text"
                        variant="subtitle2"
                        sx={{ fontFamily: 'Arial', fontSize: '1.1rem' }}
                      >
                        {line}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
