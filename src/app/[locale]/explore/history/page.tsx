import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function HistoryPage() {
    return (
        <div className="space-y-8">
            <section className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Historical Landmarks</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    From Roman ruins to Islamic architecture, Algeria's history spans millennia.
                </p>
            </section>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Timgad_Arch_of_Trajan.jpg/1280px-Timgad_Arch_of_Trajan.jpg"
                            alt="Timgad"
                            fill
                            className="object-cover rounded-t-lg"
                        />
                    </div>
                    <CardHeader>
                        <CardTitle>Timgad (Thamugadi)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Known as the "Pompeii of Africa", this Roman city in the Aurès Mountains is a UNESCO World Heritage site featuring a massive grid layout, library, and arch.
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Grande_Poste_D%27Alger_01.jpg/800px-Grande_Poste_D%27Alger_01.jpg"
                            alt="Grand Post Office"
                            fill
                            className="object-cover rounded-t-lg"
                        />
                    </div>
                    <CardHeader>
                        <CardTitle>Grande Poste d'Alger</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            A masterpiece of Neo-Moorish architecture built in 1910, serving as a symbol of Algiers center.
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Beni_Hammad_Fort.jpg/1280px-Beni_Hammad_Fort.jpg"
                            alt="Beni Hammad"
                            fill
                            className="object-cover rounded-t-lg"
                        />
                    </div>
                    <CardHeader>
                        <CardTitle>Al Qal'a of Beni Hammad</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            The first capital of the Hammadid emirs, founded in 1007. It is home to one of the largest mosques in Algeria.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
