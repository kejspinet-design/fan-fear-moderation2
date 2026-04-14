/**
 * Data Layer Module Exports
 * 
 * Provides centralized exports for all data layer services.
 */

import { FileStorage } from './file-storage';
import { BackupManager } from './backup-manager';
import { RuleRepository } from './rule-repository';

export { FileStorage, BackupManager, RuleRepository };

/**
 * Creates a configured RuleRepository instance with default settings
 * @param dataPath - Base path for data storage (default: './data')
 * @returns Configured RuleRepository instance
 */
export function createRuleRepository(dataPath: string = './data'): RuleRepository {
  const fileStorage = new FileStorage(dataPath);
  const backupManager = new BackupManager(fileStorage, 'backups');
  return new RuleRepository(fileStorage, backupManager);
}
