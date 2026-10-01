import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// One shared connection to Supabase for the whole site.
// It is created the first time it is needed (in the browser), not when the
// file loads, so the build does not fail if the variables are missing.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
      );
    }
    // By default the library saves the session in the browser's localStorage,
    // which is what keeps you signed in after closing the tab.
    client = createClient(url, key);
  }
  return client;
}
