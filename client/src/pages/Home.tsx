import React, { useEffect, useState, useContext, useCallback } from 'react';
import { getParts } from '../services/api';
import { CartContext } from '../context/CartContext';
import { makeStyles } from 'tss-react/mui';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import CustomOrderForm from '../components/CustomOrderForm';

const useStyles = makeStyles()((theme) => ({
  hero: {
    background: 'url(https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9) center/cover no-repeat',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    textShadow: '4px 4px 8px #000',
    position: 'relative',
    overflow: 'hidden',
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    backgroundSize: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  heroText: {
    position: 'relative',
    zIndex: 2,
    fontFamily: "'Oswald', sans-serif",
    fontSize: '3.5rem',
    textTransform: 'uppercase',
    animation: 'fadeIn 2s ease-in',
    '-webkit-animation': 'fadeIn 2s ease-in',
    '-moz-animation': 'fadeIn 2s ease-in',
    '-o-animation': 'fadeIn 2s ease-in',
  },
  grid: {
    padding: '40px 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, minmax(450px, 1fr))', // Ensure 5 wide columns, minimum 450px each
    gap: '10px', // Tight gap for chunky layout
    '@media (max-width: 2400px)': {
      gridTemplateColumns: 'repeat(4, minmax(450px, 1fr))', // 4 columns on very large screens
    },
    '@media (max-width: 1800px)': {
      gridTemplateColumns: 'repeat(3, minmax(450px, 1fr))', // 3 columns on large screens
    },
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(2, minmax(450px, 1fr))', // 2 columns on medium screens
    },
    '@media (max-width: 600px)': {
      gridTemplateColumns: 'minmax(450px, 1fr)', // 1 column on mobile
    },
    '-webkit-box-sizing': 'border-box',
    '-moz-box-sizing': 'border-box',
    boxSizing: 'border-box',
  },
  card: {
    background: 'linear-gradient(135deg, #1A1A1A, #2D2D2D)',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    border: '2px solid #FF5722',
    height: 'auto', // Let height adjust naturally, but constrained
    maxHeight: '350px', // Increased max height to ensure button fits
    '-webkit-transition': 'transform 0.3s, box-shadow 0.3s',
    '-moz-transition': 'transform 0.3s, box-shadow 0.3s',
    '-o-transition': 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 24px rgba(255,87,34,0.5)',
      '-webkit-transform': 'scale(1.05)',
      '-moz-transform': 'scale(1.05)',
      '-o-transform': 'scale(1.05)',
    },
  },
  image: {
    width: '100%',
    height: '200px', // Perfect square (200x200px after padding)
    objectFit: 'cover', // Crop to create square, no distortion
    borderRadius: '8px 8px 0 0',
    filter: 'brightness(0.9) contrast(1.1)',
    transition: 'filter 0.3s',
    '-webkit-filter': 'brightness(0.9) contrast(1.1)',
    '-moz-filter': 'brightness(0.9) contrast(1.1)',
    '-o-filter': 'brightness(0.9) contrast(1.1)',
    '-webkit-transition': 'filter 0.3s',
    '-moz-transition': 'filter 0.3s',
    '-o-transition': 'filter 0.3s',
    '&:hover': {
      filter: 'brightness(1.2) contrast(1.2)',
      '-webkit-filter': 'brightness(1.2) contrast(1.2)',
      '-moz-filter': 'brightness(1.2) contrast(1.2)',
      '-o-filter': 'brightness(1.2) contrast(1.2)',
    },
  },
  cardContent: {
    color: '#FFF',
    padding: '6px', // Tight padding for compactness
    minHeight: '100px', // Increased min height to ensure button fits
    maxHeight: '150px', // Increased max height to show button fully
    overflow: 'visible', // Removed overflow: 'hidden' to show all content, including button
    '-webkit-box-sizing': 'border-box',
    '-moz-box-sizing': 'border-box',
    boxSizing: 'border-box',
  },
  name: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '1rem', // Compact font size
    color: '#FF5722',
    marginBottom: '4px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  description: {
    fontSize: '0.6rem', // Very small font for minimal vertical space
    color: '#B0B0B0',
    marginBottom: '4px',
    display: '-webkit-box',
    WebkitLineClamp: 1, // Limit to 1 line for maximum shortness
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    '-webkit-line-clamp': '1',
    '-moz-line-clamp': '1',
  },
  price: {
    fontSize: '0.9rem', // Compact font size
    color: '#FFF',
    marginBottom: '6px',
  },
  discount: {
    color: '#FF5722',
    fontWeight: 'bold',
  },
  button: {
    background: '#FF5722',
    color: '#FFF',
    padding: '6px 12px', // Tight padding for short button
    borderRadius: '5px',
    width: '100%',
    fontSize: '0.7rem', // Very small font for tight fit
    transition: 'background 0.3s, transform 0.2s',
    '-webkit-transition': 'background 0.3s, transform 0.2s',
    '-moz-transition': 'background 0.3s, transform 0.2s',
    '-o-transition': 'background 0.3s, transform 0.2s',
    '&:hover': {
      background: '#E64A19',
      transform: 'scale(1.05)',
      '-webkit-transform': 'scale(1.05)',
      '-moz-transform': 'scale(1.05)',
      '-o-transform': 'scale(1.05)',
    },
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '-webkit-keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '-moz-keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '-o-keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}));

const Home = () => {
  const [parts, setParts] = useState<any[]>([]);
  const { addToCart } = useContext(CartContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { classes } = useStyles();

  // Handle window resize dynamically
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const data = await getParts();
        console.log('Fetched parts:', data);
        setParts(data);
      } catch (error) {
        console.error('Failed to fetch parts:', error);
      }
    };
    fetchParts();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, [handleResize]);

  // Determine grid columns based on window width
  let columns = 5;
  if (windowWidth <= 600) columns = 1;
  else if (windowWidth <= 1200) columns = 2;
  else if (windowWidth <= 1800) columns = 3;
  else if (windowWidth <= 2400) columns = 4;

  return (
    <div>
      <div className={classes.hero}>
        <div className={classes.heroOverlay} />
        <Typography variant="h1" className={classes.heroText}>Unleash Your ATV Beast</Typography>
      </div>
      {parts.length === 0 ? (
        <Typography variant="h6" style={{ padding: '20px', textAlign: 'center' }}>Loading parts... (or check console for errors)</Typography>
      ) : (
        <Grid container spacing={3} className={classes.grid} style={{ gridTemplateColumns: `repeat(${columns}, minmax(450px, 1fr))` }}>
          {parts.map((part) => (
            <Grid item key={part._id}>
              <Card className={classes.card}>
                <CardMedia component="img" image={part.imageUrl} alt={part.name} className={classes.image} />
                <CardContent className={classes.cardContent}>
                  <Typography className={classes.name}>{part.name}</Typography>
                  <Typography className={classes.description}>{part.description}</Typography>
                  <Typography className={classes.price}>${part.price} <span className={classes.discount}>-15% OFF</span></Typography>
                  <Button className={classes.button} onClick={() => addToCart(part)}>Add to Cart</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <CustomOrderForm />
    </div>
  );
};

export default Home;