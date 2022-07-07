const $emailInput = document.querySelector('#email');
const $pwInput = document.querySelector('#pw');
const $birthInput = document.querySelector('#birth');
const $nicknameInput = document.querySelector('#nickname');

const $validateEmailBtn = document.querySelector('#verifyEmail');
const $completeSignupBtn = document.querySelector('#completeSignup');

const $userInfoContainer = document.querySelector('.user-info-container');

const $emailErrorEl = document.querySelector('#emailErrorMessage');
const $pwErrorEl = document.querySelector('#pwErrorMessage');
const $birthErrorEl = document.querySelector('#birthErrorMessage');

const validateEmail = (email) => {
  const pattern = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
  console.log('email v: ',pattern.test(email));
  return pattern.test(email);
}

const validatePw = (pw) => {
  // 대문자, 소문자
  // 대문자, 숫자
  // 대문자, 특수문자
  // 소문자, 숫자
  // 소문자, 특수문자
  // 숫자, 특수문자
  // + 그리고 10자 이상
  const pwRegs = [
    /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]{10,}/,
    /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{10,}/,
    /^(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Z$@$!%*?&]{10,}/,
    /^(?=.*[a-z])(?=.*\d)[a-z\d]{10,}/,
    /^(?=.*[a-z])(?=.*[$@$!%*?&])[a-z$@$!%*?&]{10,}/,
    /^(?=.*\d)(?=.*[$@$!%*?&])[\d$@$!%*?&]{10,}/,
  ]
  const pwContinousNumberReg = /012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210|(\d)\1{2}/;

  const res = pwRegs.some(reg => reg.test(pw));
  console.log(res && !pwContinousNumberReg.test(pw));
  return res && !pwContinousNumberReg.test(pw);
}

const showErrorMessage = ($target, message) => {
  $target.innerHTML = message;
}

const showUserInfoInput = () => {
  $userInfoContainer.style.display = 'block';
}

$validateEmailBtn.addEventListener('click', () => {
  if (validateEmail($emailInput.value)) {
    showUserInfoInput();
    showErrorMessage($emailErrorEl, '')
  } else {
    showErrorMessage($emailErrorEl, '올바른 이메일을 입력해주세요.')
  }
})

$pwInput.addEventListener('input', function() {
  if (validatePw(this.value)) {
    showErrorMessage($pwErrorEl, '');
  } else {
    showErrorMessage($pwErrorEl, '10자 이상 영어 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야 합니다.')
  }
})

const validateBirth = (birth) => {
  const now = new Date();
  const [year, month, day] = birth.split('.').map(num => parseInt(num));
  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (year > now.getFullYear() || year < now.getFullYear() - 200) {
    return false;
  }
  if (month > 12 || month === 0) {
    return false;
  }
  if (day > days[month-1] || day === 0) {
    return false;
  }
  return true
}

const setDot = (target) => {
  target.value = target.value
                .replace(/[^0-9]/g, '')
                .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1.$2.$3")
                .replace(/(\.{1,2})$/g, "");
  
  if (target.value.length === 10 && !validateBirth(target.value)) {
    showErrorMessage($birthErrorEl, '올바른 생년월일을 입력해주세요');
  } else {
    showErrorMessage($birthErrorEl, '');
  }
}

$birthInput.addEventListener('input', (e) => setDot(e.target))

const completeSignup = () => {
  if (validateEmail($emailInput.value) && validatePw($pwInput.value) && validateBirth($birthInput.value) && $nicknameInput.value.trim()) {
    location.href = '/login';
  }
}

$completeSignupBtn.addEventListener('click', completeSignup)