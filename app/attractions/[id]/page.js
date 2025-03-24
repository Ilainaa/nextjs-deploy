import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/attractions/${id}`);
  return res.json();
}

export default async function Page({ params }) {
  const id = params.id;
  const data = await getData(id);
  console.log(data);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 3 }}>
      <Card sx={{ maxWidth: 400, boxShadow: 5, textAlign: 'center', padding: 2 }}>
        <img 
          src={data.coverimage} 
          alt={data.name} 
          width={250} 
          height={250} 
          style={{ borderRadius: '8px', objectFit: 'cover' }} 
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">{data.name}</Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            {data.detail}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
