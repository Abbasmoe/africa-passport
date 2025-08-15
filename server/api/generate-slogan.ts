export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);

  const apiUrl = `${runtimeConfig.public.apiBase}?key=${runtimeConfig.apiSecret}`;

  const prompt =
    "Generate a short, inspirational slogan for a passport of a united African nation. Respond with only the slogan, no extra explanations or quotation marks.";
  const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
  const payload = { contents: chatHistory };

  return await $fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
});
