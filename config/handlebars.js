const mongoose = require("mongoose")

// add some logic operator to handlebars
function ifCond(parameter1, operator, parameter2, options) {

  switch (operator) {
    // and operator
    case '&&':
      return parameter1 && parameter2 ? options.fn(this) : options.inverse(this)
  }
}


// add a helper for showing default option
// if selectOption is same as currentOption, that means currentOption is selected by user
function displayDefaultOption(selectedOption, currentOption) {


  // check whether two parameters are mongoose.Types.ObjectId
  // if yes, then it is transfered to string
  selectedOption = selectedOption instanceof mongoose.Types.ObjectId ?
    selectedOption.toString() :
    selectedOption

  currentOption = currentOption instanceof mongoose.Types.ObjectId ?
    currentOption.toString() :
    currentOption

  return selectedOption === currentOption ? 'selected' : ''
}

const options = {
  // file extension name
  extname: ".hbs",
  // layout path
  layoutsDir: process.cwd() + "/views/layouts",
  // default layout for use
  defaultLayout: "main",
  // partial path
  partialDir: "views/partials",

  // helper registration
  helpers: {
    ifCond,
    displayDefaultOption
  }
}


exports = module.exports = options