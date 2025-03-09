/**
 * Converts Slate editor content to HTML
 * @param {Array} nodes - Slate editor nodes
 * @returns {string} HTML representation of the content
 */
export function getHtmlFromSlateNodes(nodes) {
  if (!nodes || !Array.isArray(nodes) || nodes.length === 0) {
    return "";
  }

  return nodes
    .map((node) => {
      // Handle different node types
      if (node.type === "paragraph") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<p class="my-1">${children}</p>`;
      } else if (node.type === "heading-one") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<h1>${children}</h1>`;
      } else if (node.type === "heading-two") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<h2>${children}</h2>`;
      } else if (node.type === "heading-three") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<h3>${children}</h3>`;
      } else if (node.type === "bulleted-list") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<ul>${children}</ul>`;
      } else if (node.type === "numbered-list") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<ol>${children}</ol>`;
      } else if (node.type === "list-item") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<li>${children}</li>`;
      } else if (node.type === "link") {
        const children = node.children
          ? getHtmlFromSlateNodes(node.children)
          : "";
        return `<a href="${node.url}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
      // Text node (leaf)
      else if (!node.type && node.text !== undefined) {
        let text = node.text;

        // Apply text formatting
        if (node.bold) {
          text = `<strong>${text}</strong>`;
        }
        if (node.italic) {
          text = `<em>${text}</em>`;
        }
        if (node.underline) {
          text = `<u>${text}</u>`;
        }
        if (node.code) {
          text = `<code>${text}</code>`;
        }
        if (node.strikethrough) {
          text = `<del>${text}</del>`;
        }

        return text;
      }
      // Default fallback for other node types
      else if (node.children) {
        return getHtmlFromSlateNodes(node.children);
      }

      return "";
    })
    .join("");
}

/**
 * Parse a Slate comment and return HTML
 * @param {string} content - JSON string of slate content
 * @returns {string} HTML representation
 */
export function parseSlateComment(content) {
  try {
    // Parse the JSON string to get the Slate document
    const slateDocument = JSON.parse(content);

    // Check if we have valid content
    if (!slateDocument || !Array.isArray(slateDocument)) {
      return "<p>Invalid comment content</p>";
    }

    // Convert Slate nodes to HTML
    return getHtmlFromSlateNodes(slateDocument);
  } catch (error) {
    console.error("Error parsing Slate comment:", error);
    return "<p>Error parsing comment</p>";
  }
}
