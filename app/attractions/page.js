'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { 
  Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Box 
} from '@mui/material'
import Link from 'next/link'

export default function Page() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(null) // ใช้ track ID ของ Attraction ที่กำลังลบ

  const getData = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attractions`)
      if (!res.ok) throw new Error('Failed to fetch data')
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false) // ✅ เรียกใช้ที่นี่เพื่อให้ทำงานเสมอ
    }
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this attraction?')) return

    setDeleting(id) // ✅ แสดงสถานะลบข้อมูล

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attractions/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'Failed to delete')
      }

      // ✅ อัปเดต state หลังจากลบสำเร็จ
      setData((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      alert(err.message)
    } finally {
      setDeleting(null) // ✅ ปิดสถานะลบข้อมูล
    }
  }

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography color="error">{error}</Typography>

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Attractions</Typography>
      <Link href="/attractions/create" passHref>
        <Button variant="contained" sx={{ mb: 3 }}>Create</Button>
      </Link>

      <Grid container spacing={3}>
        {data.map((attraction) => (
          <Grid item key={attraction.id} xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                sx={{ height: 180 }}
                image={attraction.coverimage}
                title={attraction.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {attraction.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {attraction.detail}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                <Link href={`/attractions/${attraction.id}`} passHref>
                  <Button size="small">Learn More</Button>
                </Link>
                <Link href={`/attractions/update?id=${attraction.id}`} passHref>
                  <Button size="small">Edit</Button>
                </Link>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(attraction.id)}
                  disabled={deleting === attraction.id} // ✅ ป้องกันกดซ้ำตอนกำลังลบ
                >
                  {deleting === attraction.id ? 'Deleting...' : 'Delete'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
