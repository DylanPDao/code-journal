/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (e) {
  const jsonString = JSON.stringify(data.entries);
  this.localStorage.setItem('entry-data', jsonString);
});
