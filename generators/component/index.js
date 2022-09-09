const Generator = require('yeoman-generator');

// Name conversion functions.
const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (m) => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase());
};

const toKebabCase = (str) => {
  return str.toLowerCase().replace(/\s/g, '-');
};

const toPascalCase = (str) => {
  return str.replace(/\w\S*/g, (m) => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase()).replace(/\s/g, '');
};

// Start generator.
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name of component:',
        validate: (input) => {
          if (!input.match(/^[a-zA-Z0-9 ]+$/)) {
            return 'Invalid tag name given. Accepts alphanumeric characters and spaces only.';
          }
          return true;
        },
      },
    ]);

    let componentLabel = toTitleCase(answers.name);
    let componentKebabName = toKebabCase(answers.name);
    let componentPascalName = toPascalCase(answers.name);

    this.log('Component Name', componentLabel, 'has been created.');
  }
};
