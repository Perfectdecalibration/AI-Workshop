"use client";

import { useEffect, useState, type FormEvent } from "react";
import { getSupabase } from "./supabaseClient";

// The six skills, in the order used everywhere on the site.
const SKILLS = [
  "Reading",
  "Writing",
  "Listening",
  "Speaking",
  "Vocabulary",
  "Grammar",
] as const;

type Skill = (typeof SKILLS)[number];

type Task = {
  id: number;
  title: string;
  skill: Skill;
  done: boolean;
  created_at: string;
};

export default function TaskList() {
  // null = still loading the list
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState<Skill>("Reading");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Load this person's tasks once, when the list first appears.
  // Row level security in the database makes sure only their own rows come back.
  useEffect(() => {
    getSupabase()
      .from("tasks")
      .select("id, title, skill, done, created_at")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError(`Could not load tasks: ${error.message}`);
          setTasks([]);
          return;
        }
        setTasks(data as Task[]);
      });
  }, []);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setError(null);
    setBusy(true);
    // No user_id here: the database fills it in with the signed-in person's id.
    const { data, error } = await getSupabase()
      .from("tasks")
      .insert({ title: trimmed, skill })
      .select("id, title, skill, done, created_at")
      .single();
    setBusy(false);
    if (error) {
      setError(`Could not add task: ${error.message}`);
      return;
    }
    setTasks((current) => [data as Task, ...(current ?? [])]);
    setTitle("");
  }

  async function handleToggle(task: Task) {
    const done = !task.done;
    setError(null);
    // Show the change right away, then save it.
    setTasks((current) =>
      (current ?? []).map((t) => (t.id === task.id ? { ...t, done } : t)),
    );
    const { error } = await getSupabase()
      .from("tasks")
      .update({ done })
      .eq("id", task.id);
    if (error) {
      // Saving failed, so put the checkbox back the way it was.
      setTasks((current) =>
        (current ?? []).map((t) =>
          t.id === task.id ? { ...t, done: task.done } : t,
        ),
      );
      setError(`Could not save: ${error.message}`);
    }
  }

  // Count done tasks per skill, straight from the list on screen,
  // so the numbers change the moment a checkbox is ticked.
  const doneCounts = SKILLS.map((s) => ({
    skill: s,
    count: (tasks ?? []).filter((t) => t.skill === s && t.done).length,
  }));
  const fewest = Math.min(...doneCounts.map((c) => c.count));
  // Every skill tied for the fewest done tasks counts as most avoided.
  const mostAvoided = doneCounts
    .filter((c) => c.count === fewest)
    .map((c) => c.skill);

  return (
    <section className="tasks">
      <h2>Your tasks</h2>
      <form className="add-task" onSubmit={handleAdd}>
        <label>
          Task
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Read one news article"
          />
        </label>
        <label>
          Skill
          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value as Skill)}
          >
            {SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={busy || !title.trim()}>
          Add
        </button>
      </form>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {tasks !== null && (
        <div className="skill-summary">
          <h3>Done by skill</h3>
          <ul className="skill-counts">
            {doneCounts.map((c) => (
              <li key={c.skill}>
                <span>{c.skill}</span>
                <span className="count">{c.count}</span>
              </li>
            ))}
          </ul>
          <p className="most-avoided">
            Most avoided: {mostAvoided.join(", ")}
          </p>
        </div>
      )}

      {tasks === null ? (
        <p className="muted">Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p className="muted">No tasks yet.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? "done" : undefined}>
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleToggle(task)}
                />
                <span className="task-title">{task.title}</span>
              </label>
              <span className="skill-label">{task.skill}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
