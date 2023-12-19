export async function* streamLines(context: string, controller: AbortController) {
  try {
    const response = await fetch(`http://127.0.0.1:11434/api/generate`, {
      method: "POST",
      signal: controller.signal,
      body: JSON.stringify({
        model: "mistral:7b-text",
        prompt: context,
        stream: true,
        options: {
          num_predict: 32,
          stop: ["\n"],
        },
        raw: true,
      }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (!reader) return;

    try {
      while (true) {
        if (controller.signal.aborted) {
          // Perform any necessary cleanup
          break;
        }

        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.trim() === "") continue;
          const lineJSON: { model: string; created_at: Date; response: string; done: boolean } = JSON.parse(line);
          if (lineJSON.done) {
            return lineJSON;
          }
          yield lineJSON.response;
        }
      }
    } finally {
      reader.releaseLock();
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    throw error;
  }
}
