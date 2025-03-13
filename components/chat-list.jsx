"use client";
import { Input } from "@/components/ui/input";
import { MessageCirclePlus } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "@/components/ui/animated-modal";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";

export function ChatList({alluser, onSelectChat}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [chats, setChats] = useState([]);

    useEffect(() => {
        setChats(alluser);
    }, [alluser]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        // Filter chats based on username or last message
        const filteredChats = chats.filter(chat =>
            chat.firstName.toLowerCase().includes(term.toLowerCase()) ||
            chat.lastName.toLowerCase().includes(term.toLowerCase())
        );

        setChats(filteredChats);
    };

    const handleNewChat = () => {
        // TODO: Implement new chat creation logic
        console.log('Create new chat');
    };

    const handleChatSelect = (chat) => {
        onSelectChat({
            receiverId: chat.id,
            receiverName: `${chat.firstName} ${chat.lastName}`,
        });
    };

    const modalImages = [
        "https://picsum.photos/600/600?random=1",
        "https://picsum.photos/600/600?random=2",
        "https://picsum.photos/600/600?random=3",
        "https://picsum.photos/600/600?random=4",
    ];

    return (
        <div className="flex flex-col col-span-1 border-r border-muted bg-muted/30">
            <div className="px-4">
                <h3 className="font-bold text-xl py-2 border-b border-muted">Chats</h3>
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
                                    {modalImages.map((image, idx) => (
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
            <div className="space-y-2 overflow-y-auto px-4 h-[calc(100vh-11.6rem)]">
                {alluser && chats.map((chat) => (
                    <div
                        key={chat.id}
                        className="bg-muted hover:bg-gray-800 rounded-lg p-3 flex items-center gap-3 cursor-pointer"
                        onClick={() => handleChatSelect(chat)}
                    >
                        <div className="relative px-2">
                            <Image
                                src={chat.imageUrl}
                                alt={`${chat.firstName}'s avatar`}
                                width={48}
                                height={48}
                                className="scale-125 rounded-full object-cover"
                            />
                            {chat.online ? (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            ): (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full border-2 border-white" />
                            )}
                        </div>
                        <div className="flex-grow overflow-hidden">
                            <h4 className="font-semibold text-gray-300 truncate">{chat.firstName} {chat.lastName}</h4>
                            <p className="text-sm text-muted-foreground truncate">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita officiis minima accusamus.
                            </p>
                        </div>
                        <span className="text-xs text-muted-foreground">{chat.lastActiveAt}</span>
                    </div>
                ))}
                {chats.length === 0 && (
                    <p className="text-center text-muted-foreground">No chats found</p>
                )}
            </div>
            <div className="flex items-center justify-between px-4 pt-4 border-t border-muted">
                <div className="flex items-center gap-2">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"></div><div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-semibold">Chat U &amp; I</span></div>
                </div>
                <div>
                    <UserButton />
                </div>
            </div>
        </div>
    );
}   
