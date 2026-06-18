import type { Metadata } from "next";
import { DM_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { GuestProvider } from "@/context/GuestContext";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { BranchProvider } from "@/context/BranchContext";
import { CartProvider } from "@/context/CartContext";
import { PickAndGoProvider } from "@/context/PickAndGoContext";
import { UserDataProvider } from "@/context/userDataContext";
import { PaymentProvider } from "@/context/PaymentContext";
import { PepperProvider } from "@/context/PepperContext";
import AuthCartSync from "@/components/AuthCartSync";
import Script from "next/script";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Even Pick & Go",
  description: "Ordena, paga y recoge. Tu comida lista cuando llegues",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? undefined;
  void nonce;

  return (
    <html lang="es">
      <body
        className={`${dmMono.variable} ${jakarta.variable} antialiased`}
        style={{ fontFamily: "var(--font-dm-mono)" }}
      >
        <Script
          src="https://ecartpay.com/sdk/pay.js?v=2"
          strategy="afterInteractive"
        />
        <AuthProvider>
          <GuestProvider>
            <BranchProvider>
              <RestaurantProvider>
                <CartProvider>
                  <AuthCartSync />
                  <PepperProvider>
                    <PickAndGoProvider>
                      <PaymentProvider>
                        <UserDataProvider>{children}</UserDataProvider>
                      </PaymentProvider>
                    </PickAndGoProvider>
                  </PepperProvider>
                </CartProvider>
              </RestaurantProvider>
            </BranchProvider>
          </GuestProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
