// grab elements from HTML
const $img = document.querySelector('.img-up');
const $urlBox = document.querySelector('#url-box');

// updates picture when url link is entered
$urlBox.addEventListener('input', function (e) {
  const link = $urlBox.value;
  $img.setAttribute('src', link);
});
