const $loginForm = document.querySelector('#loginForm');

const validationLoginInfo = (info) => {
    return info.trim() !== '';
}

const showErrorMessage = ($target, message) => {
    $target.innerHTML = message;
}

const login = async (id, pw) => {
    const res = await fetch("/login", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, pw }),
    });

    if (res.status === 200) {
        return true;
    }
    return false;

}

$loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('input[name=id]').value;
    const pw = document.querySelector('input[name=pw]').value;
    if (validationLoginInfo(id) && validationLoginInfo(pw)) {
        if (login(id, pw)) {
            location.href = '/';
        } else {
            alert('SERVER ERROR');
        }
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