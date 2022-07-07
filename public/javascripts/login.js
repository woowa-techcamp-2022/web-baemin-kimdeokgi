const $loginForm = document.querySelector('#loginForm');


const validationLoginInfo = (info) => {
    return info.trim() !== '';
}

const showErrorMessage = ($target, message) => {
    $target.innerHTML = message;
}

$loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('input[name=id]').value;
    const pw = document.querySelector('input[name=pw]').value;
    if (validationLoginInfo(id) && validationLoginInfo(pw)) {
        console.log('로그인 성공');
        location.href = '/'
    } else {
        const $idErrorMessage = document.querySelector('#idErrorMessage');
        const $pwErrorMessage = document.querySelector('#pwErrorMessage');
        if (!validationLoginInfo(id)) {
            showErrorMessage($idErrorMessage, 'id 확인');
        } else {
            showErrorMessage($idErrorMessage, '');
        }

        if (!validationLoginInfo(pw)) {
            showErrorMessage($pwErrorMessage, 'pw 확인');
        } else {
            showErrorMessage($pwErrorMessage, '');
        }
    }
})