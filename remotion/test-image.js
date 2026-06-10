const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.GEMINI_API_KEY;

async function generateTestImage() {
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  console.log("Generating image via Gemini Imagen...");

  const response = await ai.models.generateContent({
    model: "nano-banana-pro-preview",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "Generate an image: Dark futuristic cityscape at night, neon purple and gold glowing lights reflecting on wet streets, cinematic vertical 9:16 composition, ultra HD, dramatic lighting, deep shadows, cyberpunk aesthetic, no text",
          },
        ],
      },
    ],
    config: {
      responseModalities: ["IMAGE", "TEXT"],
    },
  });

  const parts = response.candidates[0].content.parts;
  const imgPart = parts.find((p) => p.inlineData);
  if (!imgPart) throw new Error("No image in response: " + JSON.stringify(parts));

  const outPath = path.join(__dirname, "out", "test-bg.png");
  fs.writeFileSync(outPath, Buffer.from(imgPart.inlineData.data, "base64"));
  console.log(`✓ Image saved: ${outPath}`);
}

generateTestImage().catch(console.error);
