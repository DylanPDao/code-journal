// grab elements from HTML
const $img = document.querySelector('.img-up');
const $urlBox = document.querySelector('#url-box');
const $form = document.querySelector('form');

// updates picture when url link is entered
$urlBox.addEventListener('input', function (e) {
  const link = event.target.value;
  $img.setAttribute('src', link);
});

// Submit button function and reset
$form.addEventListener('submit', function (e) {
  event.preventDefault();
  const journalEntry = {};
  journalEntry.title = event.target.elements[0].value;
  journalEntry.imgUrl = event.target.elements[1].value;
  journalEntry.notes = event.target.elements[2].value;
  journalEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(journalEntry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  document.querySelector('form').reset();
});
