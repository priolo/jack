/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'quick-start',
    'drag-and-drop',
    'style',
    'list',
    'linked',
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Core Components',
          items: [
            'api/core/cards-group',
            'api/core/framework-card',
            'api/core/header',
            'api/core/zen-card',
            'api/core/tooltip',
          ],
        },
        {
          type: 'category',
          label: 'UI Components',
          items: [
            {
              type: 'category',
              label: 'Buttons',
              items: [
                'api/components/buttons/button',
                'api/components/buttons/icon-button',
                'api/components/buttons/float-button',
                'api/components/buttons/copy-button',
                'api/components/buttons/icon-toggle',
              ],
            },
            {
              type: 'category',
              label: 'Input Components',
              items: [
                'api/components/inputs/text-input',
                'api/components/inputs/number-input',
                'api/components/inputs/find-input',
                'api/components/inputs/markdown-editor',
                'api/components/inputs/datetime-input',
              ],
            },
            {
              type: 'category',
              label: 'Lists',
              items: [
                'api/components/lists/list',
                'api/components/lists/edit-list',
                'api/components/lists/list-objects',
                'api/components/lists/list-multi-with-filter',
              ],
            },
            {
              type: 'category',
              label: 'Dialogs',
              items: [
                'api/components/dialogs/dialog',
                'api/components/dialogs/alert-dialog',
                'api/components/dialogs/list-dialog',
                'api/components/dialogs/element-dialog',
              ],
            },
            {
              type: 'category',
              label: 'Layout & Format',
              items: [
                'api/components/layout/box',
                'api/components/layout/component',
                'api/components/layout/accordion',
                'api/components/layout/options',
                'api/components/layout/table',
              ],
            },
            {
              type: 'category',
              label: 'Cards & Rows',
              items: [
                'api/components/cards/snackbar',
                'api/components/rows/edit-string-row',
                'api/components/rows/edit-number-row',
                'api/components/rows/edit-item-row',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Stores & State Management',
          items: [
            'api/stores/view-store',
            'api/stores/cards-store',
            'api/stores/docs-store',
            'api/stores/focus-store',
            'api/stores/mouse-store',
            'api/stores/links-store',
          ],
        },
        {
          type: 'category',
          label: 'Types & Interfaces',
          items: [
            'api/types/view-types',
            'api/types/card-types',
            'api/types/component-types',
            'api/types/enums',
          ],
        },
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

module.exports = sidebars;
