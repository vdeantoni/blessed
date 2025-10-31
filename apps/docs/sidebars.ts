import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        "getting-started/introduction",
        "getting-started/installation",
        "getting-started/quick-start",
        "getting-started/migration-from-blessed",
      ],
    },
    {
      type: "category",
      label: "Concepts",
      items: [
        "concepts/architecture",
        "concepts/runtime-system",
        "concepts/widgets",
        "concepts/rendering",
        "concepts/events",
      ],
    },
    {
      type: "category",
      label: "Platform Guides",
      items: ["platforms/nodejs", "platforms/browser", "platforms/differences"],
    },
    {
      type: "category",
      label: "API Reference",
      items: [
        "api/generated/widgets.screen.Class.Screen",
        "api/generated/lib.program.Class.Program",
        {
          type: "category",
          label: "Widgets",
          items: [
            {
              type: "category",
              label: "Base Widgets",
              items: [
                "api/generated/widgets.node.Class.Node",
                "api/generated/widgets.element.Class.Element",
              ],
            },
            {
              type: "category",
              label: "Containers",
              items: [
                "api/generated/widgets.box.Class.Box",
                "api/generated/widgets.layout.Class.Layout",
                "api/generated/widgets.scrollablebox.Class.ScrollableBox",
                "api/generated/widgets.scrollabletext.Class.ScrollableText",
              ],
            },
            {
              type: "category",
              label: "Text & Display",
              items: [
                "api/generated/widgets.text.Class.Text",
                "api/generated/widgets.bigtext.Class.BigText",
                "api/generated/widgets.static.Class.Static",
                "api/generated/widgets.log.Class.Log",
                "api/generated/widgets.line.Class.Line",
              ],
            },
            {
              type: "category",
              label: "Input Widgets",
              items: [
                "api/generated/widgets.input.Class.Input",
                "api/generated/widgets.textbox.Class.Textbox",
                "api/generated/widgets.textarea.Class.Textarea",
                "api/generated/widgets.button.Class.Button",
                "api/generated/widgets.checkbox.Class.Checkbox",
                "api/generated/widgets.radiobutton.Class.RadioButton",
                "api/generated/widgets.radioset.Class.RadioSet",
              ],
            },
            {
              type: "category",
              label: "Lists & Tables",
              items: [
                "api/generated/widgets.list.Class.List",
                "api/generated/widgets.listbar.Class.Listbar",
                "api/generated/widgets.listtable.Class.ListTable",
                "api/generated/widgets.table.Class.Table",
              ],
            },
            {
              type: "category",
              label: "Dialogs & Forms",
              items: [
                "api/generated/widgets.form.Class.Form",
                "api/generated/widgets.dialog.Class.Dialog",
                "api/generated/widgets.prompt.Class.Prompt",
                "api/generated/widgets.question.Class.Question",
                "api/generated/widgets.message.Class.Message",
                "api/generated/widgets.loading.Class.Loading",
              ],
            },
            {
              type: "category",
              label: "Progress & Status",
              items: ["api/generated/widgets.progressbar.Class.ProgressBar"],
            },
            {
              type: "category",
              label: "Images & Media",
              items: [
                "api/generated/widgets.image.Class.Image",
                "api/generated/widgets.ansiimage.Class.ANSIImage",
                "api/generated/widgets.overlayimage.Class.OverlayImage",
                "api/generated/widgets.video.Class.Video",
              ],
            },
            {
              type: "category",
              label: "Advanced",
              items: [
                "api/generated/widgets.terminal.Class.Terminal",
                "api/generated/widgets.filemanager.Class.FileManager",
              ],
            },
          ],
        },
        "api/generated/runtime",
      ],
    },
    {
      type: "category",
      label: "Advanced",
      items: [
        "advanced/custom-widgets",
        "advanced/testing",
        "advanced/performance",
        "advanced/troubleshooting",
      ],
    },
    {
      type: "category",
      label: "Examples",
      items: [
        {
          type: "category",
          label: "Getting Started",
          items: [
            "examples/getting-started/simple-box",
            "examples/getting-started/interactive-list",
            "examples/getting-started/dashboard",
          ],
        },
      ],
    },
    "faq",
  ],
};

export default sidebars;
