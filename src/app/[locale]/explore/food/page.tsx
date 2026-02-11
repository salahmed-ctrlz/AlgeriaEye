import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function FoodPage() {
    return (
        <div className="space-y-8">
            <section className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Taste of Algeria</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Mediterranean flavors meet African spices. Couscous, Tajine, and sweet honey pastries await.
                </p>
            </section>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        title: "Couscous",
                        desc: "The national dish, steamed semolina granules usually served with a stew of vegetables and meat.",
                        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Couscous_Royal.jpg/1280px-Couscous_Royal.jpg"
                    },
                    {
                        title: "Chakhchoukha",
                        desc: "A chaotic mix of torn flatbread pieces soaked in a spicy tomato sauce with chickpeas and meat.",
                        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Chakhchoukha_Biskra.jpg/1280px-Chakhchoukha_Biskra.jpg"
                    },
                    {
                        title: "Mhajeb",
                        desc: "Flaky, stuffed flatbread usually filled with a spicy onion and tomato mixture. A popular street food.",
                        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Mhajeb.jpg/1280px-Mhajeb.jpg"
                    },
                    {
                        title: "Kalb El Louz",
                        desc: "A semolina-based dessert soaked in syrup and rose water, meaning 'Heart of the Almond'.",
                        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kelb_el_louz_01.jpg/1280px-Kelb_el_louz_01.jpg"
                    }
                ].map((dish, i) => (
                    <Card key={i} className="overflow-hidden">
                        <div className="relative h-40 w-full">
                            <Image
                                src={dish.img}
                                alt={dish.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardHeader className="p-4">
                            <CardTitle className="text-lg">{dish.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground">{dish.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
