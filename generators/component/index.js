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
    this.precheck = await this.prompt([
      {
        type: 'confirm',
        name: 'directoryCheck',
        message: 'Are you running this from the project root?',
      },
    ]);

    if (this.precheck.directoryCheck == false) {
      this.log('You are not in the right directory, please navigate to the project root and try again.');
    } else {
      this.answers = await this.prompt([
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
        {
          type: 'list',
          name: 'category',
          message: 'Choose the category for this component.',
          choices: ['Components', 'Foundations', 'Utilities', 'Recipes'],
          default: 'Components',
        },
      ]);

      if (this.answers.category === 'Components') {
        this.extras = await this.prompt([
          {
            type: 'confirm',
            name: 'js',
            message: 'Include a component .js file?',
            default: false,
          },
        ]);
      }
    }
  }

  writing() {
    if (this.precheck.directoryCheck == true) {
      const props = {
        tag: toKebabCase(this.answers.name),
        component: toPascalCase(this.answers.name),
        label: toTitleCase(this.answers.name),
        category: this.answers.category,
        categoryDir: this.answers.category.toLowerCase(),
        local: this.answers.category === 'Components' ? '' : '.local',
        includeJs: this.answers.category === 'Components' ? this.extras.js : null,
      };

      // File types needed for component.
      const extensions = ['stories.js', 'docs.mdx'];

      // Determine if 'twig' or 'local.twig' is needed.
      if (props.category === 'Components') {
        extensions.push('twig');
      } else {
        extensions.push('local.twig');
      }

      // Determine if 'scss' is needed.
      if (props.category !== 'Recipes') {
        extensions.push('scss');
      }

      // Determine if 'js' is needed.
      if (props.includeJs) {
        extensions.push('behaviors.js');
      }

      // Set destination directory.
      this.destinationRoot(`src/${props.categoryDir}/${props.tag}`);

      // Generate files for component.
      extensions.forEach((ext) => {
        if (ext == 'scss') {
          this.fs.copyTpl(this.templatePath(`_component.${ext}`), this.destinationPath(`_${props.tag}.${ext}`), props);
        } else {
          this.fs.copyTpl(this.templatePath(`component.${ext}`), this.destinationPath(`${props.tag}.${ext}`), props);
        }
      });

      this.log(props.label, 'has been created.');
    }
  }
};
