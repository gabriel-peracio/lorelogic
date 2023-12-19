import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["docsPage"],
};

export default meta;
export const Showcase: StoryObj<typeof Button> = {
  render: () => {
    const sizes = ["s", "m"] as const;
    return (
      <div className="showcase">
        <h1>primary</h1>
        {sizes.map((size) => (
          <Button size={size}>Size {size}</Button>
        ))}
        <h1>secondary</h1>
        {sizes.map((size) => (
          <Button size={size} variant="secondary">
            Size {size}
          </Button>
        ))}
        <h1>ghost</h1>
        {sizes.map((size) => (
          <Button size={size} variant="ghost">
            Size {size}
          </Button>
        ))}
      </div>
    );
  },
  // argTypes: {
  //   tree: {
  //     options: [],
  //     control: { type: "select" },
  //   },
  // },
  // args: {
  //   tree: dummyTree,
  // },
};
