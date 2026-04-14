/**
 * Twitch Rules API Endpoint
 * 
 * GET: Retrieves Twitch moderation rules
 * PUT: Updates Twitch moderation rules (Rule Editors only)
 * 
 * **Validates: Requirements 2.1, 2.3, 3.1, 3.2, 3.3, 3.4, 8.1, 8.2, 8.3, 8.4, 10.4**
 */

export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/nextauth.config';
import { FileStorage } from '@/lib/data/file-storage';
import { BackupManager } from '@/lib/data/backup-manager';
import { RuleRepository } from '@/lib/data/rule-repository';
import { AccessLevel } from '@/types/auth';
import { TwitchRulesStorage } from '@/types/rules';
import { RulesGetResponse, RulesPutResponse, ApiErrorResponse } from '@/types/api';

/**
 * GET /api/rules/twitch
 * 
 * Retrieves Twitch moderation rules.
 * Requires Twitch_Moderator or Rule_Editor role.
 * 
 * @returns Twitch rules with last modified timestamp
 */
export async function GET(request: NextRequest): Promise<NextResponse<RulesGetResponse | ApiErrorResponse>> {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: true, message: 'Unauthorized', statusCode: 401 },
        { status: 401 }
      );
    }

    // Authorization is handled by middleware, but double-check here
    const accessLevel = session.user.accessLevel;
    if (
      accessLevel !== AccessLevel.TWITCH_MODERATOR &&
      accessLevel !== AccessLevel.RULE_EDITOR
    ) {
      return NextResponse.json(
        { error: true, message: 'Forbidden: Insufficient permissions for Twitch content', statusCode: 403 },
        { status: 403 }
      );
    }

    // Initialize repository
    const fileStorage = new FileStorage();
    const backupManager = new BackupManager(fileStorage);
    const ruleRepository = new RuleRepository(fileStorage, backupManager);

    // Fetch Twitch rules
    const twitchRules = await ruleRepository.getTwitchRules();

    // Return sections structure
    return NextResponse.json({
      sections: twitchRules.sections || [],
      lastModified: twitchRules.lastModified,
    });
  } catch (error) {
    console.error('Error fetching Twitch rules:', error);
    
    return NextResponse.json(
      {
        error: true,
        message: error instanceof Error ? error.message : 'Failed to fetch Twitch rules',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/rules/twitch
 * 
 * Updates Twitch moderation rules.
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
    const updatedRulesStorage = body as TwitchRulesStorage;

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
    const backupPath = await ruleRepository.updateTwitchRules(updatedRulesStorage);

    return NextResponse.json({
      success: true,
      message: 'Twitch rules updated successfully',
      backup: backupPath,
    });
  } catch (error) {
    console.error('Error updating Twitch rules:', error);
    
    return NextResponse.json(
      {
        error: true,
        message: error instanceof Error ? error.message : 'Failed to update Twitch rules',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
