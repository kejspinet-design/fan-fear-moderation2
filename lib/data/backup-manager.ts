/**
 * Backup Manager
 * 
 * Manages backup creation and restoration for data files.
 * Creates timestamped backup files before updates.
 */

import fs from 'fs/promises';
import path from 'path';
import { FileStorage } from './file-storage';

/**
 * Backup manager for creating and restoring data backups
 */
export class BackupManager {
  private fileStorage: FileStorage;
  private backupPath: string;

  /**
   * Creates a new BackupManager instance
   * @param fileStorage - FileStorage instance for file operations
   * @param backupPath - Path for storing backups (default: 'backups')
   */
  constructor(fileStorage: FileStorage, backupPath: string = 'backups') {
    this.fileStorage = fileStorage;
    this.backupPath = backupPath;
  }

  /**
   * Creates a timestamped backup of a file
   * @param filePath - Relative path to the file to backup
   * @returns Path to the created backup file
   * @throws Error if backup creation fails
   */
  async createBackup(filePath: string): Promise<string> {
    try {
      // Read the original file content
      const content = await this.fileStorage.read<unknown>(filePath);
      
      // Generate timestamped backup filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const basename = path.basename(filePath, '.json');
      const backupFileName = `${basename}_${timestamp}.json`;
      const backupFilePath = path.join(this.backupPath, backupFileName);
      
      // Write backup file
      await this.fileStorage.write(backupFilePath, content);
      
      return backupFilePath;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create backup for ${filePath}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Restores a file from a backup
   * @param backupFilePath - Path to the backup file
   * @param targetFilePath - Path where the backup should be restored
   * @throws Error if restoration fails
   */
  async restoreBackup(backupFilePath: string, targetFilePath: string): Promise<void> {
    try {
      // Read backup content
      const content = await this.fileStorage.read<unknown>(backupFilePath);
      
      // Write to target location
      await this.fileStorage.write(targetFilePath, content);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to restore backup ${backupFilePath}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Lists all backup files for a given file
   * @param filePath - Original file path
   * @returns Array of backup file paths, sorted by timestamp (newest first)
   */
  async listBackups(filePath: string): Promise<string[]> {
    try {
      const basename = path.basename(filePath, '.json');
      const backupDir = path.join(this.fileStorage['dataPath'], this.backupPath);
      
      // Ensure backup directory exists
      await fs.mkdir(backupDir, { recursive: true });
      
      // Read directory contents
      const files = await fs.readdir(backupDir);
      
      // Filter backups for this file and sort by timestamp (newest first)
      const backups = files
        .filter(file => file.startsWith(basename) && file.endsWith('.json'))
        .sort()
        .reverse()
        .map(file => path.join(this.backupPath, file));
      
      return backups;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to list backups for ${filePath}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Deletes old backups, keeping only the specified number of most recent backups
   * @param filePath - Original file path
   * @param keepCount - Number of backups to keep (default: 10)
   */
  async cleanupOldBackups(filePath: string, keepCount: number = 10): Promise<void> {
    try {
      const backups = await this.listBackups(filePath);
      
      // Delete backups beyond the keep count
      const backupsToDelete = backups.slice(keepCount);
      
      for (const backup of backupsToDelete) {
        const fullPath = path.join(this.fileStorage['dataPath'], backup);
        await fs.unlink(fullPath);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to cleanup backups for ${filePath}: ${error.message}`);
      }
      throw error;
    }
  }
}
