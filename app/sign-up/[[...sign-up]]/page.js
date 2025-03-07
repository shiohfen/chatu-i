"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "../../../components/ui/aurora-background";
import { SignUp } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { House } from "lucide-react"
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return <>
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <div className="flex items-center justify-center h-screen">
                    <div>
                        <div className="flex justify-center mb-4">
                            <Button className="bg-white text-black dark:bg-white dark:text-black shadow-lg hover:bg-gray-200 border border-gray-200" onClick={() => router.push("/")}>
                                Go back home <House />
                            </Button>
                        </div>
                        <SignUp />
                    </div>
                </div>
            </motion.div>
        </AuroraBackground>
    </>
}