import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('🔍 Database connection test started');
  
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      CF_PAGES: process.env.CF_PAGES,
      CLOUDFLARE_PAGES: process.env.CLOUDFLARE_PAGES,
    },
    globalThis_keys: Object.keys(globalThis).filter(k => 
      k.includes('DB') || k.includes('env') || k.includes('cloudflare')
    ),
    process_env_keys: Object.keys(process.env).filter(k => 
      k.includes('DB') || k.includes('DISCORD') || k.includes('CLOUDFLARE')
    ),
  };

  // Check for database in various locations
  const dbTests = [];
  
  try {
    // Test 1: globalThis.DB
    if ((globalThis as any)?.DB) {
      dbTests.push({ location: 'globalThis.DB', found: true, type: typeof (globalThis as any).DB });
    } else {
      dbTests.push({ location: 'globalThis.DB', found: false });
    }
    
    // Test 2: process.env.DB
    if ((process as any)?.env?.DB) {
      dbTests.push({ location: 'process.env.DB', found: true, type: typeof (process as any).env.DB });
    } else {
      dbTests.push({ location: 'process.env.DB', found: false });
    }
    
    // Test 3: globalThis.env.DB
    if ((globalThis as any)?.env?.DB) {
      dbTests.push({ location: 'globalThis.env.DB', found: true, type: typeof (globalThis as any).env.DB });
    } else {
      dbTests.push({ location: 'globalThis.env.DB', found: false });
    }
    
  } catch (error) {
    dbTests.push({ error: error instanceof Error ? error.message : 'Unknown error' });
  }

  const result = {
    status: 'Database Connection Test',
    diagnostics,
    dbTests,
    recommendations: [
      'If no DB found, configure D1 binding in Cloudflare Pages dashboard',
      'Go to Pages → Settings → Functions → D1 database bindings',
      'Add binding: Variable name = DB, Database = contact-us-personal-site'
    ]
  };

  console.log('Database test result:', JSON.stringify(result, null, 2));
  
  return NextResponse.json(result, { status: 200 });
}