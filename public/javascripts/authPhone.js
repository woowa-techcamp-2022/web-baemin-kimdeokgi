const $phoneNumberInput = document.querySelector('input[name=phone]');
const $getAuthNumberBtn = document.querySelector('.get-auth-number');
const $authNumber = document.querySelector('input[name=authNumber]');

const toggleGetAuthNumberBtn = (status) => {
  $getAuthNumberBtn.disabled = !status;
}

const validationPhoneNumber = () => {
  const value = $phoneNumberInput.value;
  if (value.length === 13) {
    const $checkImg = document.querySelector('.check');
    $checkImg.style.filter = 'grayscale(0%)';
    toggleGetAuthNumberBtn(true);
    return true;
  } else {
    const $checkImg = document.querySelector('.check');
    $checkImg.style.filter = 'grayscale(100%)';
    toggleGetAuthNumberBtn(false);
    return false;
  }
}

const setHyphen = (target) => {
  target.value = target.value
                .replace(/[^0-9]/g, '')
                .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                .replace(/(\-{1,2})$/g, "");
  validationPhoneNumber()
}


$phoneNumberInput.addEventListener('input', (e) => setHyphen(e.target))

const deletePhoneNumber = () => {
  $phoneNumberInput.value = ''
  $phoneNumberInput.focus();
}

const $delete = document.querySelector('#delete');
$delete.addEventListener('click', deletePhoneNumber)


const setAuthNumber = (num) => {
  $authNumber.value = num;
}

const createAuthNumber = () => {
  let result = ''
  for (let i=0; i<4; i++) {
    result += Math.floor(Math.random(0,9)*10).toString();
  }
  return result;
}

const removeBtnGetAuthNumber = () => {
  $getAuthNumberBtn.style.display = 'none';
}

const showAuthNumber = () => {
  document.querySelector('#tmpAuthNumberTitle').style.display = 'block';
  document.querySelector('#tmpAuthWrapper').style.display = 'block';
}

const getAuthNumber = () => {
  setTimeout(() => {
    setAuthNumber(createAuthNumber())

  }, 2000);
  removeBtnGetAuthNumber();
  showAuthNumber();
}
$getAuthNumberBtn.addEventListener('click', getAuthNumber)

document.querySelector('#refetchAuthNumber').addEventListener('click', getAuthNumber)

const validationAuthNumber = () => {
  console.log($authNumber)
  return $authNumber.value.length === 4
}

const moveNext = () => {
  if (validationPhoneNumber() && validationAuthNumber()) {
    location.href = '/userInfo';
  }
}

const $nextBtn = document.querySelector('.next');
$nextBtn.addEventListener('click', moveNext)