# cablyai-client

A simple Node.js client for interacting with the CablyAI API, allowing you to easily make requests for text, image, and audio generation.

## Installation

To install the package, run the following command:

```bash
npm install cablyai-client
```

## Usage

Here’s a basic example of how to use the CablyAI client:

```typescript
import cably from 'cablyai-client';

const client = cably('YOUR_API_KEY'); // Replace with your actual API key
client.systemprompt = "You are a helpful assistant called supdawg-1.";

// Example: Chat request
client.chat("MODEL_NAME", [
      {
        role: "system",
        content: "You're a helpful assistant."
      },
      {
        role: "user",
        content: "Hello!"
      },
      {
        role: "assistant",
        content: "Hello! How can I assist you today?"
      }
    ],
    )
  .then(response => {
    console.log("Chat Response:", response);
  })
  .catch(error => {
    console.error("Error during chat request:", error);
  });

// Example: Image generation request
client.image("MODEL_NAME", "Generate an image of a sunset over the mountains.")
  .then(response => {
    console.log("Image Response:", response);
  })
  .catch(error => {
    console.error("Error during image generation request:", error);
  });
```

## API Methods

### `chat(model: string, prompt: string)`

- **Description**: Sends a chat prompt to the CablyAI API and returns the response.
- **Parameters**:
  - `model`: The model to use for the chat.
  - `prompt`: The user prompt to send.

### `image(model: string, prompt: string, n: number = 1, size: string = "1024x1024")`

- **Description**: Generates an image based on the provided prompt.
- **Parameters**:
  - `model`: The model to use for image generation.
  - `prompt`: The prompt for the image.
  - `n`: The number of images to generate (default is 1).
  - `size`: The size of the generated image (default is "1024x1024").

### `getModels()`

- **Description**: Retrieves a list of available models from the CablyAI API.

### `checkModeration(input: string, model: string = "text-moderation-latest")`

- **Description**: Checks the content moderation for the provided input.

### `generateSpeech(model: string, input: string, voice: string)`

- **Description**: Generates speech from the provided text input.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Author
aquiffoo