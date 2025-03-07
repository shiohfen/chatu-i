"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Send, Paperclip, Smile } from 'lucide-react';
import useSWR from "swr";
import { useAuth } from '@clerk/clerk-react'

// Utility function to format timestamp
const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    // If message is from today, show time
    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // If within this week, show day
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (date > weekAgo) {
        return date.toLocaleDateString([], { weekday: 'short' });
    }

    // Otherwise, show full date
    return date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export function ChatMessages() {
    const { userId } = useAuth()

    const { data, error, isLoading } = useSWR(
        "/api/chat-messages",
        fetcher
    );
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hey, are you free to discuss the project timeline?",
            sender: 'other',
            timestamp: new Date(2025, 1, 11, 18, 30).toISOString(),
            avatar: 'https://picsum.photos/seed/1/200'
        },
        {
            id: 2,
            text: "Sure! What details do you want to go over?",
            sender: 'me',
            timestamp: new Date(2025, 1, 11, 18, 31).toISOString(),
            avatar: 'https://picsum.photos/seed/2/200'
        },
        {
            id: 3,
            text: "I'm concerned about the backend integration milestones.",
            sender: 'other',
            timestamp: new Date(2025, 1, 11, 18, 32).toISOString(),
            avatar: 'https://picsum.photos/seed/1/200'
        },
        {
            id: 4,
            text: "We're currently ahead of schedule. I've completed the authentication module and started on data validation.",
            sender: 'me',
            timestamp: new Date(2025, 1, 11, 18, 33).toISOString(),
            avatar: 'https://picsum.photos/seed/2/200'
        },
        {
            id: 5,
            text: "That's great news! Can you walk me through the implementation?",
            sender: 'other',
            timestamp: new Date(2025, 1, 11, 18, 34).toISOString(),
            avatar: 'https://picsum.photos/seed/1/200'
        },
        {
            id: 6,
            text: "I used NextAuth for seamless authentication and added role-based access control. Want me to share the code snippet?",
            sender: 'me',
            timestamp: new Date(2025, 1, 11, 18, 35).toISOString(),
            avatar: 'https://picsum.photos/seed/2/200'
        },
        {
            id: 7,
            text: "Yes, please! That would be helpful for the team review.",
            sender: 'other',
            timestamp: new Date(2025, 1, 11, 18, 36).toISOString(),
            avatar: 'https://picsum.photos/seed/1/200'
        },
        {
            id: 8,
            text: "I'll send the GitHub link in our shared repository. It has comprehensive documentation.",
            sender: 'me',
            timestamp: new Date(2025, 1, 11, 18, 37).toISOString(),
            avatar: 'https://picsum.photos/seed/2/200'
        },
        {
            id: 9,
            text: "Perfect. Do we need to schedule a code review meeting?",
            sender: 'other',
            timestamp: new Date(2025, 1, 11, 18, 38).toISOString(),
            avatar: 'https://picsum.photos/seed/1/200'
        },
        {
            id: 10,
            text: "How about Thursday at 2 PM? I can prepare a detailed presentation.",
            sender: 'me',
            timestamp: new Date(2025, 1, 11, 18, 39).toISOString(),
            avatar: 'https://picsum.photos/seed/2/200'
        },
        {
            id: 11,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, maxime deleniti id atque velit vitae nostrum optio quis quibusdam voluptates, porro, expedita doloribus similique eum reiciendis totam et facilis voluptate!",
            sender: 'other',
            timestamp: new Date(2025, 1, 11, 18, 40).toISOString(),
            avatar: 'https://picsum.photos/seed/1/200'
        },
        {
            id: 12,
            text: "Absolutely. I've run some initial load tests that show promising results.",
            sender: 'me',
            timestamp: new Date(2025, 1, 11, 18, 41).toISOString(),
            avatar: 'https://picsum.photos/seed/2/200'
        },
        {
            id: 13,
            text: "Looking forward to seeing the metrics. Anything else I should know?",
            sender: 'other',
            timestamp: new Date(2025, 1, 11, 18, 42).toISOString(),
            avatar: 'https://picsum.photos/seed/1/200'
        },
        {
            id: 14,
            text: "Just that we're tracking to complete the sprint two days early. Team's been doing great work!",
            sender: 'me',
            timestamp: new Date(2025, 1, 11, 18, 43).toISOString(),
            avatar: 'https://picsum.photos/seed/2/200'
        }
    ]);

    console.log("heer", data);

    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const messageToSend = {
            id: messages.length + 1,
            message: newMessage,
            sender: userId,
            receiver: 'someid',
            timestamp: new Date().toISOString(),
        };

        console.log("Sending message:", messageToSend)

        setMessages([...messages, messageToSend]);
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full">
            {/* Messages Container */}
            <div className="flex-grow overflow-y-auto max-h-[calc(100vh-9.5rem)] p-4 space-y-4  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500" >
                {messages.map((msg, index) => {
                    const formattedTime = formatMessageTime(msg.timestamp);

                    return (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}
                        >
                            {msg.sender === 'other' && (
                                <Image
                                    src={msg.avatar}
                                    alt="User avatar"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 rounded-full mr-2 self-end"
                                />
                            )}
                            <div className="flex flex-col max-w-[70%]">
                                <div
                                    className={`
                                    p-3 rounded-xl 
                                    ${msg.sender === 'me'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'}
                                    break-words whitespace-pre-wrap
                                `}
                                >
                                    {msg.text}
                                </div>
                                <div className={`text-xs text-gray-500 mt-1 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                                    {formattedTime}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area */}
            <div className="border-t border-muted p-4 bg-background">
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Smile className="h-5 w-5" />
                    </Button>
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                        placeholder="Type a message..."
                        className="flex-grow"
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={newMessage.trim() === ''}
                        variant="default"
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
