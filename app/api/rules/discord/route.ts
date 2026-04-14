/**
 * Discord Rules API Endpoint
 * 
 * GET: Retrieves Discord moderation rules
 * PUT: Updates Discord moderation rules (Rule Editors only)
 * 
 * **Validates: Requirements 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 7.1, 7.2, 10.4**
 */

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth.config';
import { FileStorage } from '@/lib/data/file-storage';
import { BackupManager } from '@/lib/data/backup-manager';
import { RuleRepository } from '@/lib/data/rule-repository';
import { AccessLevel } from '@/types/auth';
import { DiscordRulesStorage } from '@/types/rules';
import { RulesGetResponse, RulesPutResponse, ApiErrorResponse } from '@/types/api';

/**
 * GET /api/rules/discord
 * 
 * Retrieves Discord moderation rules.
 * Public access - no authentication required.
 * 
 * @returns Discord rules with last modified timestamp
 */
export async function GET(request: NextRequest): Promise<NextResponse<RulesGetResponse | ApiErrorResponse>> {
  try {
    // Initialize repository
    const fileStorage = new FileStorage();
    const backupManager = new BackupManager(fileStorage);
    const ruleRepository = new RuleRepository(fileStorage, backupManager);

    // Fetch Discord rules
    const discordRules = await ruleRepository.getDiscordRules();

    // Return sections structure
    return NextResponse.json({
      sections: discordRules.sections || [],
      lastModified: discordRules.lastModified,
    });
  } catch (error) {
    console.error('Error fetching Discord rules:', error);
    
    return NextResponse.json(
      {
        error: true,
        message: error instanceof Error ? error.message : 'Failed to fetch Discord rules',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/rules/discord
 * 
 * Updates Discord moderation rules.
 * Requires Rule_Editor role.
 * Creates backup before updating.
 * 
 * @param request - Request with updated rules in body
 * @returns Success response with backup path
 */
export async function PUT(request: NextRequest): Promise<NextResponse<RulesPutResponse | ApiErrorResponse>> {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: true, message: 'Unauthorized', statusCode: 401 },
        { status: 401 }
      );
    }

    // Verify Rule Editor access
    const accessLevel = session.user.accessLevel;
    if (accessLevel !== AccessLevel.RULE_EDITOR) {
      return NextResponse.json(
        { error: true, message: 'Forbidden: Only Rule Editors can modify rules', statusCode: 403 },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const updatedRulesStorage = body as DiscordRulesStorage;

    // Validate structure
    if (!updatedRulesStorage || !updatedRulesStorage.sections) {
      return NextResponse.json(
        { error: true, message: 'Invalid request body: missing sections', statusCode: 400 },
        { status: 400 }
      );
    }

    // Validate sections array
    if (!Array.isArray(updatedRulesStorage.sections)) {
      return NextResponse.json(
        { error: true, message: 'Invalid request body: sections must be an array', statusCode: 400 },
        { status: 400 }
      );
    }

    // Initialize repository
    const fileStorage = new FileStorage();
    const backupManager = new BackupManager(fileStorage);
    const ruleRepository = new RuleRepository(fileStorage, backupManager);

    // Update rules (backup is created automatically)
    const backupPath = await ruleRepository.updateDiscordRules(updatedRulesStorage);

    return NextResponse.json({
      success: true,
      message: 'Discord rules updated successfully',
      backup: backupPath,
    });
  } catch (error) {
    console.error('Error updating Discord rules:', error);
    
    return NextResponse.json(
      {
        error: true,
        message: error instanceof Error ? error.message : 'Failed to update Discord rules',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
