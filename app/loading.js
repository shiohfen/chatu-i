import { LoaderCircle } from "lucide-react";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex h-screen justify-center items-center">
            Loading <LoaderCircle className="animate-spin" />
        </div>
    )
}