/* eslint-disable */
import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Message {
    id: string;
    text: string;
    timestamp: Date;
    type: 'user' | 'bot';
}

// Hook for localStorage management
const useLocalStorage = (key: string) => {
    const loadMessages = (): Message[] => {
        try {
            const saved = localStorage.getItem(key);
            if (saved) {
                return JSON.parse(saved).map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
            }
        } catch (error) {
            console.error("Error loading messages:", error);
        }
        return [];
    };

    const saveMessages = (messages: Message[]) => {
        if (messages.length > 0) {
            localStorage.setItem(key, JSON.stringify(messages));
        } else {
            localStorage.removeItem(key);
        }
    };

    return { loadMessages, saveMessages };
};

// Chat Header Component
const ChatHeader = ({ onClear }: { onClear: () => void }) => (
    <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h1 className="text-2xl font-light">Messages</h1>
        <Button
            onClick={onClear}
            variant="outline"
            size="sm"
            className="bg-black border-white/20 hover:bg-white/5 text-white h-9 px-3"
        >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
        </Button>
    </div>
);

// Empty State Component
const EmptyState = () => (
    <div className="flex-1 flex items-center justify-center">
        <p className="text-white/50 text-lg font-light">Start a conversation</p>
    </div>
);

// Message Avatar Component
const MessageAvatar = ({ type }: { type: 'user' | 'bot' }) => (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
        type === 'user' ? 'bg-white text-black' : 'bg-black border border-white/20 text-white'
    }`}>
        {type === 'user' ? 'U' : 'B'}
    </div>
);

// Message Bubble Component
const MessageBubble = ({ message, isUser }: { message: Message; isUser: boolean }) => (
    <div className={`px-4 py-3 rounded-2xl max-w-md ${
        isUser 
            ? 'bg-white text-black rounded-tr-sm' 
            : 'bg-black border border-white/20 text-white rounded-tl-sm'
    }`}>
        <p className="text-base leading-relaxed">{message.text}</p>
    </div>
);

// Iframe bubble for URL previews (kept but not used for redirect flow)
const IframeBubble = ({ url }: { url: string }) => (
    <div className="w-full max-w-2xl h-96 border border-white/10 rounded-lg overflow-hidden">
        <iframe src={url} className="w-full h-full bg-white" />
    </div>
);

// Message Timestamp Component
const MessageTimestamp = ({ timestamp, isUser }: { timestamp: Date; isUser: boolean }) => (
    <span className={`text-xs text-white/40 mt-2 block ${isUser ? 'text-right' : 'text-left'}`}>
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
);

// Individual Message Component
const MessageItem = ({ message }: { message: Message }) => {
    const isUser = message.type === 'user';

    const urlMatch = message.text.match(/https?:\/\/\S+/);

    return (
        <div className={`flex gap-3 mb-8 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <MessageAvatar type={message.type} />
            <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <MessageBubble message={message} isUser={isUser} />
                {/* We are not auto-embedding anymore; navigation happens instead */}
                {/* {(!isUser && urlMatch) && (
                    <div className="mt-3">
                        <IframeBubble url={urlMatch[0]} />
                    </div>
                )} */}
                <MessageTimestamp timestamp={message.timestamp} isUser={isUser} />
            </div>
        </div>
    );
};

// Messages List Component
const MessagesList = ({ messages }: { messages: Message[] }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (messages.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="flex-1 overflow-y-auto px-6 py-4">
            {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

// Chat Input Component
const ChatInput = ({ 
    value, 
    onChange, 
    onSend, 
    disabled 
}: { 
    value: string; 
    onChange: (value: string) => void; 
    onSend: () => void; 
    disabled: boolean; 
}) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="p-6 border-t border-white/10">
            <div className="flex items-end gap-3">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-black border-white/20 text-white placeholder-white/50 focus:border-white h-12 text-base px-4"
                    placeholder="Type your message..."
                />
                <Button
                    onClick={onSend}
                    disabled={disabled}
                    className="bg-white hover:bg-white/90 disabled:bg-white/20 text-black disabled:text-white/40 h-12 w-12 p-0 flex-shrink-0"
                >
                    <Send className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

// Main Chat Form Component
const ChatForm = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const { loadMessages, saveMessages } = useLocalStorage("elevenlabs-chat-messages");
    const router = useRouter();

    // Load messages on mount
    useEffect(() => {
        setMessages(loadMessages());
    }, []);

    // Save messages when they change
    useEffect(() => {
        saveMessages(messages);
    }, [messages]);

    const extractUrl = (text: string): string | null => {
        const m = text.match(/https?:\/\/\S+/);
        return m ? m[0] : null;
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userText = inputValue.trim();
        const newMessage: Message = {
            id: Date.now().toString(),
            text: userText,
            timestamp: new Date(),
            type: 'user'
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue("");

        try {
            const res = await fetch("http://127.0.0.1:8001/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText })
            });
            const data = await res.json();
            const botText = typeof data.text === 'string' ? data.text : JSON.stringify(data);

            const maybeUrl = extractUrl(botText);
            if (maybeUrl) {
                // Redirect to reader page without adding a bot message
                const urlParam = encodeURIComponent(maybeUrl);
                router.push(`/reader?url=${urlParam}`);
                return;
            }

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: botText,
                timestamp: new Date(),
                type: 'bot'
            };
            setMessages(prev => [...prev, botResponse]);
        } catch (e) {
            const errResponse: Message = {
                id: (Date.now() + 2).toString(),
                text: "Error contacting server.",
                timestamp: new Date(),
                type: 'bot'
            };
            setMessages(prev => [...prev, errResponse]);
        }
    };

    const handleClearMessages = () => {
        setMessages([]);
    };

    return (
        <div className="w-full h-full bg-black text-white flex flex-col">
            <ChatHeader onClear={handleClearMessages} />
            <MessagesList messages={messages} />
            <ChatInput
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSendMessage}
                disabled={!inputValue.trim()}
            />
        </div>
    );
};

export default ChatForm;