

function ifCondition(parameter1, operator, parameter2, options) {
  switch (operator) {
    case '&&':
      return parameter1 && parameter2 ? options.fn(this) : options.inverse(this)
  }
}


exports = module.exports = {
  extname: ".hbs",
  layoutsDir: process.cwd() + "/views/layouts",
  defaultLayout: "main",
  partialDir: "views/partials",
  helpers: {
    ifCond: ifCondition
  }
}