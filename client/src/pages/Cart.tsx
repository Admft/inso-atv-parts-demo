import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { makeStyles } from 'tss-react/mui';
import { Typography, Button, Paper } from '@mui/material';

const useStyles = makeStyles()(() => ({
  container: { padding: '40px', background: 'linear-gradient(135deg, #1A1A1A, #2D2D2D)', color: '#FFF', border: '2px solid #FF5722', borderRadius: '10px', boxShadow: '0 8px 16px rgba(255, 87, 34, 0.5)' },
  item: { display: 'flex', alignItems: 'center', padding: '15px', background: '#2D2D2D', marginBottom: '15px', borderRadius: '8px', border: '1px solid #FF5722' },
  image: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px', marginRight: '20px' },
  details: { flexGrow: 1 },
  name: { fontFamily: "'Oswald', sans-serif", fontSize: '1.2rem', color: '#FF5722' },
  price: { fontSize: '1rem', marginBottom: '10px' },
  total: { fontSize: '1.5rem', fontWeight: 'bold', marginTop: '20px' },
  financing: { color: '#B0B0B0', fontStyle: 'italic' },
  removeButton: { background: '#E64A19', color: '#FFF', padding: '8px 15px', borderRadius: '5px', '&:hover': { background: '#D32F2F' } },
}));

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4">Shopping Cart (Black Market Ready)</Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">No items yet—steal some deals from Home!</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Paper key={item._id} className={classes.item}>
              <img src={item.imageUrl} alt={item.name} className={classes.image} />
              <div className={classes.details}>
                <Typography className={classes.name}>{item.name}</Typography>
                <Typography className={classes.price}>Price: ${item.price}</Typography>
              </div>
              <Button className={classes.removeButton} onClick={() => removeFromCart(item._id)}>Remove (Covertly)</Button>
            </Paper>
          ))}
          <Typography className={classes.total}>Total: ${total.toFixed(2)}</Typography>
          <Typography className={classes.financing}>Financing: ${(total / 3).toFixed(2)}/month for 3 months (Shady Deal)</Typography>
        </>
      )}
    </div>
  );
};

export default Cart;