import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ClothingPage() {
    return (
        <div className="space-y-8">
            <section className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Traditional Attire</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A colorful display of heritage, varying significantly from region to region.
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="flex flex-col md:flex-row overflow-hidden">
                    <div className="relative h-64 md:h-auto md:w-1/2">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Karakou_alg%C3%A9rois.jpg/800px-Karakou_alg%C3%A9rois.jpg"
                            alt="Karakou"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6 md:w-1/2 flex flex-col justify-center">
                        <CardTitle className="mb-2">The Karakou</CardTitle>
                        <p className="text-muted-foreground">
                            Originating from Algiers, this consists of a velvet jacket embroidered with gold threads (Majboud) and usually worn with 'Seroual Chelqa' (traditional trousers).
                        </p>
                    </div>
                </Card>

                <Card className="flex flex-col md:flex-row overflow-hidden">
                    <div className="relative h-64 md:h-auto md:w-1/2">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Chedda_Tlemcen_Wedding_Dress.jpg/800px-Chedda_Tlemcen_Wedding_Dress.jpg"
                            alt="Chedda"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6 md:w-1/2 flex flex-col justify-center">
                        <CardTitle className="mb-2">Chedda of Tlemcen</CardTitle>
                        <p className="text-muted-foreground">
                            A UNESCO Intangible Cultural Heritage, this bridal dress from Tlemcen involves layers of fabric, jewelry, and a conical hat.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
