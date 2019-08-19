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

export {Activity, ActivityLog};
