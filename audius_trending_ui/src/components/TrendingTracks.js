import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, IconButton, AppBar, Toolbar, Container, Grid, MenuItem, Select, FormControl, InputLabel, Box, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import audiusLogo from '../Logos/SVG/Horizontal_Black.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const TrendingTracks = () => {
    const [tracks, setTracks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [genreFilter, setGenreFilter] = useState('All');
    const [sortedByFavorites, setSortedByFavorites] = useState(false);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/trending');
                setTracks(response.data.tracks);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch tracks');
                setLoading(false);
            }
        };

        fetchTracks();
    }, []);

    const filteredTracks = tracks.filter(track => {
        const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = genreFilter === 'All' || track.genre === genreFilter;
        return matchesSearch && matchesGenre;
    });

    const sortedTracks = sortedByFavorites
        ? [...filteredTracks].sort((a, b) => favorites.includes(b.id) - favorites.includes(a.id))
        : filteredTracks;

    const toggleFavorite = (trackId) => {
        if (favorites.includes(trackId)) {
            setFavorites(favorites.filter(id => id !== trackId));
        } else {
            setFavorites([...favorites, trackId]);
        }
    };

    const handleGenreChange = (event) => {
        setGenreFilter(event.target.value);
    };

    const handleSort = () => {
        setSortedByFavorites(!sortedByFavorites);
    };

    const theme = createTheme({
        typography: {
          subtitle1: {
            fontSize: 16,
            fontWeight: 500,
          },
          body1: {
            fontSize: 12,
            fontWeight: 200,
          }
        },
      });

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <div>
            {/* "Trending" title top bar */}
            <AppBar position="fixed" sx={{ backgroundColor: 'white', zIndex: 1300 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Audius Logo on the left */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img 
                            src={audiusLogo} 
                            alt="Audius Logo" 
                            style={{ width: '75px', height: '75px', marginRight: '5px' }} 
                        />
                    </Box>
                
                    <Typography 
                        variant="body2" 
                        sx={{ position: 'absolute', bottom: 10, left: 20, color: 'gray', fontSize: '12px'}}
                    >
                        @nisreen-alqaisi
                    </Typography>

                    {/* Trending Title */}
                    <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                        <Typography 
                            variant="h4" 
                            component="div" 
                            sx={{ 
                                background: 'linear-gradient(90deg, rgba(134,56,246,1) 0%, rgba(73,0,175,1) 100%)', 
                                WebkitBackgroundClip: 'text', 
                                WebkitTextFillColor: 'transparent', 
                                fontWeight: 'bold', 
                                fontSize: '24px',
                                fontFamily: 'Arial Black'
                            }}
                        >
                            Trending
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container sx={{ display: 'flex', marginTop: 10, paddingLeft: 0, paddingRight: 0 }}>
                {/* Sidebar */}
                <Box sx={{ flexShrink: 0, width: '20%', position: 'fixed', top: 75, left: 0, backgroundColor: 'white', height: '100vh', zIndex: 1200, padding: 2, paddingBottom: 4 }}>
                    {/* Search bar */}
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField 
                            variant="outlined" 
                            label="Search" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            fullWidth 
                        />
                    </Box>
                    
                    {/* Genre filters */}
                    <Box sx={{ marginBottom: 2 }}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="genre-filter-label">Genre</InputLabel>
                            <Select
                                labelId="genre-filter-label"
                                value={genreFilter}
                                onChange={handleGenreChange}
                                label="Genre"
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Electronic">Electronic</MenuItem>
                                <MenuItem value="Hip-Hop/Rap">Hip-Hop/Rap</MenuItem>
                                <MenuItem value="Dubstep">Dubstep</MenuItem>
                                <MenuItem value="Metal">Metal</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Sort Button */}
                    <IconButton
                        onClick={handleSort}
                        sx={{ 
                            background: 'linear-gradient(90deg, rgba(134,56,246,1) 0%, rgba(73,0,175,1) 100%)', 
                            color: 'white',
                            padding: '8px 16px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            borderRadius: 0,
                            textAlign: 'center'
                        }}
                    >
                        {sortedByFavorites ? 'Unsort Favorites' : 'Sort by Favorites'}
                    </IconButton>
                </Box>
                
                {/* Track data in card format */}
                <Box sx={{ flexGrow: 1, marginLeft: '20%', paddingLeft: 2, paddingTop: 2, paddingRight: 4, backgroundColor: '#f8f4fd' }}>
                    <Grid container spacing={3}>
                        {sortedTracks.length > 0 ? (
                            sortedTracks.map(track => (
                                <Grid item xs={12} key={track.id}>
                                    <Card sx={{ display: 'flex', position: 'relative', padding: 2, backgroundColor: 'white', marginBottom: 2 }}>
                                        <CardMedia
                                            component="img"
                                            image={Object.values(track.artwork)[1]} 
                                            alt="Track Artwork"
                                            sx={{ width: 100, height: 100, objectFit: 'cover', marginRight: 2 }}
                                        />

                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <ThemeProvider theme={theme}>
                                                <Typography variant="h6">{track.title}</Typography>
                                                <Typography variant="subtitle1">{track.artist_name}</Typography>
                                                <Typography variant="body1">Genre: {track.genre}</Typography>
                                                <Typography variant="body1">Mood: {track.mood}</Typography>
                                            </ThemeProvider>
                                        </CardContent>

                                        {/* Favorite button inside each track */}
                                        <IconButton
                                            onClick={() => toggleFavorite(track.id)}
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                color: favorites.includes(track.id) ? 'red' : 'gray'
                                            }}
                                        >
                                            {favorites.includes(track.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                        </IconButton>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography>No trending tracks available.</Typography>
                        )}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default TrendingTracks;
