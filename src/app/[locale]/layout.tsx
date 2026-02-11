import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import { Toaster } from "sonner";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Cairo } from "next/font/google";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const cairo = Cairo({
    subsets: ["arabic"],
    variable: "--font-cairo",
});

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as "en" | "ar")) {
        notFound();
    }

    const messages = await getMessages();
    const dir = "ltr"; // User requested to never reverse layout
    const fontVariable = locale === "ar" ? cairo.variable : inter.variable;

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <body className={`${fontVariable} font-sans antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <NextIntlClientProvider messages={messages}>
                        <div className="flex min-h-screen flex-col">
                            <Navbar />
                            <main className="flex-1">{children}</main>
                            <Footer />
                        </div>
                        <Toaster />
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
