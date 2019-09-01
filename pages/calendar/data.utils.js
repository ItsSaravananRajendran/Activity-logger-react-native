import realm from '../../data/activities-schema';

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

export {persistRowHiddenState, getHiddenRowState};
