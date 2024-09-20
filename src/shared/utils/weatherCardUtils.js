export const parsedInt = (number, radix = 10) => parseInt(number, radix);

export const parsedTime = (timeStamp, timeZone = 0) => {
  const time = new Date((timeStamp + timeZone) * 1000);

  return `${time.getUTCHours()}:${time.getMinutes()}:${time.getSeconds()}`;
};
