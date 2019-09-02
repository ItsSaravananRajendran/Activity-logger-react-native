import realm from '../../data/activities-schema';
import shortid from 'shortid';

function persistRowHiddenState(isRowHidden) {
  realm.write(() => {
    const currentRowHiddenState = realm.objects('HiddenRowState');
    if (currentRowHiddenState.length === 0) {
      realm.create('HiddenRowState', {HiddenRow: isRowHidden});
    } else {
      currentRowHiddenState.update('HiddenRow', isRowHidden);
    }
  });
}

function getHiddenRowState() {
  const isHidden = realm.objects('HiddenRowState');
  return isHidden.length === 0
    ? new Array(48).fill(false)
    : isHidden[0].HiddenRow;
}

function getScheduledActivities(startTime) {
  let endTime = new Date(startTime);
  endTime.setDate(startTime.getDate() + 7);
  let activities = realm
    .objects('CalendarActivity')
    .filtered('startTime >= $0 AND startTime < $1', startTime, endTime);
  return activities;
}

function insertScheduledActivities(activityTitle, arrayTime) {
  for (const time of arrayTime) {
    realm.write(() => {
      const overLappingEndTime = realm
        .objects('CalendarActivity')
        .filtered(
          'endTime>$0 AND startTime<$1',
          time.startTime,
          time.startTime,
        );
      const overLappingStartTime = realm
        .objects('CalendarActivity')
        .filtered('startTime<$0 AND endTime>$1', time.endTime, time.endTime);
      const breakIntoTwo = realm
        .objects('CalendarActivity')
        .filtered(
          'startTime < $0 AND endTime > $1',
          time.startTime,
          time.endTime,
        );
      const sameTime = realm
        .objects('CalendarActivity')
        .filtered('startTime=$0 AND endTime=$1', time.startTime, time.endTime);
      if (sameTime.length !== 0) {
        sameTime.update('name', activityTitle);
      } else {
        if (breakIntoTwo.length !== 0) {
          const secondHalf = {...breakIntoTwo[0]};
          breakIntoTwo.update('endTime', time.startTime);
          secondHalf.id = shortid.generate();
          secondHalf.startTime = time.endTime;
          realm.create('CalendarActivity', secondHalf);
        } else if (overLappingEndTime.length !== 0) {
          overLappingEndTime.update('endTime', time.startTime);
        } else if (overLappingStartTime.length !== 0) {
          overLappingStartTime.update('startTime', time.endTime);
        }
        realm.create('CalendarActivity', {
          name: activityTitle,
          id: shortid.generate(),
          startTime: time.startTime,
          endTime: time.endTime,
        });
      }
    });
  }
}

export {
  persistRowHiddenState,
  getHiddenRowState,
  getScheduledActivities,
  insertScheduledActivities,
};
