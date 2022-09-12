# generator-sb-drupal

This package provides a Yeoman generator for Twig-based Storybook components to be used within projects based on the [mel-miller/sb-drupal](https://github.com/mel-miller/sb-drupal) approach to creating a Drupal/Twig Storybook instance.

## Install

Install [Yeoman](https://yeoman.io/) globally.

```
npm install -g yo
```

Install this generator as a dev dependency to your project.

```
npm install -D generator-sb-drupal
```

## Usage

This generator should be run from the root of your project.

```
yo sb-drupal:component
```

Follow the prompts and a new directory will be created within the proper category directory in `src`. The new directory will contain the following starter files:

- `{component-name}.stories.js`
- `{component-name}.twig`
- `_{component-name}.scss`
- `{component-name}.docs.mdx`
- `{component-name}.behaviors.js` (if selected)
