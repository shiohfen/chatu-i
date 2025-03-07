"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCirclePlus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "@/components/ui/animated-modal";
import { motion } from "framer-motion";

// Mock data - replace with actual data fetching later
const mockChats = [
    { id: 1, username: 'Alice', lastMessage: 'Hey, how are you?', avatar: 'https://picsum.photos/seed/1/200', time: '2m', online: true },
    { id: 2, username: 'Bob', lastMessage: 'Meeting at 3 PM', avatar: 'https://picsum.photos/seed/2/200', time: '10m', online: false },
    // Add more mock chats as needed
];

export function ChatsList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [chats, setChats] = useState(mockChats);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        // Filter chats based on username or last message
        const filteredChats = mockChats.filter(chat =>
            chat.username.toLowerCase().includes(term.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(term.toLowerCase())
        );

        setChats(filteredChats);
    };

    const handleNewChat = () => {
        // TODO: Implement new chat creation logic
        console.log('Create new chat');
    };

    const images = [
        "https://picsum.photos/600/600?random=1",
        "https://picsum.photos/600/600?random=2",
        "https://picsum.photos/600/600?random=3",
        "https://picsum.photos/600/600?random=4",
    ];

    return (
        <div className="col-span-1 border-r border-muted p-4 bg-muted/30">
            <div className="mb-4">
                <h3 className="font-bold text-xl pb-2 border-b border-muted">Chats</h3>
                <div className="flex items-center gap-2 my-4">
                    <Input
                        type="text"
                        placeholder="Search chats"
                        className="flex-grow"
                        value={searchTerm}
                        onChange={handleSearch}
                    />

                    <Modal>
                        <ModalTrigger
                            variant="outline"
                            size="icon"
                            onClick={handleNewChat}>
                            <MessageCirclePlus />
                        </ModalTrigger>
                        <ModalBody>
                            <ModalContent>
                                <h4
                                    className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                                    Book your trip to{" "}
                                    <span
                                        className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                                        Bali
                                    </span>{" "}
                                    now! ✈️
                                </h4>
                                <div className="flex justify-center items-center">
                                    {images.map((image, idx) => (
                                        <motion.div
                                            key={"images" + idx}
                                            style={{
                                                rotate: Math.random() * 20 - 10,
                                            }}
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: 0,
                                                zIndex: 100,
                                            }}
                                            whileTap={{
                                                scale: 1.1,
                                                rotate: 0,
                                                zIndex: 100,
                                            }}
                                            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden">
                                            <Image
                                                src={image}
                                                alt="bali images"
                                                width="500"
                                                height="500"
                                                className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0" />
                                        </motion.div>
                                    ))}
                                </div>
                                <div
                                    className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos doloremque labore odit laborum ducimus velit iusto! Facilis, officia sapiente nesciunt corporis commodi, dignissimos eum consequuntur eos maxime, doloremque suscipit neque.
                                </div>
                            </ModalContent>
                            <ModalFooter className="gap-4">
                                <button
                                    className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                                    Cancel
                                </button>
                                <button
                                    className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                                    Book Now
                                </button>
                            </ModalFooter>
                        </ModalBody>
                    </Modal>

                </div>
            </div>
            {/* Chat List Scrollable Area */}
            <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-8.7rem)]">
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className="bg-muted hover:bg-gray-800 rounded-lg p-3 flex items-center gap-3 cursor-pointer"
                    >
                        <div className="relative">
                            <Image
                                src={chat.avatar}
                                alt={`${chat.username}'s avatar`}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            {chat.online && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            )}
                        </div>
                        <div className="flex-grow overflow-hidden">
                            <h4 className="font-semibold text-gray-300 truncate">{chat.username}</h4>
                            <p className="text-sm text-muted-foreground truncate">
                                {chat.lastMessage}
                            </p>
                        </div>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                ))}
                {chats.length === 0 && (
                    <p className="text-center text-muted-foreground">No chats found</p>
                )}
            </div>
        </div>
    );
}
