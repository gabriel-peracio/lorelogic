import { JSONContent } from "@tiptap/react";
import { countBy } from "lodash";

export const JSONStateToMarkdown = (json: JSONContent, ancestors?: JSONContent[]) => {
  let markdown = "";
  switch (json.type) {
    case "doc":
      markdown += json.content?.map((child) => JSONStateToMarkdown(child, [json])).join("\n") ?? "";
      break;
    case "paragraph":
      markdown += json.content?.map((child) => JSONStateToMarkdown(child, [json, ...(ancestors ?? [])])).join("") ?? "";
      break;
    case "text":
      if (json.marks?.length) {
        markdown += processMarks(json);
      } else {
        markdown += json.text;
      }
      break;
    case "heading":
      markdown +=
        `${"#".repeat(json.attrs?.level ?? 1)} ` +
          json.content?.map((child) => JSONStateToMarkdown(child, [json, ...(ancestors ?? [])])).join("") ?? "";
      break;
    case "codeBlock":
      markdown +=
        `\`\`\`${json.attrs?.language ?? ""}\n` +
        json.content?.map((child) => JSONStateToMarkdown(child, [json, ...(ancestors ?? [])])).join("") +
        `\n\`\`\``;
      break;
    case "blockquote":
      markdown += `> ${
        json.content?.map((child) => JSONStateToMarkdown(child, [json, ...(ancestors ?? [])])).join("") ?? ""
      }`;
      break;
    case "orderedList": {
      let level = 0;
      if (ancestors) {
        const numListItemAncestors = countBy(ancestors, (ancestor) => ancestor.type === "listItem").true ?? 0;
        level = numListItemAncestors;
      }
      if (level > 0) markdown += "\n";
      const listStart: number = json.attrs?.start ?? 1;
      const listItems = json.content?.map((child) => JSONStateToMarkdown(child, [json, ...(ancestors ?? [])]));
      markdown +=
        listItems?.map((item, index) => `${"  ".repeat(level)}${listStart + index}. ${item}`).join("\n") ?? "";
      break;
    }
    case "bulletList": {
      let level = 0;
      if (ancestors) {
        const numListItemAncestors = countBy(ancestors, (ancestor) => ancestor.type === "listItem").true ?? 0;
        level = numListItemAncestors;
      }
      if (level > 0) markdown += "\n";
      const listItems = json.content?.map((child) => JSONStateToMarkdown(child, [json, ...(ancestors ?? [])]));
      markdown += listItems?.map((item) => `${"  ".repeat(level)}- ${item}`).join("\n") ?? "";
      break;
    }
    case "listItem":
      markdown += json.content?.map((child) => JSONStateToMarkdown(child, [json, ...(ancestors ?? [])])).join("") ?? "";
      break;
    default:
      console.warn(`Unknown node type: ${json.type}`, json);
      break;
  }
  return markdown;
};

const processMarks = (json: JSONContent): string => {
  let markdown = "";
  json.marks?.forEach((mark) => {
    switch (mark.type) {
      case "bold":
        markdown += `**${json.text}**`;
        break;
      case "italic":
        markdown += `*${json.text}*`;
        break;
      case "code":
        markdown += `\`${json.text}\``;
        break;
      case "link":
        markdown += `[${json.text}](${mark.attrs?.href})`;
        break;
      case "strike":
        markdown += `~~${json.text}~~`;
        break;
      case "underline":
        markdown += `__${json.text}__`;
        break;
      default:
        console.warn(`Unknown mark type: ${mark.type}`, mark, json);
        break;
    }
  });
  return markdown;
};
