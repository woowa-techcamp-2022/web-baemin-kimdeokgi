const $phoneNumberInput = document.querySelector('input[name=phone]');

const validationPhoneNumber = (value) => {
  if (value.length === 13) {
    const $checkImg = document.querySelector('.check');
    $checkImg.style.filter = 'grayscale(0%)';
  } else {
    const $checkImg = document.querySelector('.check');
    $checkImg.style.filter = 'grayscale(100%)';
  }
}

const setHyphen = (target) => {
  target.value = target.value
                .replace(/[^0-9]/g, '')
                .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                .replace(/(\-{1,2})$/g, "");
  validationPhoneNumber(target.value)
}


$phoneNumberInput.addEventListener('input', (e) => setHyphen(e.target))

const deletePhoneNumber = () => {
  $phoneNumberInput.value = ''
  $phoneNumberInput.focus();
}

const $delete = document.querySelector('#delete');
$delete.addEventListener('click', deletePhoneNumber)