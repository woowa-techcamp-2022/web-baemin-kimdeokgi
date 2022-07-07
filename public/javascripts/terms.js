const $termAll = document.querySelector('#termAll');
const $nextBtn = document.querySelector('#next');

const validationTerms = () => {
  const term_agree_count = [1,2,3].filter(idx => document.querySelector(`#term${idx}`).checked).length;
  return term_agree_count === 3;
}

const toggleAllterms = () => {
  const terms = document.querySelectorAll('input[name=term]');
  terms.forEach(term => term.checked = $termAll.checked);
}

const $termsForm = document.querySelector('#termsForm');

$termsForm.addEventListener('change', e => {
  const $el = e.target
  if ($el.name === 'term') {
    if (!$el.checked) {
      $termAll.checked = false;
    } else {
      const terms = document.querySelectorAll('input[name=term]');
      let term_agree_count = 0;
      terms.forEach(term => term.checked ? term_agree_count ++ : '')
      term_agree_count === terms.length ? $termAll.checked = true : '';
    }
  } else if ($el.name = 'termAll') {
    toggleAllterms()
  }
  $nextBtn.disabled = !validationTerms();
})

$nextBtn.addEventListener('click', () => {
  location.href = '/authPhone';
})