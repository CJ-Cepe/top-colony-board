import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const messagesFile =
  process.env.MESSAGES_FILE || path.join(process.cwd(), "data/messages.json");

function getAllMessages() {
  try {
    const data = fs.readFileSync(messagesFile, "utf-8");
    const messages = JSON.parse(data);

    const processedMessages = messages.map((message) => {
      let dateObj;
      if (typeof message.timestamp === "string") {
        dateObj = new Date(message.timestamp);
      } else if (message.timestamp instanceof Date) {
        dateObj = message.timestamp;
      } else {
        dateObj = new Date();
      }

      const formattedDateString = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return {
        ...message,
        timestamp: formattedDateString,
      };
    });

    return processedMessages;
    //return JSON.parse(data);
  } catch (err) {
    console.error("Failed to read messages:", err);
    return [];
  }
}

function saveMessage(newMessage) {
  const messages = getAllMessages();
  messages.push(newMessage);

  try {
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error("Failed to write message:", err);
  }
}

export { getAllMessages, saveMessage };
