/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// turn entries into JSON data
window.addEventListener('beforeunload', function (e) {
  const jsonString = JSON.stringify(data.entries);
  this.localStorage.setItem('entry-data', jsonString);
});

// load entries back in
const previousJson = localStorage.getItem('entry-data');
if (previousJson !== null) {
  data.entries = JSON.parse(previousJson);
  data.nextEntryId = (data.entries[data.entries.length - 1].entryId) + 1;
}
