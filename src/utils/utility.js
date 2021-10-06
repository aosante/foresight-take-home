const randomColor = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getInitials = (firstName, lastName) =>
  `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;

const formatDate = (date) => {
  const dateToFormat = new Date(date);
  const day = dateToFormat.getDate();
  const month = dateToFormat.toLocaleString('default', { month: 'long' });
  const year = dateToFormat.getFullYear();
  const time = dateToFormat.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return `${day} ${month} ${year} at ${time}`;
};

export { formatDate, getInitials, randomColor };
