import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function LegalPage() {
    const t = useTranslations("legal");

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>

            {/* Privacy Policy */}
            <section id="privacy" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("privacy.title")}</h2>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-4">
                    <p>{t("privacy.p1")}</p>
                    <p>{t("privacy.p2")}</p>
                    <ul className="list-disc pl-6">
                        <li>{t("privacy.list1")}</li>
                        <li>{t("privacy.list2")}</li>
                    </ul>
                    <p>{t("privacy.p3")}</p>
                </div>
            </section>

            <Separator className="my-8" />

            {/* Terms of Service */}
            <section id="terms" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("terms.title")}</h2>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-4">
                    <p>{t("terms.p1")}</p>
                    <p>{t("terms.p2")}</p>
                    <p>{t("terms.p3")}</p>
                </div>
            </section>

            <Separator className="my-8" />

            {/* FAQ */}
            <section id="faq" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("faq.title")}</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>{t("faq.q1")}</AccordionTrigger>
                        <AccordionContent>{t("faq.a1")}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>{t("faq.q2")}</AccordionTrigger>
                        <AccordionContent>{t("faq.a2")}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>{t("faq.q3")}</AccordionTrigger>
                        <AccordionContent>{t("faq.a3")}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>{t("faq.q4")}</AccordionTrigger>
                        <AccordionContent>{t("faq.a4")}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </div>
    );
}
