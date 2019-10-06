import realm from '../../data/activities-schema';

function getLogActivities(startTime) {
  const endTime = new Date(startTime);
  endTime.setDate(startTime.getDate() + 1);
  endTime.setHours(0, 0, 0, 0);
  const logActivities = realm
    .objects('ActivityLog')
    .filtered('startTime >= $0 AND startTime < $1', startTime, endTime)
    .sorted('startTime');
  return logActivities;
}

function activityDuration({startTime, endTime}) {
  return Math.floor((endTime - startTime) / 60000);
}

function updateTime(id, endTime) {
  const start = new Date(endTime);
  start.setHours(0, 0, 0, 0);
  const activities = getLogActivities(start);
  const firstActivityIndex = activities.findIndex(item => item.id === id);
  const firstActivity = activities[firstActivityIndex];
  const secondActivity = activities[firstActivityIndex + 1];
  realm.write(() => {
    firstActivity.endTime = endTime;
    secondActivity.startTime = endTime;
    firstActivity.duration = activityDuration(firstActivity);
    secondActivity.duration = activityDuration(secondActivity);
  });
}

function updateName(id, name) {
  realm.write(() => {
    realm.create('ActivityLog', {id, name});
  });
}

export {getLogActivities, updateTime, updateName};
