// grab elements from HTML
const $img = document.querySelector('.img-up');
const $urlBox = document.querySelector('#url-box');
const $form = document.querySelector('form');
const $ul = document.querySelector('ul');
const $dvEntries = document.querySelector('[data-view="entries"]');
const $dvEntryForm = document.querySelector('[data-view="entry-form"]');
const $goEntries = document.querySelector('.go-entries');
const $newBtn = document.querySelector('.new-btn');

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
  $form.reset();
  const $li = document.createElement('li');
  $li.appendChild(renderEntry(data.entries[0]));
  $ul.prepend($li);
  toggleNoEntries();
});

// render entries
function renderEntry(entry) {
  // made first row
  const row1 = document.createElement('div');
  row1.className = 'row';

  // div to house image
  const pictureDiv = document.createElement('div');
  pictureDiv.className = 'column-half';
  const imgDiv = document.createElement('img');
  imgDiv.className = 'img-up';

  // div to house title, and notes
  const infoDiv = document.createElement('div');
  infoDiv.className = 'column-half';
  const titleDiv = document.createElement('div');
  titleDiv.className = 'label-head li-head';
  const notesDiv = document.createElement('div');
  notesDiv.className = 'notesText notes-text';

  // give value to each element
  imgDiv.setAttribute('src', entry.imgUrl);
  titleDiv.textContent = entry.title;
  notesDiv.textContent = entry.notes;

  row1.appendChild(pictureDiv);
  pictureDiv.appendChild(imgDiv);
  row1.appendChild(infoDiv);
  infoDiv.appendChild(titleDiv);
  infoDiv.appendChild(notesDiv);

  return row1;
}

// append all old entries in
document.addEventListener('DOMContentLoaded', function (e) {
  for (let i = 0; i < data.entries.length; i++) {
    const $li = document.createElement('li');
    $li.appendChild(renderEntry(data.entries[i]));
    $ul.appendChild($li);
  }
  if (data.view === 'entries') {
    viewSwap('entries');
    toggleNoEntries();
  }
});

// add text if no entries are present
function toggleNoEntries() {
  if (data.entries.length === 0) {
    const noEntries = document.createElement('div');
    noEntries.textContent = 'No entries have been recorded';
    noEntries.className = 'no-entries';
    const $li = document.createElement('li');
    $li.appendChild(noEntries);
    $ul.appendChild($li);
  }
  if (data.entries.length !== 0) {
    const noEntries = document.querySelector('.no-entries');
    noEntries.remove();
  }
}

// swaps views
function viewSwap(view) {
  if (view === $dvEntryForm.dataset.view) {
    $dvEntryForm.className = 'not-hidden';
    $dvEntries.className = 'hidden';
  }
  if (view === $dvEntries.dataset.view) {
    $dvEntries.className = 'not-hidden';
    $dvEntryForm.className = 'hidden';
  }
}

// press buttons to switch views
$goEntries.addEventListener('click', function (e) {
  viewSwap('entries');
  data.view = 'entries';
});
$newBtn.addEventListener('click', function (e) {
  viewSwap('entry-form');
  data.view = 'entry-form';
});
