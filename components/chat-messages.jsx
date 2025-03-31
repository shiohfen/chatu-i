"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Send, Paperclip, Smile, LoaderCircle, Phone, Video, MoreVertical } from 'lucide-react';
import useSWR from "swr";
import { useAuth } from '@clerk/clerk-react';



const fetcher = (url) => fetch(url).then((res) => res.json());

export function ChatMessages({ receiverId, receiverName }) {
    const formatMessageTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
    
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    
        return date.toLocaleString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const { userId, isLoaded } = useAuth();
    const { data, mutate, error, isLoading } = useSWR(receiverId && userId ? `/api/chat-messages?receiverId=${receiverId}&senderId=${userId}` : null, fetcher);

    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!isLoading && isLoaded) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [data, isLoading, isLoaded]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageToSend = {
            message: newMessage,
            sender: userId,
            receiver: receiverId,
        };

        try {
            await fetch("/api/chat-messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messageToSend),
            });
            mutate();
            setNewMessage('');
        } catch (err) {
            console.error("Error adding message:", err);
        }
    };

    return (
        <>
            <div className="border-b border-muted p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image src="https://picsum.photos/200" alt="Chat avatar" width={32} height={32} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <h3 className="font-semibold">{receiverName}</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-green-500 rounded-full border-2 border-white block"></span>
                            <p className="text-sm text-muted-foreground">Online</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Phone /></Button>
                    <Button variant="ghost" size="icon"><Video /></Button>
                    <Button variant="ghost" size="icon"><MoreVertical /></Button>
                </div>
            </div>
            <div className="flex flex-col h-full">
                <div className="flex-grow overflow-y-auto max-h-[calc(100vh-9.4rem)] p-4 space-y-4">
                    {isLoading && (
                        <div className="flex justify-center items-center h-full">
                            <LoaderCircle className="animate-spin text-gray-500" />
                            <p className="text-center text-gray-500 font-bold ml-2">Loading...</p>
                        </div>
                    )}
                    {isLoaded && !isLoading && data.length === 0 && (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-center text-gray-500 font-bold">This is the start of your conversation</p>
                        </div>
                    )}
                    {data?.map(msg => (
                        <div key={msg._id} className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'} mb-4`}>
                            {msg.sender !== userId && (
                                <Image src="https://picsum.photos/200" alt="User avatar" width={32} height={32} className="w-8 h-8 rounded-full mr-2 self-end" />
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
        </>
    );
}
