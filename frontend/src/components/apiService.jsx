import axios from "axios";

export const geminiAPI = async (question) => {
  try {
    // Check for greetings
    const greetingKeywords = ['hello', 'hi', 'hey', 'greetings'];
    const isGreeting = greetingKeywords.some(keyword => question.toLowerCase().includes(keyword));

    if (isGreeting) {
      return "Hello! How can I assist you with your fitness journey today?"; // Custom greeting response
    }

    // Sending the POST request to Gemini API for other questions
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAAsHdgODx8u9p836tEoAfrW5LgnVWC5U0`,
      method: "post",
      data: {
        contents: [
          {
            parts: [
              {
                text: `User: ${question} \nAssistant (Provide a brief and concise answer about fitness in 2-3 lines):`
              }
            ]
          }
        ]
      },
    });

    // Log the response for debugging
    console.log(response.data);

    // Extract the response and return it
    const responseText = response["data"]["candidates"][0]["content"]["parts"][0]["text"];

    // Return the response
    return responseText;
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return "Sorry, I couldn't get an answer for that.";
  }
};
