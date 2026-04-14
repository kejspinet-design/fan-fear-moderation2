/**
 * Rule Editor Component
 * 
 * Inline editor for modifying rule content.
 * Only visible to Rule Editors.
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { RuleContent } from '@/types/rules';

interface RuleEditorProps {
  rule: RuleContent;
  onUpdate: (updatedRule: RuleContent) => Promise<void>;
  onCancel: () => void;
}

export function RuleEditor({ rule, onUpdate, onCancel }: RuleEditorProps) {
  const [editedRule, setEditedRule] = useState<RuleContent>(rule);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await onUpdate(editedRule);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при сохранении');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedRule(rule);
    onCancel();
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="cyber-card p-6 my-4"
    >
      <h3 className="text-xl font-bold text-cyan-400 mb-4">Редактирование правила</h3>

      {error && (
        <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(255, 0, 110, 0.1)', border: '1px solid rgba(255, 0, 110, 0.3)' }}>
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Number */}
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-2">
            Номер правила
          </label>
          <input
            type="text"
            value={editedRule.number}
            onChange={(e) => setEditedRule({
              ...editedRule,
              number: e.target.value
            })}
            className="w-full px-4 py-2 rounded-lg backdrop-blur-md text-white"
            style={{ background: 'rgba(0, 217, 255, 0.1)', border: '1px solid rgba(0, 217, 255, 0.3)' }}
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-2">
            Заголовок
          </label>
          <input
            type="text"
            value={editedRule.title}
            onChange={(e) => setEditedRule({
              ...editedRule,
              title: e.target.value
            })}
            className="w-full px-4 py-2 rounded-lg backdrop-blur-md text-white"
            style={{ background: 'rgba(0, 217, 255, 0.1)', border: '1px solid rgba(0, 217, 255, 0.3)' }}
          />
        </div>

        {/* Text */}
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-2">
            Текст правила
          </label>
          <textarea
            value={editedRule.text}
            onChange={(e) => setEditedRule({
              ...editedRule,
              text: e.target.value
            })}
            rows={3}
            className="w-full px-4 py-2 rounded-lg backdrop-blur-md text-white resize-none"
            style={{ background: 'rgba(0, 217, 255, 0.1)', border: '1px solid rgba(0, 217, 255, 0.3)' }}
          />
        </div>

        {/* Penalty */}
        <div>
          <label className="block text-sm font-semibold text-white/80 mb-2">
            Условия снятия выговора
          </label>
          <textarea
            value={editedRule.penalty || ''}
            onChange={(e) => setEditedRule({
              ...editedRule,
              penalty: e.target.value || null
            })}
            rows={2}
            className="w-full px-4 py-2 rounded-lg backdrop-blur-md text-white resize-none"
            style={{ background: 'rgba(0, 217, 255, 0.1)', border: '1px solid rgba(0, 217, 255, 0.3)' }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          className="cyber-btn flex-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSaving ? 'Сохранение...' : 'Сохранить'}
        </motion.button>
        <motion.button
          onClick={handleCancel}
          disabled={isSaving}
          className="px-6 py-3 rounded-lg font-bold text-white/80 hover:text-white transition-all"
          style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Отмена
        </motion.button>
      </div>
    </motion.div>
  );
}
