"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle"

const World = dynamic(() => import("../components/ui/globe").then((m) => m.World), {
  ssr: false,
});
export default function Home() {
  const router = useRouter();
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [];
  for (let i = 1; i < 15; i++) {
    sampleArcs.push({
      order: i,
      startLat: (Math.random() * 180 - 90).toFixed(6),
      startLng: (Math.random() * 360 - 180).toFixed(6),
      endLat: (Math.random() * 180 - 90).toFixed(6),
      endLng: (Math.random() * 360 - 180).toFixed(6),
      arcAlt: (Math.random() * 0.8 + 0.1).toFixed(2),
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    });
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="flex flex-row items-center justify-center py-20 h-screen dark:bg-black bg-white relative w-full">
        <div
          className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] pt-32 px-4 ">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="div">
            <h2
              className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
              Chat U & I
            </h2>
            <p
              className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
              A simple, fast, and secure way to chat U & I.
            </p>
            <div className="flex justify-center gap-2 py-5 z-30 relative">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push("/sign-in")}>
                Get Started
              </button>
            </div>
          </motion.div>
          <div
            className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-20" />
          <div className="absolute w-full top-20 h-[300%] z-10">
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 mr-2 mb-2">
        <ModeToggle />
      </div>
    </div>
  );
}
