'use babel';

export default {
  editorOptions: {
    title: 'Editor options',
    type: 'object',
    order: 1,
    properties: {
      formatOnSave: {
        title: 'Format on Save',
        description: 'Format SQL files on save.',
        type: 'boolean',
        default: false,
        order: 1,
      },
      scopes: {
        title: 'Scopes',
        description: 'Grammar scopes to which format on save is applied.',
        type: 'array',
        default: ['source.sql'],
        items: {
          type: 'string',
        },
        order: 2,
      },
    },
  },
  pgFormatterOptions: {
    title: 'pg-formatter options',
    type: 'object',
    order: 2,
    properties: {
      anonymize: {
        title: 'Anonymize',
        description:
          'Obscure all literals in queries, useful to hide confidential data before formatting.',
        type: 'boolean',
        default: false,
        order: 1,
      },
      functionCase: {
        title: 'Function Case',
        description: 'Change the case of the function names.',
        type: 'string',
        enum: ['unchanged', 'lowercase', 'uppercase', 'capitalize'],
        default: 'unchanged',
        order: 2,
      },
      keywordCase: {
        title: 'Keyword Case',
        description: 'Change the case of the reserved keyword.',
        type: 'string',
        enum: ['unchanged', 'lowercase', 'uppercase', 'capitalize'],
        default: 'unchanged',
        order: 3,
      },
      spaces: {
        title: 'Spaces',
        description: 'Number of spaces to indent the code.',
        type: 'integer',
        default: 4,
        order: 4,
      },
      stripComments: {
        title: 'Strip Comments',
        description: 'Remove any comment from SQL code.',
        type: 'boolean',
        default: false,
        order: 5,
      },
      placeholder: {
        title: 'Placeholder',
        description: 'Regex to find code that must not be changed.',
        type: 'string',
        default: '',
        order: 6,
      },
    },
  },
};
