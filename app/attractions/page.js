import React from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

async function getData() {
  const res = await fetch('http://localhost:3000/api/attractions');
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', padding: 4 }}>
      <Grid container spacing={3} maxWidth={800}>
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center">Hello Attractions</Typography>
        </Grid>

        {data.map((attraction) => (
          <Grid item xs={12} sm={6} key={attraction.id}>
            <Card sx={{ padding: 2, boxShadow: 3, textAlign: 'center' }}>
              <Avatar 
                src={attraction.coverimage} 
                alt={attraction.name} 
                sx={{ width: 100, height: 100, margin: 'auto' }} 
              />
              <CardContent>
                <Typography variant="h6">{attraction.name}</Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                  <Link href={`/attractions/${attraction.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                    Read More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
