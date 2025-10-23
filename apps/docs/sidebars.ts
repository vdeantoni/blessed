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
        'api/screen',
        'api/program',
        {
          type: 'category',
          label: 'Widgets',
          items: [
            'api/widgets/box',
            'api/widgets/list',
            'api/widgets/table',
            'api/widgets/form',
            'api/widgets/textbox',
            'api/widgets/button',
            'api/widgets/progressbar',
            'api/widgets/bigtext',
            'api/widgets/log',
          ],
        },
        'api/runtime',
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
