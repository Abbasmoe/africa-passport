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
  const generatedSlogan = ref("");
  const sloganDisplay = ref("Or generate a slogan...");
  const generateSloganBtn = ref("✨ Generate Slogan");

  const generateSlogan = async () => {
    generateSloganBtn.value = "Generating...";
    sloganDisplay.value = "Creating an inspirational slogan...";

    let retries = 0;
    const maxRetries = 5;
    const delay = 1000;

    while (retries < maxRetries) {
      try {
        const response = await $fetch<TGeneratedSloganResponse>(
          "/api/generate-slogan"
        );

        if (
          response.candidates &&
          response.candidates.length > 0 &&
          response.candidates[0]?.content &&
          response.candidates[0]?.content.parts &&
          response.candidates[0]?.content.parts.length > 0
        ) {
          const generatedSloganResponse =
            response.candidates?.[0]?.content?.parts?.[0]?.text?.replace(
              /^["']|["']$/g,
              ""
            ) ?? "Unity in Diversity";

          generatedSlogan.value = generatedSloganResponse;
          sloganDisplay.value = generatedSloganResponse;
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
