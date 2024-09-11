import React from 'react';
import Layout from './../components/Layout/Layout';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Census = () => {
  return (
    <Layout>
      <Container
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          pr: { xs: 6, sm: 6 },
          pl: { xs: 6, sm: 6 },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // Center the content vertically
          minHeight: '100vh', // Make container at least full height of viewport
        }}
      >
        <Grid container spacing={5} alignItems="stretch" justifyContent="center">
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                background: '#FFFFFF',
                color: '#000000',
                width: '100%',
                height: 500,
                boxShadow: '0px 4px 20px rgb(128, 128, 128)',
                borderRadius: 5,
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="h1" sx={{ fontFamily: 'Arial', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  CENSUS
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default Census;
