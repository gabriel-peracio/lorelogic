export async function* streamLines(context: string, controller: AbortController) {
  try {
    const response = await fetch(`https://api.fireworks.ai/inference/v1/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_FIREWORKS_API_KEY}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "accounts/fireworks/models/mixtral-8x7b",
        prompt: context,
        stream: true,
        max_tokens: 32,
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
        let usage: {
          prompt_tokens: number;
          completion_tokens: number;
          total_tokens: number;
        } | null = null;
        for (let line of lines) {
          if (line.trim() === "") continue;
          if (line.startsWith("data: ")) line = line.slice(6);
          if (line.trim() === "[DONE]") return usage;
          const lineJSON: {
            model: string;
            object: "text_completion";
            usage: null | {
              prompt_tokens: number;
              completion_tokens: number;
              total_tokens: number;
            };
            created: number; // unix timestamp
            choices: Array<{
              index: number;
              text: string;
              logprobs: null;
              finish_reason: null | "length";
            }>;
          } = JSON.parse(line);
          if (lineJSON.usage) {
            usage = lineJSON.usage;
          }
          yield lineJSON.choices[0].text;
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
