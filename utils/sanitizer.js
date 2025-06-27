import sanitizeHtml from "sanitize-html";

// configuration for all plain text fields
const plainTextOptions = {
  allowedTags: [], // no HTML tags allowed
  allowedAttributes: {}, // no HTML attributes allowed
  textFilter: function (text) {
    return text.trim(); // trim leading/trailing whitespace
  },
};

function sanitizePlainText(input) {
  if (typeof input !== "string") {
    return ""; // handle non-string input
  }
  return sanitizeHtml(input, plainTextOptions);
}

export { sanitizePlainText };
