/**
 * Rule Repository
 * 
 * Provides CRUD operations for rule content with integrated backup management.
 * Ensures data integrity by creating backups before updates.
 */

import { RuleContent, DiscordRulesStorage, TwitchRulesStorage } from '@/types/rules';
import { FileStorage } from './file-storage';
import { BackupManager } from './backup-manager';

/**
 * Repository for managing rule content with backup support
 */
export class RuleRepository {
  private fileStorage: FileStorage;
  private backupManager: BackupManager;

  /**
   * Creates a new RuleRepository instance
   * @param fileStorage - FileStorage instance for file operations
   * @param backupManager - BackupManager instance for backup operations
   */
  constructor(fileStorage: FileStorage, backupManager: BackupManager) {
    this.fileStorage = fileStorage;
    this.backupManager = backupManager;
  }

  /**
   * Reads Discord rules from storage
   * @returns Discord rules storage object
   * @throws Error if rules cannot be read
   */
  async getDiscordRules(): Promise<DiscordRulesStorage> {
    try {
      return await this.fileStorage.read<DiscordRulesStorage>('rules/discord-rules.json');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get Discord rules: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Reads Twitch rules from storage
   * @returns Twitch rules storage object
   * @throws Error if rules cannot be read
   */
  async getTwitchRules(): Promise<TwitchRulesStorage> {
    try {
      return await this.fileStorage.read<TwitchRulesStorage>('rules/twitch-rules.json');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get Twitch rules: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Updates Discord rules with automatic backup creation
   * @param rules - Updated Discord rules storage object
   * @returns Path to the created backup file
   * @throws Error if update fails or backup cannot be created
   */
  async updateDiscordRules(rules: DiscordRulesStorage): Promise<string> {
    const filePath = 'rules/discord-rules.json';
    
    try {
      // Create backup before updating
      const backupPath = await this.backupManager.createBackup(filePath);
      
      // Update lastModified timestamp
      rules.lastModified = new Date().toISOString();
      
      // Write updated rules
      await this.fileStorage.write(filePath, rules);
      
      // Cleanup old backups (keep last 10)
      await this.backupManager.cleanupOldBackups(filePath, 10);
      
      return backupPath;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update Discord rules: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Updates Twitch rules with automatic backup creation
   * @param rules - Updated Twitch rules storage object
   * @returns Path to the created backup file
   * @throws Error if update fails or backup cannot be created
   */
  async updateTwitchRules(rules: TwitchRulesStorage): Promise<string> {
    const filePath = 'rules/twitch-rules.json';
    
    try {
      // Create backup before updating
      const backupPath = await this.backupManager.createBackup(filePath);
      
      // Update lastModified timestamp
      rules.lastModified = new Date().toISOString();
      
      // Write updated rules
      await this.fileStorage.write(filePath, rules);
      
      // Cleanup old backups (keep last 10)
      await this.backupManager.cleanupOldBackups(filePath, 10);
      
      return backupPath;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update Twitch rules: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Restores Discord rules from a backup
   * @param backupPath - Path to the backup file
   * @throws Error if restoration fails
   */
  async restoreDiscordRules(backupPath: string): Promise<void> {
    try {
      await this.backupManager.restoreBackup(backupPath, 'rules/discord-rules.json');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to restore Discord rules: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Restores Twitch rules from a backup
   * @param backupPath - Path to the backup file
   * @throws Error if restoration fails
   */
  async restoreTwitchRules(backupPath: string): Promise<void> {
    try {
      await this.backupManager.restoreBackup(backupPath, 'rules/twitch-rules.json');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to restore Twitch rules: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Lists all backups for Discord rules
   * @returns Array of backup file paths
   */
  async listDiscordRulesBackups(): Promise<string[]> {
    return await this.backupManager.listBackups('rules/discord-rules.json');
  }

  /**
   * Lists all backups for Twitch rules
   * @returns Array of backup file paths
   */
  async listTwitchRulesBackups(): Promise<string[]> {
    return await this.backupManager.listBackups('rules/twitch-rules.json');
  }
}
