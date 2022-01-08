// categoryForm is form element on index
// categoryList is select input control on categoryForm
// deleteForm is a form for each record (the form including delete button)

const categoryForm = document.querySelector('#category-form')
const categoryList = document.querySelector('#category-list')
const deleteForms = document.querySelectorAll('.delete-form')


// when category select element is changed, then submit categoryForm 
function onCategoryListChanged(event) {
  categoryForm.submit()
}




// add sumbit event to each form (button) for deleting
// when occuring submit event, it just showing another alert model 
// to remind user to make sure that each user really want to delete
deleteForms.forEach(deleteForm =>
  deleteForm.addEventListener('submit', (event) => {

    event.preventDefault()
    event.stopPropagation()

    const expenseName = deleteForm.dataset.name

    // fire a event to swal for showing alert model
    Swal.fire({
      title: `確定移除${expenseName}嗎？`,
      showDenyButton: true,
      confirmButtonText: '確定移除',
      denyButtonText: '取消移除',
    }).then((result) => {

      // If user click a button for confirming, it just send a request for deleting it
      if (result.isConfirmed) {
        Swal.fire('已移除', '', 'success')
        // send a data to /expenses/:id/delete via post method and redirect to /
        deleteForm.submit()

      } else if (result.isDenied) {
        // If user click a button for cancelling, it just cancel execution of deleting it
        Swal.fire('別擔心，我沒移除喔 :>', '', 'info')

      }
    })

  }))


// bind onCategoryListChanged to change event of category select element
categoryList.addEventListener('change', onCategoryListChanged)