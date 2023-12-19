import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as Filters } from "assets/filters.svg";
import { Button } from "Components/Button/Button";
import React from "react";
import { Prompt } from "./Prompt";
import { Prompts } from "./PromptsStore";
import { booleanPrompt } from "./booleanPrompt";

const meta: Meta<typeof Prompt> = {
  title: "Components/Prompt",
  component: Prompt,
  tags: ["docsPage"],
  argTypes: {
    onDismiss: {
      action: "onDismiss",
    },
  },
};

export default meta;
export const Primary: StoryObj<typeof Prompt> = {
  // args: {
  // },
  render: (args) => (
    <Prompt {...args}>
      <Prompt.Header>Do you want to do the thing?</Prompt.Header>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus voluptas facilis libero, ratione recusandae
      rem nobis iste facere pariatur! Deserunt maiores, ipsa accusantium excepturi dolore consectetur quidem obcaecati
      quibusdam voluptate rerum fugit, possimus inventore voluptates laboriosam ipsum, illum id beatae.
      <Prompt.Footer slot="left">yes</Prompt.Footer>
      <Prompt.Footer slot="right">dont do the thing</Prompt.Footer>
    </Prompt>
  ),
};
export const Dismissable: StoryObj<typeof Prompt> = {
  args: {
    dismissable: ["closeButton", "clickOutside", "escKey"],
  },
  render: (args) => (
    <Prompt {...args}>
      <Prompt.Header>Do you want to do the thing?</Prompt.Header>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus voluptas facilis libero, ratione recusandae
      rem nobis iste facere pariatur! Deserunt maiores, ipsa accusantium excepturi dolore consectetur quidem obcaecati
      quibusdam voluptate rerum fugit, possimus inventore voluptates laboriosam ipsum, illum id beatae.
      <Prompt.Footer slot="left">yes</Prompt.Footer>
      <Prompt.Footer slot="right">dont do the thing</Prompt.Footer>
    </Prompt>
  ),
};

export const YesNo: React.FC<{}> = () => {
  const handleClick = async () => {
    console.log(`handle click:`);
    const result = await booleanPrompt("Do you want to do the thing?", {
      onYes: async (resolve) => {
        const confirmation = await booleanPrompt("Are you sure?", {
          title: "Confirmation",
        });
        if (confirmation) resolve(true);
      },
    });
    console.log(result);
  };
  return (
    <div>
      <Filters />
      <Prompts />
      <Button onClick={handleClick}>Open yes/no prompt</Button>
    </div>
  );
};
