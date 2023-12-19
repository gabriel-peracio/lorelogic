import { AtLeast } from "ts-toolbelt/out/Object/AtLeast";
import { extractClassName } from "./className";

describe("extractClassName", () => {
  it("should return an object with the keys of the passed object", () => {
    const className = { main: "main", content: "content", footer: "footer" };
    const { main, content, footer } = extractClassName(className);
    expect({ main, content, footer }).toEqual(className);
  });
  it("should return an object with all the keys, even if only some are passed", () => {
    const className: AtLeast<{
      main: string;
      content: string;
      footer: string;
    }> = { main: "main" };
    const { main, content, footer } = extractClassName(className);
    expect({ main, content, footer }).toEqual({
      main: "main",
      content: undefined,
      footer: undefined,
    });
  });
  it("should return keys even if a string is passed", () => {
    const className = "test";
    const { main, content, footer } = extractClassName(className);
    expect({ main, content, footer }).toEqual({
      main: "test",
      content: undefined,
      footer: undefined,
    });
  });
});
