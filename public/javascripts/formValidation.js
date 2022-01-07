const expenseForm = document.querySelector('#expense-form')
const expenseSubmitBtn = document.querySelector('#expense-submit-btn')

console.log(expenseForm)

function onExpenseFormSubmitted(event) {
  console.log('hi')
  if (!expenseForm.checkValidity()) {
    console.log('validity')
    event.preventDefault()
    event.stopPropagation()
  }
}

function onExpenseSubmitBtnClicked(event) {

  expenseForm.classList.add('was-validated')

}


expenseForm.addEventListener('submit', onExpenseFormSubmitted)
expenseSubmitBtn.addEventListener('click', onExpenseSubmitBtnClicked)


