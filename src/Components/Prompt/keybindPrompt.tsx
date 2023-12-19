import { createPortal } from "react-dom";
import { Prompt } from "./Prompt";
import { Button } from "Components";
import { PromptsStore } from "./PromptsStore";
import { useKeyboardEvent } from "@react-hookz/web";
import { useState } from "react";

type keybindPromptOptions = {
  onYes?: (resolve: (value: string[]) => void) => void | Promise<void>;
  onNo?: (resolve: (value: false) => void) => void | Promise<void>;
  title?: string;
  blurBackground?: boolean;
  transparentBackground?: boolean;
};

export async function keybindPrompt(message: string, options?: keybindPromptOptions) {
  const promptContainer = (() => {
    const maybePromptContainer = document.getElementById("prompt-container");
    if (maybePromptContainer) return maybePromptContainer as HTMLDivElement;
    const promptContainer = document.createElement("div");
    promptContainer.id = "prompt-container";
    document.body.appendChild(promptContainer);
    return promptContainer;
  })();

  return new Promise<string[] | false>((resolve) => {
    let identifier: string;
    const onYes = async () => {
      if (options?.onYes) {
        const onResolve = (value: string[]) => {
          PromptsStore.removePrompt(identifier);
          resolve(value);
        };
        await Promise.resolve(options.onYes(onResolve));
        return;
      }
      PromptsStore.removePrompt(identifier);
      // resolve(true);
    };
    const onNo = async () => {
      if (options?.onNo) {
        const onResolve = () => {
          PromptsStore.removePrompt(identifier);
          resolve(false);
        };
        await Promise.resolve(options.onNo(onResolve));
        return;
      }
      PromptsStore.removePrompt(identifier);
      resolve(false);
    };
    const promptPortalNode = createPortal(
      <KeybindPromptComponent message={message} options={options} onYes={onYes} onNo={onNo} />,
      promptContainer,
    );
    identifier = PromptsStore.addPrompt(promptPortalNode);
  });
}

const KeybindPromptComponent: React.FC<{
  message: string;
  options?: keybindPromptOptions;
  onYes: (newKeybind: string[]) => void;
  onNo: () => void;
}> = ({ message, options, onYes, onNo }) => {
  const [shortcut, setShortcut] = useState<string[] | null>(null);
  useKeyboardEvent(true, (e) => {
    e.preventDefault();
    e.stopPropagation();
    const key = ["control", "alt", "shift", "meta"].includes(e.key.toLowerCase()) ? null : e.key.toUpperCase();
    const keyCombo = [
      e.ctrlKey ? "ctrl" : null,
      e.altKey ? "alt" : null,
      e.shiftKey ? "shift" : null,
      e.metaKey ? "meta" : null,
      key,
    ].filter(Boolean) as string[];
    setShortcut(keyCombo);
  });
  return (
    <Prompt blurBackground={options?.blurBackground} transparentBackground={options?.transparentBackground}>
      {options?.title && <Prompt.Header>{options.title}</Prompt.Header>}
      {message}
      {shortcut && <kbd>{shortcut.join(" + ")}</kbd>}

      <Prompt.Footer slot="left">
        <Button onClick={() => onYes(shortcut!)} disabled={shortcut === null}>
          Confirm
        </Button>
      </Prompt.Footer>
      <Prompt.Footer slot="right">
        <Button onClick={onNo}>Cancel</Button>
      </Prompt.Footer>
    </Prompt>
  );
};
