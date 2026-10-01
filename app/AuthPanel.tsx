"use client";

import { useEffect, useState, type FormEvent } from "react";
import { getSupabase } from "./supabaseClient";

export default function AuthPanel() {
  // undefined = still checking for a saved session, null = signed out
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let supabase;
    try {
      supabase = getSupabase();
    } catch (e) {
      setError((e as Error).message);
      setEmail(null);
      return;
    }

    // Look for a session saved from an earlier visit.
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null);
    });

    // Keep the page in sync whenever someone signs in or out.
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function handleSubmit(mode: "signIn" | "signUp", e?: FormEvent) {
    e?.preventDefault();
    setError(null);
    setBusy(true);
    const supabase = getSupabase();
    const credentials = { email: formEmail, password };
    const { error } =
      mode === "signUp"
        ? await supabase.auth.signUp(credentials)
        : await supabase.auth.signInWithPassword(credentials);
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setPassword("");
  }

  async function handleSignOut() {
    setError(null);
    await getSupabase().auth.signOut();
    setFormEmail("");
  }

  if (email === undefined) {
    return <p className="muted">Loading…</p>;
  }

  if (email) {
    return (
      <section className="auth">
        <p>
          Signed in as <strong>{email}</strong>
        </p>
        <button type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </section>
    );
  }

  return (
    <section className="auth">
      <h2>Sign in</h2>
      <form onSubmit={(e) => handleSubmit("signIn", e)}>
        <label>
          Email
          <input
            type="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="current-password"
          />
        </label>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className="buttons">
          <button type="submit" disabled={busy}>
            Sign in
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={(e) => {
              const form = e.currentTarget.form;
              if (form && !form.reportValidity()) return;
              handleSubmit("signUp");
            }}
          >
            Sign up
          </button>
        </div>
      </form>
    </section>
  );
}
