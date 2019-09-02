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
    let startIdx = Math.floor(
      (activity.startTime - weekStart) / (interval * 60000),
    );
    let endIdx = Math.floor(
      (activity.endTime - weekStart) / (interval * 60000),
    );
    while (startIdx < endIdx) {
      data[startIdx] = activity.name;
      startIdx++;
    }
  }
  return data;
}

function slotToTime(time, index) {
  let timeStart = new Date(time);
  timeStart.setMinutes(timeStart.getMinutes() + index * 30);
  return timeStart;
}

function indicesToTimeSlot(weekStart, indices) {
  let timeSlot = [];
  let prev = indices[0];
  const time = {
    startTime: slotToTime(weekStart, indices[0]),
  };
  for (let I = 1; I < indices.length; I++) {
    if (prev !== indices[I] - 1) {
      time.endTime = slotToTime(weekStart, prev + 1);
      timeSlot.push({...time});
      time.startTime = slotToTime(weekStart, indices[I]);
    }
  }
  time.endTime = slotToTime(weekStart, indices[indices.length - 1] + 1);
  timeSlot.push({...time});
  return timeSlot;
}

function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export {
  capitalizeFirstLetter,
  getTimeWithInterval,
  queryObjToArray,
  getDayHeader,
  formatDate,
  indicesToTimeSlot,
};
