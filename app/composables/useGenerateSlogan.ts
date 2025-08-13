export interface TGeneratedSloganResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export interface TGeneratedSloganResponseError {
  error: {
    code: number;
    message: string;
    status: string;
  };
}

export const useGenerateSlogan = () => {
  let generatedSlogan = "";
  const sloganDisplay = ref("Or generate a slogan...");
  const generateSloganBtn = ref("✨ Generate Slogan");
  const runtimeConfig = useRuntimeConfig();

  const generateSlogan = async () => {
    generateSloganBtn.value = "Generating...";
    sloganDisplay.value = "Creating an inspirational slogan...";

    const prompt =
      "Generate a short, inspirational slogan for a passport of a united African nation. Respond with only the slogan, no extra explanations or quotation marks.";
    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiUrl = `${runtimeConfig.public.apiBase}?key=${runtimeConfig.apiSecret}`;

    let retries = 0;
    const maxRetries = 5;
    const delay = 1000;

    while (retries < maxRetries) {
      try {
        const response = await $fetch<TGeneratedSloganResponse>(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (
          response.candidates &&
          response.candidates.length > 0 &&
          response.candidates[0]?.content &&
          response.candidates[0]?.content.parts &&
          response.candidates[0]?.content.parts.length > 0
        ) {
          generatedSlogan =
            response.candidates?.[0]?.content?.parts?.[0]?.text?.replace(
              /^["']|["']$/g,
              ""
            ) ?? "Unity in Diversity";

          sloganDisplay.value = generatedSlogan;
        } else {
          sloganDisplay.value = "Slogan could not be generated.";
        }
        break;
      } catch (error) {
        console.error(
          "Error generating slogan:",
          error as TGeneratedSloganResponseError
        );
        retries++;
        if (retries < maxRetries) {
          await new Promise((res) =>
            setTimeout(res, delay * Math.pow(2, retries))
          );
        } else {
          sloganDisplay.value =
            "Slogan could not be generated. Try again later.";
        }
      }
    }

    generateSloganBtn.value = "✨ Generate Slogan";
  };

  return {
    generatedSlogan,
    generateSlogan,
    generateSloganBtn,
    sloganDisplay,
  };
};
