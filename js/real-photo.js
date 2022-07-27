const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];
const imgPreview = document.querySelector('.img-upload__preview img');
const fileChooser = document.querySelector('.img-upload__input');
const effectPreviewPics = document.querySelectorAll('.effects__preview');
fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const previewPicURL = URL.createObjectURL(file);
    imgPreview.src = previewPicURL;
    effectPreviewPics.forEach((e) => {
      e.style.backgroundImage = `url(${previewPicURL})`;
    });
  }
});
