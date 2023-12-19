import { uniqueId } from "lodash";
import { useSyncExternalStore } from "react";

export class PromptsStore {
  static listeners: Array<() => void> = [];
  static prompts: Map<string, React.ReactNode> = new Map();
  static snapshot: React.ReactNode[] = [];
  static addPrompt(p: React.ReactNode) {
    const newId = uniqueId("prompt-");
    PromptsStore.prompts.set(newId, p);
    PromptsStore.emitChange();
    return newId;
  }
  static removePrompt(id: string) {
    PromptsStore.prompts.delete(id);
    PromptsStore.emitChange();
  }
  static subscribe(listener: () => void) {
    PromptsStore.listeners = [...PromptsStore.listeners, listener];
    return () => {
      PromptsStore.listeners = PromptsStore.listeners.filter((l) => l !== listener);
    };
  }
  static getSnapshot() {
    return PromptsStore.snapshot;
  }
  static emitChange() {
    PromptsStore.snapshot = Array.from(PromptsStore.prompts.values());
    for (let listener of PromptsStore.listeners) {
      listener();
    }
  }
}

export const Prompts: React.FC = () => {
  const prompts = useSyncExternalStore(PromptsStore.subscribe, PromptsStore.getSnapshot);
  return prompts;
};
