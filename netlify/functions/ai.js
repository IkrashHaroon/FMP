export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a professional hair salon assistant AI. Give short, clean and professional answers."
          },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 100
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" })
    };
  }
}
