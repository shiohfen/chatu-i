import { clerkClient } from "@clerk/nextjs/server"
import { ChatContainer } from "@/components/chat-container";
import { auth } from '@clerk/nextjs/server'

export default async function Page() {
  const { userId } = await auth()
  const response = await clerkClient();
  const users = await response.users.getUserList({
    userId:`-${userId}`
  });
  const {data,totalCount} = JSON.parse(JSON.stringify(users));
  return (
    <div className="grid grid-cols-4 h-screen">
      <ChatContainer alluser={data} />
    </div>
  )
}
