// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function mainSummary(prompt: string) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  // const model = 'gemini-2.5-pro-preview-05-06'; 
  const model = 'gemini-2.5-pro-exp-03-25';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  for await (const chunk of response) {
    console.log("chunk.text", chunk.text);
  }
}

// mainSummary();
export default mainSummary;
