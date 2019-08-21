import Realm from 'realm';

const Activity = {
  name: 'Activity',
  properties: {
    name: 'string',
    type: 'string',
    goalTime: 'float',
  },
};

const ActivityLog = {
  name: 'ActivityLog',
  properties: {
    name: 'string',
    type: 'string',
    startTime: 'date',
    endTime: 'date',
    duration: 'int',
  },
};

const CurrentActivity = {
  name: 'CurrentActivity',
  properties: {
    name: 'string',
    type: 'string',
    startTime: 'date',
  },
};

export default new Realm({schema: [Activity, ActivityLog, CurrentActivity]});
