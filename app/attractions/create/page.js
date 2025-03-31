'use client'

import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack
} from '@mui/material'
import { useRouter } from 'next/navigation'

export default function CreateAttractionPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    coverimage: '',
    latitude: '',
    longitude: '',
  })

  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
  
    const lat = parseFloat(formData.latitude)
    const lon = parseFloat(formData.longitude)
  
    if (isNaN(lat) || lat < -90 || lat > 90) return setError('Latitude must be between -90 and 90')
    if (isNaN(lon) || lon < -180 || lon > 180) return setError('Longitude must be between -180 and 180')
  

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attractions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to create attraction')
      }

      const result = await res.json()
      // Redirect to the main page or detail page
      router.push('../attraction')

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Box maxWidth={600} mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Create New Attraction</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Detail"
            name="detail"
            multiline
            rows={4}
            value={formData.detail}
            onChange={handleChange}
            required
          />
          <TextField
            label="Cover Image URL"
            name="coverimage"
            value={formData.coverimage}
            onChange={handleChange}
            required
          />
          <TextField
            label="Latitude"
            name="latitude"
            type="number"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
          <TextField
            label="Longitude"
            name="longitude"
            type="number"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
