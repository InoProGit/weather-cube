const getDayOfWeek = (time: number) => {
  const date = new Date(time * 1000);
  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
  const dayOfMonth = date.getDate();
  return dayOfWeek + ' ' + dayOfMonth;
}

export default getDayOfWeek;