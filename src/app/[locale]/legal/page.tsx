import { useTranslations } from "next-intl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function LegalPage() {
    const t = useTranslations("footer");

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Legal & Support</h1>

            {/* Privacy Policy */}
            <section id="privacy" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("privacy")}</h2>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-4">
                    <p>
                        At Algeria Eye, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website including any other media form, media channel, mobile website, or mobile application related or connected thereto.
                    </p>
                    <p>
                        We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                    </p>
                    <ul className="list-disc pl-6">
                        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                    </ul>
                    <p>
                        We use the information we collect to provider specific services to you, to improve user experience, and to send you information about new features and services.
                    </p>
                </div>
            </section>

            <Separator className="my-8" />

            {/* Terms of Service */}
            <section id="terms" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">{t("terms")}</h2>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-4">
                    <p>
                        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Algeria Eye (“we,” “us” or “our”), concerning your access to and use of the algeriaeye.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
                    </p>
                    <p>
                        You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
                    </p>
                    <p>
                        <strong>User Representations:</strong> By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
                    </p>
                </div>
            </section>

            <Separator className="my-8" />

            {/* FAQ */}
            <section id="faq" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How do I book a hotel?</AccordionTrigger>
                        <AccordionContent>
                            You can browse our extensive list of hotels in the "Explore" section. Once you find a hotel you like, simply click "Book Now" and follow the instructions to secure your reservation.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is payment secure?</AccordionTrigger>
                        <AccordionContent>
                            Yes, we use industry-standard encryption to protect your payment details. We verify all hosts and partners to ensure a safe transaction.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Can I cancel my booking?</AccordionTrigger>
                        <AccordionContent>
                            Cancellation policies vary by property. You can review the cancellation policy for each listing before booking. Generally, you can cancel within a certain timeframe for a full refund.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>How can I become a host?</AccordionTrigger>
                        <AccordionContent>
                            To become a host, sign up for an account and select "Property Owner" as your role. You can then list your properties through your dashboard.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </div>
    );
}
