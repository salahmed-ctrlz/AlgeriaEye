import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function CulturePage() {
    return (
        <div className="space-y-8">
            <section className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Algerian Culture & Traditions</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A blend of Berber, Arab, French, and Mediterranean influences, Algerian culture is rich in music, literature, and hospitality.
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <div className="relative h-64 w-full">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fantasia_Alg%C3%A9rie.jpg/1280px-Fantasia_Alg%C3%A9rie.jpg"
                            alt="Fantasia"
                            fill
                            className="object-cover rounded-t-lg"
                        />
                    </div>
                    <CardHeader>
                        <CardTitle>Fantasia (Tbourida)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            A traditional equestrian performance simulating military assaults, often seen at weddings and festivals. Riders charge in a line and fire muskets simultaneously.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <div className="relative h-64 w-full">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Tuareg_Tea.jpg/1280px-Tuareg_Tea.jpg"
                            alt="Tea Ceremony"
                            fill
                            className="object-cover rounded-t-lg"
                        />
                    </div>
                    <CardHeader>
                        <CardTitle>The Tea Ceremony</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Serving mint tea is a central part of hospitality. In the Sahara, the Tuareg people have a specific ritual involving three rounds of tea, each with a different flavor profile.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <section className="bg-muted/50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Music: Rai & Chaabi</h3>
                <p>
                    Algerian music is world-renowned, especially <strong>Raï</strong>, which originated in Oran and speaks of social issues and love. <br />
                    <strong>Chaabi</strong> is the folk music of Algiers, characterized by mandole accompaniment and poetic lyrics.
                </p>
            </section>
        </div>
    );
}
