import dbPool from "./dbPool.js";

async function getAllMessages() {
  const { rows } = await dbPool.query("SELECT * FROM messages");

  // transform timestamp to month day, year
  const processedMessages = rows.map((message) => {
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
}

async function saveMessage(newMessage) {
  const { name, role, topic, content, timestamp } = newMessage;
  await dbPool.query(
    "INSERT INTO messages (name, role, topic, content, timestamp) VALUES ($1, $2, $3, $4, $5)",
    [name, role, topic, content, timestamp]
  );
}

export { getAllMessages, saveMessage };
