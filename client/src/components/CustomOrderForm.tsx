import React, { useState } from 'react';
import { submitCustomKit } from '../services/api';
import { makeStyles } from 'tss-react/mui';
import { Typography, TextField, Button } from '@mui/material';

const useStyles = makeStyles()(() => ({
  form: { padding: '20px', background: 'rgba(255, 87, 34, 0.1)', border: '2px dashed #FF5722', borderRadius: '10px', margin: '20px 0', animation: 'pulse 2s infinite' },
  '@keyframes pulse': { '0%': { boxShadow: '0 0 0 0 rgba(255, 87, 34, 0.7)' }, '70%': { boxShadow: '0 0 0 10px rgba(255, 87, 34, 0)' }, '100%': { boxShadow: '0 0 0 0 rgba(255, 87, 34, 0)' } },
  input: { margin: '10px 0', '& input': { background: '#2D2D2D', color: '#FFF', border: '1px solid #FF5722', '&:focus': { borderColor: '#E64A19', boxShadow: '0 0 5px #E64A19' } } },
  button: { background: '#FF5722', color: '#FFF', padding: '12px 20px', borderRadius: '5px', width: '100%', fontSize: '1rem', '&:hover': { background: '#E64A19', transform: 'scale(1.05)' } },
  response: { color: '#FFF', marginTop: '10px', fontStyle: 'italic' },
}));

const CustomOrderForm = () => {
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState('');
  const [response, setResponse] = useState('');
  const { classes } = useStyles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCustomKit({ name, preferences })
      .then(res => setResponse(res.message))
      .catch(err => setResponse('Error - deal went south!'));
  };

  return (
    <div className={classes.form}>
      <Typography variant="h6">Request a Custom Kit (Shady Deals!)</Typography>
      <form onSubmit={handleSubmit}>
        <TextField variant="outlined" className={classes.input} placeholder="Your Name (Alias Optional)" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField variant="outlined" className={classes.input} placeholder="Part Preferences (Go Wild!)" fullWidth value={preferences} onChange={(e) => setPreferences(e.target.value)} />
        <Button type="submit" className={classes.button}>Submit (Risky Move!)</Button>
      </form>
      {response && <Typography className={classes.response}>{response}</Typography>}
    </div>
  );
};

export default CustomOrderForm;