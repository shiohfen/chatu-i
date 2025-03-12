"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Send, Paperclip, Smile, LoaderCircle } from 'lucide-react';
import useSWR from "swr";
import { useAuth } from '@clerk/clerk-react'

const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (date > weekAgo) {
        return date.toLocaleDateString([], { weekday: 'short' });
    }

    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export function ChatMessages() {
    const { userId, isLoaded } = useAuth();
    const { data, mutate, error, isLoading } = useSWR("/api/chat-messages", fetcher);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!isLoading && isLoaded) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [data, isLoading, isLoaded]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const messageToSend = {
            message: newMessage,
            sender: userId,
            receiver: 'someid',
        };

        fetch("/api/chat-messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(messageToSend),
        })
            .then((res) => res.json())
            .then(() => mutate())
            .catch((err) => console.error("Error adding message:", err))
            .finally(() => {
                setNewMessage('');
            });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto max-h-[calc(100vh-9.4rem)] p-4 space-y-4" >
                {isLoading && !isLoaded && (
                    <div className="flex justify-center">
                        <p className="text-center text-gray-500 font-bold">Loading </p> <LoaderCircle className="animate-spin text-gray-500" />
                    </div>
                )}
                {isLoaded && !isLoading && data?.length === 0 && (
                    <div className="flex justify-center">
                        <p className="text-center text-gray-500 font-bold">No messages</p>
                    </div>
                )}
                {isLoaded && !isLoading && data?.length > 0 && data?.map((msg) => (
                    <div key={msg._id} className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'} mb-4`}>
                        {msg.sender !== userId && (
                            <Image
                                src="https://picsum.photos/200"
                                alt="User avatar"
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full mr-2 self-end"
                            />
                        )}
                        <div className="flex flex-col max-w-[70%]">
                            <div className={`p-3 rounded-xl ${msg.sender === userId ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>{msg.message}</div>
                            <div className={`text-xs text-gray-500 mt-1 ${msg.sender === userId ? 'text-right' : 'text-left'}`}>{formatMessageTime(msg.timestamp)}</div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-muted p-4 bg-background">
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon"><Paperclip className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><Smile className="h-5 w-5" /></Button>
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-grow"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()} variant="default">
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
