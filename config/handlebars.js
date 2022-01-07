const mongoose = require("mongoose")


function ifCond(parameter1, operator, parameter2, options) {
  switch (operator) {
    case '&&':
      return parameter1 && parameter2 ? options.fn(this) : options.inverse(this)
  }
}


// add a helper for showing default option
// if selectOption is same as currentOption, that means currentOption is selected by user
function displayDefaultOption(selectedOption, currentOption) {

  selectedOption = selectedOption instanceof mongoose.Types.ObjectId ?
    selectedOption.toString() :
    selectedOption

  
  currentOption = currentOption instanceof mongoose.Types.ObjectId ?
    currentOption.toString() :
    currentOption

  return selectedOption === currentOption ? 'selected' : ''
}



exports = module.exports = {
  extname: ".hbs",
  layoutsDir: process.cwd() + "/views/layouts",
  defaultLayout: "main",
  partialDir: "views/partials",
  helpers: {
    ifCond,
    displayDefaultOption
  }
}