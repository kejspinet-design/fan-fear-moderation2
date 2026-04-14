/**
 * Cyber Dashboard Page
 * 
 * Gaming/Cyberpunk styled dashboard with animated rule cards
 */

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { CyberRuleCard } from '@/components/content/CyberRuleCard';

export default function DashboardPage() {
  const [discordSections, setDiscordSections] = useState<any[] | null>(null);
  const [twitchSections, setTwitchSections] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch Discord data
        console.log('Fetching Discord rules...');
        const rulesRes = await fetch('/api/rules/discord');
        console.log('Discord response status:', rulesRes.status);
        if (rulesRes.ok) {
          const rulesData = await rulesRes.json();
          console.log('Discord data:', rulesData);
          setDiscordSections(rulesData.sections);
        } else {
          console.error('Discord fetch failed:', rulesRes.status, rulesRes.statusText);
        }

        // Fetch Twitch data
        console.log('Fetching Twitch rules...');
        const twitchRes = await fetch('/api/rules/twitch');
        console.log('Twitch response status:', twitchRes.status);
        if (twitchRes.ok) {
          const twitchData = await twitchRes.json();
          console.log('Twitch data:', twitchData);
          setTwitchSections(twitchData.sections);
        } else {
          console.error('Twitch fetch failed:', twitchRes.status, twitchRes.statusText);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <MainLayout user={null}>
        <div className="flex items-center justify-center min-h-[60vh] z-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-cyan-400 font-bold">Загрузка...</p>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  // Separate rules and warnings sections
  const getMainSections = (sections: any[]) => {
    return sections?.filter(s => !s.title.toLowerCase().includes('выговор')) || [];
  };

  const getWarningSections = (sections: any[]) => {
    return sections?.filter(s => s.title.toLowerCase().includes('выговор')) || [];
  };

  // Format rules for display
  const formatRulesForDisplay = (rules: any[]) => {
    return rules.map(rule => {
      const parts = [`${rule.number}. ${rule.title}`, rule.text];
      if (rule.penalty) {
        parts.push(`Наказание: ${rule.penalty}`);
      }
      return parts.join(' — ');
    });
  };

  const discordMainSections = discordSections ? getMainSections(discordSections) : [];
  const discordWarningSections = discordSections ? getWarningSections(discordSections) : [];
  const twitchMainSections = twitchSections ? getMainSections(twitchSections) : [];
  const twitchWarningSections = twitchSections ? getWarningSections(twitchSections) : [];

  return (
    <MainLayout user={null}>
      <div className="z-content relative">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 glitch-text" data-text="Fan-Fear">
            Fan-Fear
          </h1>
          <p className="text-xl text-cyan-400/80 font-semibold tracking-wider uppercase">
            Система правил модерации
          </p>
        </motion.div>

        {/* Debug Info */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 rounded-xl backdrop-blur-md text-center"
            style={{ background: 'rgba(0, 217, 255, 0.1)', border: '1px solid rgba(0, 217, 255, 0.2)' }}
          >
            <p className="text-cyan-400 font-semibold">
              Discord секций: {discordSections?.length || 0} | 
              Twitch секций: {twitchSections?.length || 0}
            </p>
            {error && <p className="text-red-400 mt-2">Ошибка: {error}</p>}
          </motion.div>
        )}

        {/* Rule Cards Grid */}
        <div className="space-y-12 max-w-7xl mx-auto">
          {/* Discord Rules */}
          {discordMainSections.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-center text-cyan-400">Discord Модерация</h2>
              
              {/* Main Rules */}
              <div className="grid grid-cols-1 gap-6">
                {discordMainSections.map((section, idx) => (
                  <CyberRuleCard
                    key={section.id}
                    title={section.title}
                    color="blue"
                    icon={
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    }
                    rules={formatRulesForDisplay(section.rules)}
                  />
                ))}
              </div>

              {/* Warning Removal Section */}
              {discordWarningSections.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-black text-center text-yellow-400 mb-6">Снятие выговоров</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {discordWarningSections.map((section) => (
                      <CyberRuleCard
                        key={section.id}
                        title={section.title}
                        color="blue"
                        icon={
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        }
                        rules={formatRulesForDisplay(section.rules)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Twitch Rules */}
          {twitchMainSections.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-center text-purple-400">Twitch Модерация</h2>
              
              {/* Main Rules */}
              <div className="grid grid-cols-1 gap-6">
                {twitchMainSections.map((section) => (
                  <CyberRuleCard
                    key={section.id}
                    title={section.title}
                    color="purple"
                    icon={
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                      </svg>
                    }
                    rules={formatRulesForDisplay(section.rules)}
                  />
                ))}
              </div>

              {/* Warning Removal Section */}
              {twitchWarningSections.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-black text-center text-yellow-400 mb-6">Снятие выговоров</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {twitchWarningSections.map((section) => (
                      <CyberRuleCard
                        key={section.id}
                        title={section.title}
                        color="purple"
                        icon={
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        }
                        rules={formatRulesForDisplay(section.rules)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md"
            style={{ background: 'rgba(0, 217, 255, 0.1)', border: '1px solid rgba(0, 217, 255, 0.2)' }}
          >
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-white/80 font-semibold">Система активна</span>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}