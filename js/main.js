// grab elements from HTML
const $img = document.querySelector('.img-up');
const $urlBox = document.querySelector('#url-box');
const $titles = document.querySelector('#title-box');
const $notes = document.querySelector('#notesbox');

// updates picture when url link is entered
$urlBox.addEventListener('input', function (e) {
  const link = $urlBox.value;
  $img.setAttribute('src', link);
});

// Submit button function and reset
document.addEventListener('submit', function (e) {
  const journalEntry = {};
  event.preventDefault();
  journalEntry.title = $titles.value;
  journalEntry.imgUrl = $urlBox.value;
  journalEntry.notes = $notes.value;
  journalEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(journalEntry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $titles.value = '';
  $urlBox.value = '';
  $notes.value = '';
});
