/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// turn entries into JSON data
window.addEventListener('beforeunload', function (e) {
  const jsonString = JSON.stringify(data);
  this.localStorage.setItem('entry-data', jsonString);
});

// parse data back in
const previousJson = localStorage.getItem('entry-data');
if (previousJson !== null) {
  data = JSON.parse(previousJson);
}
