import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Phone,
  Video,
  MoreVertical,
} from 'lucide-react'
import { currentUser } from '@clerk/nextjs/server'
import { ChatsList } from '@/components/chats-list'
import { ChatMessages } from '@/components/chat-messages'


export default async function Page() {

  const user = await currentUser()
  const fullname = `${user?.firstName} ${user?.lastName}`
  return (
    <SidebarProvider>
      <AppSidebar fullname={fullname} />
      <SidebarInset>
        <div className="grid grid-cols-4 h-screen">

          {/* Sidebar Chats List */}
          <ChatsList />

          {/* Chat Window */}
          <div className="col-span-3 flex flex-col">
            {/* Chat Header */}
            <div className="border-b border-muted p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/200"
                  alt="Chat avatar"
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
      </SidebarInset>
    </SidebarProvider>
  )
}
