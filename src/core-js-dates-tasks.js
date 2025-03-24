/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

function dateToTimestamp(date) {
  const newDate = new Date(date);

  if (Number.isNaN(newDate.getTime())) {
    throw new Error('Time is not valid');
  }

  return newDate.getTime();
}

function getTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function getDayName(date) {
  const newDate = new Date(date);

  switch (newDate.getDay()) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
}

function getNextFriday(date) {
  const dayOfWeek = date.getDay();

  let daysUntilFriday;
  if (dayOfWeek === 5) {
    daysUntilFriday = 7;
  } else if (dayOfWeek < 5) {
    daysUntilFriday = 5 - dayOfWeek;
  } else {
    daysUntilFriday = 6;
  }

  const nextFriday = new Date(date);
  nextFriday.setDate(date.getDate() + daysUntilFriday);

  return nextFriday;
}

function getCountDaysInMonth(month, year) {
  const nextMonth = new Date(year, month, 1);
  const lastMonth = new Date(nextMonth - 1);
  return lastMonth.getDate();
}

function getCountDaysOnPeriod(dateStart, dateEnd) {
  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);

  const timeDifference = endDate - startDate;

  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return Math.floor(daysDifference) + 1;
}

function isDateInPeriod(date, period) {
  const checkDate = new Date(date);
  const startDate = new Date(period.start);
  const endDate = new Date(period.end);

  return checkDate >= startDate && checkDate <= endDate;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const d = new Date(date);
  const month = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();

  let hours = d.getUTCHours();
  const minutes = d.getUTCMinutes();
  const seconds = d.getUTCSeconds();

  const period = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours === 0 ? 12 : hours;

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  const formattedDate = `${month}/${day}/${year}, ${hours}:${formattedMinutes}:${formattedSeconds} ${period}`;
  return formattedDate;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  let count = 0;
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day += 1) {
    const currentDate = new Date(year, month - 1, day);
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      count += 1;
    }
  }

  return count;
}

/**
 * Returns the week number of the year for a given date.
 * The first week of the year is defined according to ISO8601.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(/* date */) {
  throw new Error('Not implemented');
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const currentDate = new Date(date);
  const b = true;
  currentDate.setDate(13);
  if (currentDate.getDay() === 5 && currentDate > date) {
    return currentDate;
  }

  currentDate.setMonth(currentDate.getMonth() + 1);
  currentDate.setDate(13);

  while (b) {
    if (currentDate.getDay() === 5) {
      return currentDate;
    }
    currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(13);
  }
  return null;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const month = date.getMonth();
  return Math.floor(month / 3) + 1;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const schedule = [];
  const [startDay, startMonth, startYear] = period.start.split('-').map(Number);
  const [endDay, endMonth, endYear] = period.end.split('-').map(Number);

  const startDate = new Date(startYear, startMonth - 1, startDay);
  const endDate = new Date(endYear, endMonth - 1, endDay);

  const currentDate = new Date(startDate);
  let cycleDay = 0;

  while (currentDate <= endDate) {
    if (cycleDay < countWorkDays) {
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      schedule.push(`${day}-${month}-${year}`);
    }

    currentDate.setDate(currentDate.getDate() + 1);
    cycleDay += 1;

    if (cycleDay >= countWorkDays + countOffDays) {
      cycleDay = 0;
    }
  }

  return schedule;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
