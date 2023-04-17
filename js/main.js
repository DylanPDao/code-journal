// grab elements from HTML
const $img = document.querySelector('.img-up');
const $urlBox = document.querySelector('#url-box');
const $form = document.querySelector('form');
const $ul = document.querySelector('ul');
const $dvEntries = document.querySelector('[data-view="entries"]');
const $dvEntryForm = document.querySelector('[data-view="entry-form"]');
const $goEntries = document.querySelector('.go-entries');
const $newBtn = document.querySelector('.new-btn');
const $noEntry = document.querySelector('.no-entries');
const $newEntry = document.querySelector('#new-entry-head');
const $delete = document.querySelector('.delete-btn');
const $modal = document.querySelector('.modal');
const $cancelBtn = document.querySelector('.cancel-btn');
const $confirmBtn = document.querySelector('.confirm-btn');
const $found = document.querySelector('.not-found');

// updates picture when url link is entered
$urlBox.addEventListener('input', function (e) {
  const link = event.target.value;
  $img.setAttribute('src', link);
});

// Submit button function and reset
$form.addEventListener('submit', function (e) {
  event.preventDefault();
  if (data.editing === null) {
    const journalEntry = {};
    journalEntry.title = event.target.elements[0].value;
    journalEntry.imgUrl = event.target.elements[1].value;
    journalEntry.notes = event.target.elements[2].value;
    journalEntry.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(journalEntry);
    $ul.prepend(renderEntry(journalEntry));
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
    $delete.className = 'delete-btn hidden';
    viewSwap('entries');
  } else {
    const journalEntry = {};
    journalEntry.title = $form.elements[0].value;
    journalEntry.imgUrl = $form.elements[1].value;
    journalEntry.notes = $form.elements[2].value;
    journalEntry.entryId = data.editing.entryId;
    data.entries.splice(data.entries.length - data.editing.entryId, 1, journalEntry);
    const $allLi = document.querySelectorAll('li');
    const $edit = renderEntry(journalEntry);
    for (let i = 0; i < $allLi.length; i++) {
      if (data.editing.entryId === Number($allLi[i].getAttribute('data-entry-id'))) {
        $allLi[i].replaceWith($edit);
      }
    }
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
    $delete.className = 'delete-btn hidden';
    $newEntry.textContent = 'New Entry';
    $delete.classList.add('hidden');
    data.editing = null;
    viewSwap('entries');
  }
});

// render entries
function renderEntry(entry) {
  // made first row
  const $row1 = document.createElement('div');
  $row1.className = 'row';

  // div to house image
  const $pictureDiv = document.createElement('div');
  $pictureDiv.className = 'column-half';
  const $imgDiv = document.createElement('img');
  $imgDiv.className = 'img-up';

  // div to house title, and notes
  const $infoDiv = document.createElement('div');
  $infoDiv.className = 'column-half';
  const $entryNumber = document.createElement('div');
  $entryNumber.className = 'label-head entry-number';
  const $row2 = document.createElement('div');
  $row2.className = 'row entries-row';
  const $titleDiv = document.createElement('div');
  $titleDiv.className = 'label-head li-head';
  const $icon = document.createElement('i');
  $icon.className = 'fa fa-pencil';
  $icon.setAttribute('aria-hidden', true);
  const $notesDiv = document.createElement('div');
  $notesDiv.className = 'notesText notes-text';

  // give value to each element
  $imgDiv.setAttribute('src', entry.imgUrl);
  $titleDiv.textContent = entry.title;
  $notesDiv.textContent = entry.notes;
  $entryNumber.textContent = 'Entry Number: ' + entry.entryId;

  // append
  $row1.appendChild($pictureDiv);
  $pictureDiv.appendChild($imgDiv);

  $row1.appendChild($infoDiv);
  $infoDiv.appendChild($entryNumber);
  $infoDiv.appendChild($row2);
  $row2.appendChild($titleDiv);
  $row2.appendChild($icon);
  $infoDiv.appendChild($notesDiv);

  const $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);
  $li.appendChild($row1);
  return $li;
}

// append all old entries in
document.addEventListener('DOMContentLoaded', function (e) {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
});

// add text if no entries are present
function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntry.className = 'no-entries hidden';
  } else {
    $noEntry.className = 'no-entries';
  }
}

// swaps views
function viewSwap(view) {
  if (view === $dvEntryForm.dataset.view) {
    $dvEntryForm.className = 'not-hidden';
    $dvEntries.className = 'hidden';
    data.view = 'entry-form';
  }
  if (view === $dvEntries.dataset.view) {
    $dvEntries.className = 'not-hidden';
    $dvEntryForm.className = 'hidden';
    data.view = 'entries';
    toggleNoEntries();
  }
}

// press buttons to switch views
$goEntries.addEventListener('click', function (e) {
  viewSwap('entries');
});

$newBtn.addEventListener('click', function (e) {
  viewSwap('entry-form');
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $delete.className = 'delete-btn hidden';
  data.editing = null;
});

$ul.addEventListener('click', function (e) {
  if (e.target.className !== 'fa fa-pencil') {
    return;
  }
  const target = event.target.closest('[data-entry-id]').dataset.entryId;
  for (let i = 0; i < data.entries.length; i++) {
    if (target === (data.entries[i].entryId).toString()) {
      data.editing = data.entries[i];
    }
  }
  $img.setAttribute('src', data.editing.imgUrl);
  $form.elements[0].value = data.editing.title;
  $form.elements[1].value = data.editing.imgUrl;
  $form.elements[2].value = data.editing.notes;
  $newEntry.textContent = 'Edit Entry';
  $delete.className = 'delete-btn';
  viewSwap('entry-form');
});

$delete.addEventListener('click', function (e) {
  e.preventDefault();
  $modal.classList.remove('hidden');
});

$cancelBtn.addEventListener('click', function (e) {
  e.preventDefault();
  $modal.classList.add('hidden');
});

$confirmBtn.addEventListener('click', function (e) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      data.entries.splice(i, 1);
    }
  }
  const $allLi = document.querySelectorAll('li');
  for (let i = 0; i < $allLi.length; i++) {
    if (data.editing.entryId === Number($allLi[i].getAttribute('data-entry-id'))) {
      $allLi[i].remove();
    }
  }
  toggleNoEntries();
  $modal.classList.add('hidden');
  data.editing = null;
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $delete.className = 'delete-btn hidden';
  viewSwap('entries');
});

// get searchbar to open when clicking the question mark switch
const $questionMark = document.querySelector('.fa-question-circle');
const $searchBar = document.querySelector('.search-bar');
$questionMark.addEventListener('click', function (e) {
  $questionMark.style.opacity = 0;
  $searchBar.style.opacity = 1;
  $searchBar.focus();
});
$searchBar.addEventListener('focusout', function (e) {
  $searchBar.style.opacity = 0;
  $questionMark.style.opacity = 1;
});

// make search bar work
$searchBar.addEventListener('search', function (e) {
  const $searchValue = $searchBar.value;
  const searchValueArr = [];
  const $allLi = document.querySelectorAll('li');
  // make searchbar work with partial text value
  if (isNaN($searchValue) === true) {
    for (let i = 0; i < data.entries.length; i++) {
      const $searchValueLower = $searchValue.toLowerCase();
      const titleLower = data.entries[i].title.toLowerCase();
      if (titleLower.includes($searchValueLower) === true) {
        searchValueArr.push(data.entries[i].entryId);
      }
    }
    for (let i = 0; i < $allLi.length; i++) {
      for (let j = 0; j < searchValueArr.length; j++) {
        if (searchValueArr[j] === Number($allLi[i].getAttribute(['data-entry-id']))) {
          $allLi[i].className = 'found';
        }
      }
    }
    for (let i = 0; i < $allLi.length; i++) {
      if ($allLi[i].classList.contains('found') !== true) {
        $allLi[i].classList.add('hidden');
      }
    }
  }
  // works with entry ID
  if (isNaN($searchValue) === false) {
    for (let i = 0; i < $allLi.length; i++) {
      if ($searchValue !== $allLi[i].getAttribute(['data-entry-id'])) {
        $allLi[i].className = 'hidden';
      } else {
        $allLi[i].className = 'found';
        $found.classList.add('hidden');
      }
    }
    // show none found if all li are hidden
    for (let i = 0; i < $allLi.length; i++) {
      if ($allLi[i].className.includes('hidden') === true) {
        $found.classList.remove('hidden');
      }
    }
    for (let i = 0; i < $allLi.length; i++) {
      // turn off none found if there is a found
      if ($allLi[i].className.includes('found') === true) {
        $found.classList.add('hidden');
      }
    }
    for (let i = 0; i < $allLi.length; i++) {
      if ($allLi[i].className.includes('found') === true) {
        $allLi[i].classList.remove('found');
      }
    }
  }
  $searchBar.value = '';
});
