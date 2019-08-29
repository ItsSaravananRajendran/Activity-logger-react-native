function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTimeWithInterval(interval = 30) {
  function padTime(time) {
    if (time < 10) {
      return '0' + time;
    }
    return String(time);
  }

  let limit = Math.floor((24 * 60) / interval);
  let result = [];
  let start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let I = 0; I < limit; I++) {
    result.push(padTime(start.getHours()) + ':' + padTime(start.getMinutes()));
    start.setMinutes(start.getMinutes() + 30);
  }
  return result;
}

function getDayHeader(startTime) {
  startTime = new Date(startTime);
  let Day_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let result = new Array(7);
  for (let I = 0; I < 7; I++) {
    result[I] =
      String(startTime.getDate()) +
      '-' +
      String(startTime.getMonth() + 1) +
      '  ' +
      Day_of_week[startTime.getDay()];
    startTime.setDate(startTime.getDate() + 1);
  }
  return result;
}

function queryObjToArray(queriesObj, weekStart, interval = 30) {
  let data = new Array((60 * 24 * 7) / interval).fill(' ');
  for (let activity of queriesObj) {
    let startIdx = Math.floor((activity.startTime - weekStart) / interval);
    let endIdx = Math.floor((activity.endTime - weekStart) / interval);
    while (startIdx < endIdx) {
      data[startIdx] = activity.name;
      startIdx++;
    }
  }
  return data;
}

export {
  capitalizeFirstLetter,
  getTimeWithInterval,
  queryObjToArray,
  getDayHeader,
};
