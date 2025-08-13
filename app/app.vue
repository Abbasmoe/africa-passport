<template>
  <div class="antialiased overflow-x-hidden">
    <HeroSection />

    <main class="container mx-auto px-4 py-16">
      <VisionSection />

      <section
        class="max-w-xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700"
      >
        <h2 class="text-3xl font-bold text-center text-yellow-500 mb-6">
          🌍 Create Your Passport
        </h2>

        <div class="text-gray-400 text-center mb-12">
          <p>
            Enter your <strong>name</strong> and instantly receive a
            personalized
          </p>
          <strong>Africa Passport</strong>
        </div>

        <form
          class="flex flex-col sm:flex-row gap-4 mb-6"
          @submit.prevent="generatePass"
          @keydown.enter="generatePass"
        >
          <input
            v-model.trim="nameInput"
            type="text"
            required
            class="flex-grow p-3 rounded-xl bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
            placeholder="Enter your name here"
            maxlength="25"
          >
          <button
            type="submit"
            class="bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-lg"
          >
            {{
              downloadLink.href && generatingStatus === "success"
                ? "Regenerate"
                : "Generate"
            }}
            Passport
          </button>
        </form>

        <!-- Gemini API Feature: Slogan Generator -->
        <div class="flex flex-col sm:flex-row items-center gap-4">
          <p class="flex-grow text-center text-gray-400 italic">
            {{ sloganDisplay }}
          </p>
          <button
            class="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-500 transition-colors shadow-lg"
            @click="generateSlogan"
          >
            {{ generateSloganBtn }}
          </button>
        </div>

        <div class="mt-12 flex flex-col justify-center items-center gap-6">
          <div
            class="max-w-xs md:max-w-none md:w-96 rounded-lg flex items-center justify-center bg-gray-700"
          >
            <!-- Passport content will be dynamically generated here -->
            <img
              v-if="downloadLink.href && generatingStatus === 'success'"
              class="w-full h-full object-cover rounded-xl"
              :src="downloadLink.href"
              alt="Your Africa Passport"
            >
            <p
              v-if="generatingStatus === 'error'"
              class="text-red-500 text-center m-4"
            >
              Error generating passport. Please try again.
            </p>
          </div>

          <a
            v-if="downloadLink.href"
            :href="downloadLink.href"
            :download="downloadLink.download"
            class="bg-yellow-500 text-gray-900 text-center px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors shadow-lg"
          >
            Download your Africa Passport
          </a>
        </div>
      </section>
    </main>

    <FooterSection />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: "Africa Passports",
});

const config = useRuntimeConfig();

useSeoMeta({
  author: "Abbas Mohamed",
  ogSiteName: config.public.siteurl,
});

const nameInput = ref("");
const downloadLink = reactive({ href: "", download: "" });
const generatingStatus = ref<"initial" | "success" | "error">("initial");

const { sloganDisplay, generateSloganBtn, generateSlogan, generatedSlogan } =
  useGenerateSlogan();

const generatePass = (event?: KeyboardEvent | Event) => {
  if (event?.type === "keydown") {
    event.preventDefault();
    return;
  }

  if (!nameInput.value) {
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 700; // Increased resolution for better quality
  canvas.height = 900;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Draw passport design
  ctx.fillStyle = "#2E7D32"; // Dark green background
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#FFD700"; // Gold color
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

  // Draw emblem
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2.5;
  const radius = 90;

  // Gold circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#FFD700";
  ctx.fill();

  // Simplified outline of the African continent in the center
  ctx.fillStyle = "#2E7D32";
  ctx.font = "120px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🌍", centerX, centerY + 5);

  // Gold stars around the edge of the circle
  const numStars = 12;
  for (let i = 0; i < numStars; i++) {
    const angle = (i / numStars) * 2 * Math.PI - Math.PI / 2;
    const starX = centerX + (radius + 30) * Math.cos(angle);
    const starY = centerY + (radius + 30) * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(starX, starY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFD700";
    ctx.fill();
  }

  // Draw text
  ctx.fillStyle = "#FFD700";
  ctx.font = "bold 45px Arial";
  ctx.textAlign = "center";
  ctx.fillText("REPUBLIC OF AFRICA", canvas.width / 2, 100);

  ctx.font = "35px Arial";
  ctx.fillText("PASSPORT", canvas.width / 2, 150);

  // Draw slogan if available
  if (generatedSlogan) {
    ctx.font = "italic 28px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`"${generatedSlogan}"`, canvas.width / 2, 730);
  }

  // Draw name
  ctx.fillStyle = "white";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`Name: ${nameInput.value}`, 80, 590, canvas.width / 1.5);

  // Draw Passport number
  const passportNumber = Math.floor(Math.random() * 999999999) + 1;
  ctx.fillStyle = "white";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "left";
  ctx.fillText(
    `Passport Number: PC-${passportNumber}`,
    80,
    640,
    canvas.width / 1.5
  );

  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.download = `Africa-Passport_${nameInput.value}.png`;
  generatingStatus.value = "success";
};
</script>
