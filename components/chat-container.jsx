"use client";
import { ChatList } from "@/components/chat-list";
import { ChatMessages } from "@/components/chat-messages";
import { useState } from "react";

export function ChatContainer({ alluser }) {
    const [selectedChat, setSelectedChat] = useState(null);
    return (
        <>
            <ChatList alluser={alluser} onSelectChat={setSelectedChat} />
            <div className="col-span-3 flex flex-col">
                {selectedChat ? (
                    <ChatMessages {...selectedChat} />
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-center text-gray-400 mt-10">Select a chat to start or continue a conversation</p>
                    </div>
                )}
            </div>
        </>
    );
}