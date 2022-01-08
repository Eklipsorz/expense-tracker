// expenseForm is the form on creation page and on edit page
// expenseSubmitBtn is button for each form
const expenseForm = document.querySelector('#expense-form')
const expenseSubmitBtn = document.querySelector('#expense-submit-btn')

// when form is submitted, it then fire the following handler
function onExpenseFormSubmitted(event) {

  if (!expenseForm.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }
}

// form event handler and submitButton event handler
// when submitButton is clicked, it then fire the following handler
function onExpenseSubmitBtnClicked(event) {

  expenseForm.classList.add('was-validated')

}

// binding event handler
expenseForm.addEventListener('submit', onExpenseFormSubmitted)
expenseSubmitBtn.addEventListener('click', onExpenseSubmitBtnClicked)


