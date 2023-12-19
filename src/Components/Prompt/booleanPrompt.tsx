import { createPortal } from "react-dom";
import { Prompt } from "./Prompt";
import { Button } from "Components";
import { PromptsStore } from "./PromptsStore";

type booleanPromptOptions = {
  onYes?: (resolve: (value: boolean) => void) => void | Promise<void>;
  onNo?: (resolve: (value: boolean) => void) => void | Promise<void>;
  title?: string;
  blurBackground?: boolean;
  transparentBackground?: boolean;
};

export async function booleanPrompt(message: string, options?: booleanPromptOptions) {
  const promptContainer = (() => {
    const maybePromptContainer = document.getElementById("prompt-container");
    if (maybePromptContainer) return maybePromptContainer as HTMLDivElement;
    const promptContainer = document.createElement("div");
    promptContainer.id = "prompt-container";
    document.body.appendChild(promptContainer);
    return promptContainer;
  })();

  return new Promise<boolean>((resolve) => {
    let identifier: string;
    const onYes = async () => {
      if (options?.onYes) {
        const onResolve = (value: boolean) => {
          PromptsStore.removePrompt(identifier);
          resolve(value);
        };
        await Promise.resolve(options.onYes(onResolve));
        return;
      }
      PromptsStore.removePrompt(identifier);
      resolve(true);
    };
    const onNo = async () => {
      if (options?.onNo) {
        const onResolve = (value: boolean) => {
          PromptsStore.removePrompt(identifier);
          resolve(value);
        };
        await Promise.resolve(options.onNo(onResolve));
        return;
      }
      PromptsStore.removePrompt(identifier);
      resolve(false);
    };
    const promptPortalNode = createPortal(
      <Prompt blurBackground={options?.blurBackground} transparentBackground={options?.transparentBackground}>
        {options?.title && <Prompt.Header>{options.title}</Prompt.Header>}
        {message}
        <Prompt.Footer slot="left">
          <Button onClick={onYes}>Yes</Button>
        </Prompt.Footer>
        <Prompt.Footer slot="right">
          <Button onClick={onNo}>No</Button>
        </Prompt.Footer>
      </Prompt>,
      promptContainer,
    );
    identifier = PromptsStore.addPrompt(promptPortalNode);
  });
}
