import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const newsItems = [
  {
    id: 1,
    title: "nGomna: Cameroon's Digital Transformation Milestone",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60",
    description: "The official launch of nGomna platform marks a significant step in Cameroon's digital transformation, bringing public services closer to citizens through innovative technology.",
    source: "Cameroon Tribune"
  },
  {
    id: 2,
    title: "nGomna App: Simplifying Administrative Procedures",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&auto=format&fit=crop&q=60",
    description: "The nGomna mobile application revolutionizes how citizens interact with government services, making administrative procedures more accessible and efficient.",
    source: "CRTV"
  },
  {
    id: 3,
    title: "nGomna: Enhancing E-Governance in Cameroon",
    date: "March 5, 2024",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop&q=60",
    description: "The innovative nGomna platform sets new standards for e-governance in Cameroon, enhancing transparency and efficiency in public service delivery.",
    source: "Journal du Cameroun"
  }
];

const LatestNews = () => {
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
        }}
      >
        <NewspaperIcon sx={{ fontSize: 40, color: '#1976d2' }} />
        <Typography
          component="h2"
          variant="h4"
          color="black"
          fontFamily="Arial"
          sx={{
            fontSize: '29px',
            fontWeight: 'bold',
          }}
        >
          Latest News
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {newsItems.map((news) => (
          <Grid item xs={12} md={4} key={news.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={news.image}
                alt={news.title}
                sx={{
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h3"
                  sx={{
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    mb: 1,
                  }}
                >
                  {news.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, fontSize: '0.9rem' }}
                >
                  {news.date} | {news.source}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, flexGrow: 1 }}
                >
                  {news.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    alignSelf: 'flex-start',
                    mt: 'auto',
                    textTransform: 'none',
                    borderRadius: 2,
                  }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LatestNews; 