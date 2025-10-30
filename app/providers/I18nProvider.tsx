"use client";

import i18n from "@/src/lib/i18n";
import { ReactNode, useEffect, useState } from "react";

interface I18nProviderProps {
    children: ReactNode;
    initialLanguage?: string;
}

export default function I18nProvider({
    children,
    initialLanguage = 'th'
}: I18nProviderProps) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Initialize i18n and set up language detection
        const initializeI18n = async () => {
            try {
                // Check if we're on client side
                if (typeof window !== 'undefined') {
                    // Get saved language preference or use initial language
                    const savedLanguage = localStorage.getItem('language') || initialLanguage;

                    // Change language if different from current
                    if (i18n.language !== savedLanguage) {
                        await i18n.changeLanguage(savedLanguage);
                    }
                }

                setIsReady(true);
                console.log("i18n initialized with language:", i18n.language);
            } catch (error) {
                console.error("Error initializing i18n:", error);
                setIsReady(true); // Still render children even if there's an error
            }
        };

        initializeI18n();

        // Listen for language changes
        const handleLanguageChange = (lng: string) => {
            console.log("Language changed to:", lng);
        };

        i18n.on('languageChanged', handleLanguageChange);

        // Cleanup
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [initialLanguage]);

    // Show loading state while initializing (optional)
    if (!isReady) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return <>{children}</>;
}