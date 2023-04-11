// grab elements from HTML
const $img = document.querySelector('.img-up');
const $urlBox = document.querySelector('#url-box');
const $form = document.querySelector('form');
const $ul = document.querySelector('ul');

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
document.addEventListener('DOMContentLoaded', function (e) {
  for (let i = 0; i < data.entries.length; i++) {
    const $li = document.createElement('li');
    $li.appendChild(renderEntry(data.entries[i]));
    $ul.appendChild($li);
  }
});
