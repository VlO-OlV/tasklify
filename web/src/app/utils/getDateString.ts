const getDateString = (date: Date) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayOfWeek = days[date.getDay()].slice(0, 3);
  const month = months[date.getMonth()].slice(0, 3);
  return `${dayOfWeek}, ${date.getDate()} ${month} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export default getDateString;