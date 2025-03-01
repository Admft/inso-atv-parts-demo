import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import { makeStyles } from 'tss-react/mui';
import { AppBar, Toolbar, Typography } from '@mui/material';

const useStyles = makeStyles()(() => ({
  nav: { background: '#000', padding: '15px' },
  logo: { color: '#D32F2F', fontSize: '2rem', fontFamily: "'Oswald', sans-serif" },
  link: { color: '#FFF', margin: '0 15px', textDecoration: 'none', fontSize: '1.1rem' },
  footer: { background: '#000', color: '#FFF', padding: '20px', textAlign: 'center' },
}));

function App() {
  const { classes } = useStyles();
  return (
    <CartProvider>
      <Router>
        <AppBar position="static" className={classes.nav}>
          <Toolbar>
            <Typography className={classes.logo}>Inso ATV Parts</Typography>
            <div>
              <Link className={classes.link} to="/">Home</Link>
              <Link className={classes.link} to="/cart">Cart</Link>
              <Link className={classes.link} to="/admin">Admin</Link>
            </div>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <footer className={classes.footer}>
          <Typography variant="body2">© 2025 Inso ATV Parts - All rights reserved.</Typography>
          <Typography variant="body2">Contact: info@insoatvparts.com | Follow us!</Typography>
        </footer>
      </Router>
    </CartProvider>
  );
}

export default App;