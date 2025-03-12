import { Button } from "@/components/ui/button"
import {
  Phone,
  Video,
  MoreVertical,
} from 'lucide-react'
import { ChatsList } from '@/components/chats-list'
import { ChatMessages } from '@/components/chat-messages'
import Image from "next/image"
import { clerkClient } from "@clerk/nextjs/server"

export default async function Page() {
  const response = await clerkClient();
  const users = await response.users.getUserList();
  const {data,totalCount} = JSON.parse(JSON.stringify(users));
  // console.log(users);
  return (
    <div className="grid grid-cols-4 h-screen">

      {/* Sidebar Chats List */}
      <ChatsList alluser={data} />

      {/* Chat Window */}
      <div className="col-span-3 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-muted p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://picsum.photos/200"
              alt="Chat avatar"
              width={32}
              height={32}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">Username</h3>
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

        {/* Chat Messages */}
        <ChatMessages />
      </div>
    </div>
  )
}
