/**
 * File Storage Service
 * 
 * Provides file system operations for reading and writing JSON data files.
 * Handles errors related to file system operations (permissions, file not found, etc.)
 */

import fs from 'fs/promises';
import path from 'path';

/**
 * File storage service for JSON data persistence
 */
export class FileStorage {
  private dataPath: string;

  /**
   * Creates a new FileStorage instance
   * @param dataPath - Base path for data storage (default: './data')
   */
  constructor(dataPath: string = './data') {
    this.dataPath = dataPath;
  }

  /**
   * Reads and parses a JSON file
   * @param filePath - Relative path to the file within the data directory
   * @returns Parsed JSON data
   * @throws Error if file cannot be read or parsed
   */
  async read<T>(filePath: string): Promise<T> {
    try {
      const fullPath = path.join(this.dataPath, filePath);
      const content = await fs.readFile(fullPath, 'utf-8');
      return JSON.parse(content) as T;
    } catch (error) {
      if (error instanceof Error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          throw new Error(`File not found: ${filePath}`);
        }
        if ((error as NodeJS.ErrnoException).code === 'EACCES') {
          throw new Error(`Permission denied: ${filePath}`);
        }
        if (error instanceof SyntaxError) {
          throw new Error(`Invalid JSON in file: ${filePath}`);
        }
        throw new Error(`Failed to read file ${filePath}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Writes data to a JSON file
   * @param filePath - Relative path to the file within the data directory
   * @param data - Data to serialize and write
   * @throws Error if file cannot be written
   */
  async write<T>(filePath: string, data: T): Promise<void> {
    try {
      const fullPath = path.join(this.dataPath, filePath);
      
      // Ensure directory exists
      const dir = path.dirname(fullPath);
      await fs.mkdir(dir, { recursive: true });
      
      // Write file with pretty formatting
      const content = JSON.stringify(data, null, 2);
      await fs.writeFile(fullPath, content, 'utf-8');
    } catch (error) {
      if (error instanceof Error) {
        if ((error as NodeJS.ErrnoException).code === 'EACCES') {
          throw new Error(`Permission denied: ${filePath}`);
        }
        if ((error as NodeJS.ErrnoException).code === 'ENOSPC') {
          throw new Error(`No space left on device: ${filePath}`);
        }
        throw new Error(`Failed to write file ${filePath}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Checks if a file exists
   * @param filePath - Relative path to the file within the data directory
   * @returns True if file exists, false otherwise
   */
  async exists(filePath: string): Promise<boolean> {
    try {
      const fullPath = path.join(this.dataPath, filePath);
      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }
}
