import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { geminiAPI } from '../components/apiService'; // Importing the API service

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hi! Need help with flexibility training?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // Get the response from Gemini API
    const botResponse = await geminiAPI(input);

    // Update chat with the bot's response
    setMessages((prev) => [
      ...prev,
      { text: botResponse, sender: "bot" },
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end">
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white shadow-lg rounded-2xl w-80 h-96 flex flex-col overflow-hidden border border-gray-200"
        >
          <div className="bg-orange-500 text-white p-3 font-bold flex justify-between items-center">
            Flex It Out Bot
            <button onClick={() => setIsOpen(false)} className="text-white">✖</button>
          </div>
          <div ref={chatRef} className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-lg text-white max-w-[75%] ${msg.sender === "bot" ? "bg-orange-500 self-start" : "bg-gray-700 self-end"}`}> 
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-2 flex border-t border-gray-200">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
              placeholder="Type your message..."
            />
            <button onClick={handleSend} className="bg-orange-500 p-2 rounded-r-lg text-white">
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-500 p-3 rounded-full shadow-lg text-white flex items-center justify-center"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
