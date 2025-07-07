import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Divider } from '@mui/material';
import axios from 'axios';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const Features = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/links/1');
        setFeatures(response.data);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <Container
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
        nGomna Features
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                background: '#FFFFFF',
                color: '#000000',
                height: '100%',
                boxShadow: '0px 4px 20px rgb(128, 128, 128)',
                borderRadius: 5,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
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
                    gap: 2,
                  }}
                >
                  <CheckCircleRoundedIcon
                    sx={{
                      width: 40,
                      height: 40,
                      color: 'green',
                    }}
                  />
                  <Typography
                    component="h3"
                    variant="h6"
                    sx={{
                      fontFamily: 'Arial',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {feature.label}
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: 'grey.500',
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: 'center',
                    fontFamily: 'Arial',
                    fontSize: '1rem',
                  }}
                >
                  Click to learn more about this feature
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features; 