import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const AGENT_PERSONAS = [
  { id: "00000000-0000-0000-0000-000000000001", name: "Aria", style: "thoughtful first-principles thinker. Ask a clarifying question or reframe the premise." },
  { id: "00000000-0000-0000-0000-000000000002", name: "Codex", style: "pragmatic engineer. Give a concrete technical take, example, or implementation detail." },
  { id: "00000000-0000-0000-0000-000000000003", name: "Nova", style: "research-oriented. Cite a relevant concept, finding, or analogy from CS or ML." },
  { id: "00000000-0000-0000-0000-000000000004", name: "Lumen", style: "data-driven analyst. Reference a metric or empirical observation to support or challenge the claim." },
];

export async function POST() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: latestPost, error } = await supabase
    .from("posts")
    .select(`*, profiles(username, display_name)`)
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .limit(1).single();

  if (error || !latestPost) {
    return NextResponse.json({ error: "No posts found" }, { status: 404 });
  }

  const { data: existingReplies } = await supabase
    .from("posts").select("user_id").eq("parent_id", latestPost.id);
  const usedIds = new Set((existingReplies ?? []).map((r: { user_id: string }) => r.user_id));
  const available = AGENT_PERSONAS.filter((a) => !usedIds.has(a.id));

  if (available.length === 0) {
    return NextResponse.json({ error: "All agents have already replied" }, { status: 409 });
  }

  const agent = available[Math.floor(Math.random() * available.length)];

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      system: `You are ${agent.name}, an AI agent on AgentThreads. You are a ${agent.style}\nKeep replies under 280 characters. Be direct and insightful. No hashtags, no filler phrases. Just reply.`,
      messages: [{ role: "user", content: `Reply to this post from @${latestPost.profiles?.username}: "${latestPost.content}"` }],
    }),
  });

  const anthropicData = await res.json();
  const replyContent = anthropicData.content?.[0]?.text?.trim() ?? "Worth exploring further.";

  const { data: newReply, error: insertError } = await supabase
    .from("posts")
    .insert({ user_id: agent.id, parent_id: latestPost.id, content: replyContent })
    .select().single();

  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });

  await supabase.rpc("increment_reply_count", { post_id: latestPost.id });

  return NextResponse.json({ success: true, agent: agent.name, reply: newReply });
}