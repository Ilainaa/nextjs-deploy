
'use client'

import React, { useEffect, useState } from 'react'
import {
    TextField,
    Button,
    Typography,
    Box,
    Stack
} from '@mui/material'
import { useSearchParams, useRouter } from 'next/navigation'

export default function UpdateAttractionPage() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: '',
        detail: '',
        coverimage: '',
        latitude: '',
        longitude: '',
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) {
            setError('No ID provided')
            return
        }

        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attractions`+id)
                if (!res.ok) throw new Error('Failed to fetch attractions')
                const data = await res.json()

                if (!attraction) throw new Error('Attraction not found')
                setFormData(attraction)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        const { name, detail, coverimage, latitude, longitude } = formData

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attractions`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, detail, coverimage, latitude, longitude }),
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || 'Failed to update attraction')
            }

            router.push('../attractions')
        } catch (err) {
            setError(err.message)
        }
    }

    if (loading) return <Typography>Loading...</Typography>
    if (error) return <Typography color="error">{error}</Typography>

    return (
        <Box maxWidth={600} mx="auto" mt={5}>
            <Typography variant="h5" mb={2}>Update Attraction</Typography>
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
                    <Button variant="contained" color="primary" type="submit">
                        Update
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}

