const categoryForm = document.querySelector('#category-form')
const categoryList = document.querySelector('#category-list')


function onCategoryListChanged(event) {
  categoryForm.submit()
}

categoryList.addEventListener('change', onCategoryListChanged)