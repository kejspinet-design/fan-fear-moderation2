/**
 * Rule Section Component
 * 
 * Displays a section of rules with hierarchical structure.
 * Supports subsections and penalty display.
 * Shows edit controls for Rule Editors.
 * 
 * **Validates: Requirements 6.1, 6.3, 7.2, 7.3**
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RuleContent } from '@/types/rules';
import { FadeInText } from '@/components/animations/FadeInText';

interface RuleSectionProps {
  title: string;
  content: RuleContent[];
  editable: boolean;
  onSave?: (content: RuleContent[]) => Promise<void>;
}

/**
 * RuleSection component for displaying and editing rules
 * 
 * @param title - Section title
 * @param content - Array of rule content
 * @param editable - Whether rules can be edited
 * @param onSave - Callback when rules are saved
 */
export function RuleSection({ title, content, editable, onSave }: RuleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-6">
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 glass-hover rounded-xl mb-4 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <motion.svg
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {content.map((rule, index) => (
              <FadeInText key={rule.id} delay={index * 0.1}>
                <RuleItem 
                  rule={rule} 
                  editable={editable}
                  onUpdate={onSave ? async (updatedRule) => {
                    const updatedContent = content.map(r => 
                      r.id === updatedRule.id ? updatedRule : r
                    );
                    await onSave(updatedContent);
                  } : undefined}
                />
              </FadeInText>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface RuleItemProps {
  rule: RuleContent;
  editable: boolean;
  onUpdate?: (rule: RuleContent) => Promise<void>;
}

function RuleItem({ rule, editable, onUpdate }: RuleItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(rule.text);

  const handleSave = async () => {
    if (onUpdate) {
      await onUpdate({
        ...rule,
        text: editedText,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(rule.text);
    setIsEditing(false);
  };

  return (
    <div className="glass p-4 rounded-xl">
      <div className="flex items-start justify-between mb-2">
        <span className="text-purple-300 font-semibold text-sm">
          {rule.number}
        </span>
        {editable && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white resize-none"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-colors text-sm"
            >
              Сохранить
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 rounded-lg transition-colors text-sm"
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-white/90 mb-2">{rule.text}</p>
          {rule.penalty && (
            <div className="text-orange-300 text-sm font-medium">
              Наказание: {rule.penalty}
            </div>
          )}
        </>
      )}
    </div>
  );
}