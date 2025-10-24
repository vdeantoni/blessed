import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/introduction',
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/migration-from-blessed',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/architecture',
        'concepts/runtime-system',
        'concepts/widgets',
        'concepts/rendering',
        'concepts/events',
      ],
    },
    {
      type: 'category',
      label: 'Platform Guides',
      items: [
        'platforms/nodejs',
        'platforms/browser',
        'platforms/differences',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/generated/widgets.screen.Class.Screen',
        'api/generated/lib.program.Class.Program',
        {
          type: 'category',
          label: 'Widgets',
          items: [
            'api/generated/widgets.box.Class.Box',
            'api/generated/widgets.list.Class.List',
            'api/generated/widgets.table.Class.Table',
            'api/generated/widgets.form.Class.Form',
            'api/generated/widgets.textbox.Class.Textbox',
            'api/generated/widgets.button.Class.Button',
            'api/generated/widgets.progressbar.Class.ProgressBar',
            'api/generated/widgets.bigtext.Class.BigText',
            'api/generated/widgets.log.Class.Log',
          ],
        },
        'api/generated/runtime',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'advanced/custom-widgets',
        'advanced/performance',
        'advanced/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/index',
        {
          type: 'category',
          label: 'Getting Started',
          items: [
            'examples/getting-started/simple-box',
            'examples/getting-started/interactive-list',
            'examples/getting-started/dashboard',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
