import { makeStyles } from 'tss-react/mui';

export const useGlobalStyles = makeStyles()({
  '@global': {
    body: {
      backgroundColor: '#333',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      margin: 0,
    },
  },
});