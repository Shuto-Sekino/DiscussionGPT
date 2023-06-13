// chatGPTに送る用の型
type Message = {
  role   : "user" | "system" | "assistant";
  content: string;
};

/**
 * chatGPTにtextを送り，レスポンスを受け取る関数
 *
 * @param {string} text - The text of ID's component.
 * @param {string} apiKey - API key of chatGPT.
 */
export default async function getChatGPTResponse(text: string, apiKey: string): Promise<string> {
  // return `input: ${text}, this is GPT`;

  const messages: Message[] = [
    {
      role   : "user",
      content: text,
    },
  ];

  const body = JSON.stringify({
    messages,
    model: "gpt-3.5-turbo",
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization : `Bearer ${apiKey}`,
    },
    body,
  });
  const data = await res.json();

  // エラーの場合と成功した場合で，構造が異なる
  if (data.error) {
    return data.error.type;
  } else {
    return data.choices[0].message.content;
  }
};

