import axios from 'axios';

class CablyAIClient {
  private apiKey: string;
  private baseUrl: string = 'https://cablyai.com/v1';
  public systemPrompt: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.systemPrompt = "";
  }

  async request(type: string, model: string, prompt: string) {
    const response = await axios.post(`${this.baseUrl}/${type}`, {
      model,
      prompt,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });
    return response.data;
  }

  async getModels() {
    const response = await axios.get(`${this.baseUrl}/models`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });
    return response.data;
  }

  async checkModeration(input: string, model: string = "omni-moderation-latest") {
    const response = await axios.post(`${this.baseUrl}/moderations`, {
      input,
      model,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });
    return response.data;
  }

  async chat(model: string, messages: object[]) {
    messages.push({
      role: "system",
      content: this.systemPrompt
    });
    const response = await axios.post(`${this.baseUrl}/chat/completions`, {
      model,
      messages,
      stream: false,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });
    return response.data;
  }

  async image(model: string, prompt: string, n: number = 1, size: string = "1024x1024") {
    const response = await axios.post(`${this.baseUrl}/images/generations`, {
      prompt,
      n,
      size,
      model,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });
    return response.data;
  }

  async generateSpeech(model: string, input: string, voice: string) {
    const response = await axios.post(`${this.baseUrl}/audio/speech`, {
      model,
      input,
      voice,
    }, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });
    return response.data;
  }

  async copilotSearch(mode: string, query: string) {
    const validModels = ["precise", "balanced", "creative"];
    if (!validModels.includes(mode)) {
      throw new Error(`Invalid mode: ${mode}. Please choose from ${validModels.join(", ")}`);
    } else {
      const model = `copilot-${mode}`;
      const response = await axios.post(`${this.baseUrl}/chat/completions`, {
        model: mode,
        messages: [
          {
            role: "user",
            content: `Search on the web for ${query}.`,
          }
        ],
        stream: false
      }, {
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
        },
      });

      return response.data;
    }
  }
}

function cably(apiKey: string) {
  return new CablyAIClient(apiKey);
}

export = cably;