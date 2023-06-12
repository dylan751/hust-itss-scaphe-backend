import { format } from 'date-fns';
import { OpenHourInterface } from '../interfaces/openHour';

export const checkShopOpenHour = (
  weekDay: string,
  time: string,
  openHours: OpenHourInterface[],
): boolean => {
  const matchedOpenHour = openHours.find(
    (openHour) => openHour.day === parseInt(weekDay),
  );
  if (!matchedOpenHour) {
    console.log('Cant found any open hour that match');
    return false;
  }

  // formattedOpenTime: 2 12/06/2023 12:30:00 PM
  const formattedOpenTime = format(
    matchedOpenHour.openTime,
    'e dd/LL/yyyy HH:mm:ss b',
  );
  const formattedCloseTime = format(
    matchedOpenHour.closeTime,
    'e dd/LL/yyyy HH:mm:ss b',
  );

  // openTime: 12:30:00
  const [openWeekDay, openDate, openTime, openType] =
    formattedOpenTime.split(' ');
  const [closeWeekDay, closeDate, closeTime, closeType] =
    formattedCloseTime.split(' ');

  /**
   * openHour: 12
   * openMinute: 30
   * openSecond: 00
   */
  const [timeHour, timeMinute, timeSecond] = time.split(':');
  const [openHour, openMinute, openSecond] = openTime.split(':');
  const [closeHour, closeMinute, closeSecond] = closeTime.split(':');

  // Check if the time is between openTime and closeTime on that specific weekDay
  if (timeHour > openHour && timeHour < closeHour) {
    return true;
  } else if (timeHour === openHour) {
    if (timeMinute > openMinute) {
      return true;
    } else if (timeMinute === openMinute) {
      if (timeSecond >= openSecond) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else if (timeHour === closeHour) {
    if (timeMinute < closeMinute) {
      return true;
    } else if (timeMinute === closeMinute) {
      if (timeSecond <= closeSecond) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return false;
};
