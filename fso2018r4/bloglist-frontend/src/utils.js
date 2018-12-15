export const parseError = (e) => (e.response && e.response.data && e.response.data.error) || 'oopsie woopsie';

const notificationStyle = ({
  border: '2px solid',
  boxSizing: 'border-box',
  padding: '16px',
});

export const errorStyle = ({
  ...notificationStyle,
  borderColor: 'red'
});

export const infoStyle =  ({
  ...notificationStyle,
  borderColor: 'green'
});
