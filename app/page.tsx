"use client";

import { useI18n } from "@/src/hooks/useI18n";
import { LanguageSwitcher } from "@/src/components";

export default function Home() {
  const { t } = useI18n();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🧟</span>
            <h1 className="text-xl font-bold text-white">{t('title')}</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 w-full max-w-md">
          {/* Tagline */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-300 italic">Survive the Infection!</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
              {t('game.startGame')}
            </button>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
              {t('auth.login')}
            </button>
            
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
              {t('auth.register')}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <span className="mr-2">💀</span>
            <span>Version 0.1</span>
          </div>
          <div className="flex items-center cursor-pointer hover:text-gray-300 transition-colors">
            <span className="mr-2">⚙️</span>
            <span>{t('settings.settings')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
