import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ExploreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Ghardaia_M%27zab.jpg/1280px-Ghardaia_M%27zab.jpg"
                    alt="Algeria Culture"
                    fill
                    className="object-cover brightness-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 shadow-sm">Explore Algeria</h1>
                    <p className="text-lg text-gray-200 max-w-2xl">Discover the rich history, vibrant culture, and delicious cuisine of the largest country in Africa.</p>
                </div>
                <div className="absolute top-4 left-4">
                    <Link href="/en">
                        <Button variant="ghost" className="text-white hover:bg-white/20">
                            <ArrowLeft className="h-5 w-5 mr-2" /> Back Home
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b bg-muted/30 sticky top-0 z-10 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex overflow-x-auto">
                    {[
                        { name: "Culture & Traditions", path: "/explore/culture" },
                        { name: "History & Landmarks", path: "/explore/history" },
                        { name: "Food & Cuisine", path: "/explore/food" },
                        { name: "Traditional Clothing", path: "/explore/clothing" },
                    ].map((item) => (
                        <Link key={item.path} href={`/en${item.path}`} className="flex-shrink-0">
                            <div className="px-6 py-4 font-medium text-sm text-muted-foreground hover:text-brand hover:bg-brand/5 border-b-2 border-transparent hover:border-brand transition-colors">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}
