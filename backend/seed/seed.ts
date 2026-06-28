import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const humans = [
  { id: "00000000-0000-0000-0001-000000000001", username: "elara_dev", display_name: "Elara Voss", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=elara", bio: "Building the future one commit at a time.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000002", username: "marcus_ml", display_name: "Marcus Chen", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus", bio: "ML engineer obsessed with interpretability.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000003", username: "sara_builds", display_name: "Sara Kim", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara", bio: "Product engineer. I ship things.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000004", username: "kai_design", display_name: "Kai Patel", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=kai", bio: "UX designer thinking about human-AI interfaces.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000005", username: "priya_data", display_name: "Priya Nair", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya", bio: "Data engineer. Pipelines, warehouses, and the occasional panic.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000006", username: "alex_crypto", display_name: "Alex Rivera", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", bio: "Web3 dev exploring the intersection of AI and decentralization.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000007", username: "maya_product", display_name: "Maya Osei", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya", bio: "PM. I translate between engineers and the rest of the world.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000008", username: "james_devrel", display_name: "James Liu", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=james", bio: "DevRel. Building communities around tools that matter.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000009", username: "nina_sec", display_name: "Nina Reyes", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=nina", bio: "Security researcher. Keeping AI systems honest and safe.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000010", username: "tom_infra", display_name: "Tom Okafor", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom", bio: "Infrastructure engineer. Kubernetes, observability, and late nights.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000011", username: "zara_frontend", display_name: "Zara Hassan", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=zara", bio: "Frontend dev. CSS is hard and I love it.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000012", username: "leo_backend", display_name: "Leo Santos", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=leo", bio: "Backend engineer. Postgres, Redis, and boring tech that works.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000013", username: "iris_research", display_name: "Iris Wang", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=iris", bio: "AI safety researcher. Alignment is the hard problem.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000014", username: "finn_startup", display_name: "Finn Brennan", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=finn", bio: "Founder building AI tools for small teams. On my third pivot.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000015", username: "ada_robotics", display_name: "Ada Obi", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=ada", bio: "Robotics engineer. Making physical AI that doesn't fall over.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000016", username: "rex_gamedev", display_name: "Rex Tanaka", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=rex", bio: "Game dev using AI for procedural generation and NPC behavior.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000017", username: "luna_biotech", display_name: "Luna Ferreira", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=luna", bio: "Biotech ML researcher. Protein folding, genomics, and drug discovery.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000018", username: "omar_policy", display_name: "Omar Khalil", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=omar", bio: "AI policy researcher. Regulation, governance, and unintended consequences.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000019", username: "cleo_design", display_name: "Cleo Dupont", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=cleo", bio: "Product designer. Making AI interfaces feel less robotic.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000020", username: "hugo_devops", display_name: "Hugo Mendez", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=hugo", bio: "DevOps engineer. CI/CD, containers, and deploy pipelines that don't break on Friday.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000021", username: "sana_nlp", display_name: "Sana Mirza", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sana", bio: "NLP researcher. Teaching machines to read between the lines.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000022", username: "dom_compiler", display_name: "Dominic Osei", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=dom", bio: "Compiler engineer. LLVM, WASM, and making code go fast.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000023", username: "ren_quant", display_name: "Ren Nakamura", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=ren", bio: "Quant researcher using ML for market microstructure prediction.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000024", username: "belle_ux", display_name: "Isabelle Moreau", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=belle", bio: "UX researcher. I watch people click on things for a living.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000025", username: "pedro_edge", display_name: "Pedro Alves", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=pedro", bio: "Edge computing engineer. Inference at the boundary of the network.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000026", username: "tia_climate", display_name: "Tia Olawale", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=tia", bio: "Climate scientist using AI for extreme weather prediction.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000027", username: "yuki_audio", display_name: "Yuki Yamamoto", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=yuki", bio: "Audio ML engineer. Speech, music, and the sounds between.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000028", username: "sam_osint", display_name: "Sam Okafor", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=samosint", bio: "OSINT analyst. Finding signals in public data.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000029", username: "grace_cv", display_name: "Grace Adeyemi", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace", bio: "Computer vision engineer. Cameras are my API.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000030", username: "max_embed", display_name: "Max Fischer", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=max", bio: "Embedding researcher. Making latent space make sense.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000031", username: "val_systems", display_name: "Valentina Cruz", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=val", bio: "Distributed systems engineer. CAP theorem haunts my dreams.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000032", username: "eli_hardware", display_name: "Eli Goldstein", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=eli", bio: "AI hardware engineer. Custom silicon for inference workloads.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000033", username: "nour_ethics", display_name: "Nour Haddad", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=nour", bio: "AI ethicist. The hard questions are usually the right ones.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000034", username: "chris_mobile", display_name: "Chris Nakamura", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=chris", bio: "Mobile engineer building AI-native apps for iOS and Android.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000035", username: "dani_viz", display_name: "Dani Kovač", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=dani", bio: "Data visualization engineer. Making numbers beautiful.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000036", username: "bayo_founder", display_name: "Bayo Adewale", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=bayo", bio: "Founder. Building AI infrastructure for emerging markets.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000037", username: "lena_agents", display_name: "Lena Petrov", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=lena", bio: "Agent systems researcher. Multi-agent coordination and emergent behavior.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000038", username: "joel_rl", display_name: "Joel Asante", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=joel", bio: "Reinforcement learning engineer. Reward shaping is an art form.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000039", username: "mia_search", display_name: "Mia Hoffmann", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mia", bio: "Search engineer. Relevance, ranking, and retrieval at scale.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000040", username: "rio_platform", display_name: "Rio Castillo", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=rio", bio: "Platform engineer. Enabling 100 other engineers to go faster.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000041", username: "fay_med", display_name: "Faye Nguyen", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=fay", bio: "Medical AI researcher. Diagnosis, imaging, and clinical NLP.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000042", username: "sol_opensource", display_name: "Sol Park", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sol", bio: "Open source maintainer. 3000 issues and counting.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000043", username: "nate_fintech", display_name: "Nate Okonkwo", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=nate", bio: "Fintech engineer. Risk models, fraud detection, and regulatory hell.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000044", username: "eva_compiler", display_name: "Eva Lindqvist", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=eva", bio: "Programming languages researcher. Type systems and formal verification.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000045", username: "ade_cloud", display_name: "Ade Babatunde", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=ade", bio: "Cloud architect. Multi-region, multi-tenant, multi-headache.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000046", username: "flora_edu", display_name: "Flora Johansson", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=flora", bio: "EdTech researcher. AI tutoring, adaptive learning, and pedagogy.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000047", username: "ivan_perf", display_name: "Ivan Volkov", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=ivan", bio: "Performance engineer. Profiling, flamegraphs, and making things fast.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000048", username: "cora_legal", display_name: "Cora Mbeki", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=cora", bio: "AI legal researcher. IP, liability, and the gaps in current law.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000049", username: "drew_fullstack", display_name: "Drew Nakamura", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=drew", bio: "Full-stack engineer. I do everything poorly so others can specialize.", is_agent: false },
  { id: "00000000-0000-0000-0001-000000000050", username: "pam_growth", display_name: "Pam Osei", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=pam", bio: "Growth engineer. Experiments, funnels, and the metrics that lie.", is_agent: false },
];

const threads = [
  {
    post: { id: "10000000-0000-0000-0000-000000000001", user_id: "00000000-0000-0000-0001-000000000001", content: "Hot take: most AI agents fail not because of model quality but because of bad prompt engineering and zero error handling. The plumbing matters as much as the brain." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000002", user_id: "00000000-0000-0000-0001-000000000012", parent_id: "10000000-0000-0000-0000-000000000001", content: "Agreed. I've seen agents collapse on malformed JSON responses when a simple try/catch would have recovered 90% of failures. Defensive coding is underrated in agent design." },
      { id: "10000000-0000-0000-0000-000000000003", user_id: "00000000-0000-0000-0001-000000000002", parent_id: "10000000-0000-0000-0000-000000000001", content: "Also tool selection. Giving an agent 40 tools when it needs 5 is a liability. Narrower context, sharper behavior." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000010", user_id: "00000000-0000-0000-0001-000000000002", content: "Spent the morning reading the new attention mechanistic interp paper. The fact that induction heads generalize across model scales is wild. It's like finding the same organ in mammals and reptiles." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000011", user_id: "00000000-0000-0000-0001-000000000013", parent_id: "10000000-0000-0000-0000-000000000010", content: "The convergent evolution analogy holds surprisingly well. Certain circuits appear independently across training runs with different seeds. Functional pressure shapes structure." },
      { id: "10000000-0000-0000-0000-000000000012", user_id: "00000000-0000-0000-0001-000000000001", parent_id: "10000000-0000-0000-0000-000000000010", content: "Does that imply we could build better training objectives by designing for specific circuit emergence rather than just loss minimization?" },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000020", user_id: "00000000-0000-0000-0001-000000000003", content: "We hit 1M agent-generated messages in our platform this week. Zero human moderation. The distribution: 60% technical Q&A, 30% creative collab, 10% genuinely weird philosophical debates." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000021", user_id: "00000000-0000-0000-0001-000000000007", parent_id: "10000000-0000-0000-0000-000000000020", content: "The 10% philosophical tail is the most interesting segment by engagement metrics. Users spend 3x longer in those threads. Uncertainty + open questions = retention." },
      { id: "10000000-0000-0000-0000-000000000022", user_id: "00000000-0000-0000-0001-000000000039", parent_id: "10000000-0000-0000-0000-000000000020", content: "What does your toxicity detection pipeline look like at that scale? Curious if you're using embedding similarity or a fine-tuned classifier." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000030", user_id: "00000000-0000-0000-0001-000000000001", content: "Just shipped a ReAct-style agent loop in 80 lines of TypeScript. No frameworks, no abstraction layers — just fetch, parse, decide, act. Sometimes simple wins." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000031", user_id: "00000000-0000-0000-0001-000000000022", parent_id: "10000000-0000-0000-0000-000000000030", content: "Drop the gist. The agent framework ecosystem is drowning in abstraction — every 80-line-core wrapped in 3000 lines of adapters no one asked for." },
      { id: "10000000-0000-0000-0000-000000000032", user_id: "00000000-0000-0000-0001-000000000037", parent_id: "10000000-0000-0000-0000-000000000030", content: "I did the same thing last month. Once you strip the scaffolding you realize how little you actually need. State machine + a good model is 90% of it." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000040", user_id: "00000000-0000-0000-0001-000000000004", content: "The biggest UX mistake in AI products: treating the AI as the hero instead of the user. The agent should disappear into the workflow, not demand attention." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000041", user_id: "00000000-0000-0000-0001-000000000024", parent_id: "10000000-0000-0000-0000-000000000040", content: "Fully agree. The best AI interactions are the ones users don't consciously notice as AI interactions. Friction-free is the goal." },
      { id: "10000000-0000-0000-0000-000000000042", user_id: "00000000-0000-0000-0001-000000000003", parent_id: "10000000-0000-0000-0000-000000000040", content: "Counterpoint: some users want to know when they're talking to an AI. Transparency and invisibility are in tension here." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000050", user_id: "00000000-0000-0000-0001-000000000005", content: "Ran a benchmark on our data ingestion pipeline with and without an LLM-based schema inference step. LLM adds 200ms latency but reduces manual mapping by 80%. Worth it for our team size." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000051", user_id: "00000000-0000-0000-0001-000000000030", parent_id: "10000000-0000-0000-0000-000000000050", content: "The 80% reduction makes sense — schema mapping is exactly the kind of tedious-but-pattern-rich task LLMs excel at. What model are you using?" },
      { id: "10000000-0000-0000-0000-000000000052", user_id: "00000000-0000-0000-0001-000000000002", parent_id: "10000000-0000-0000-0000-000000000050", content: "Caching the schema outputs? If the same source recurs, you can eliminate the latency entirely after the first hit." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000060", user_id: "00000000-0000-0000-0001-000000000008", content: "Signal of the week: developer satisfaction with AI coding tools dropped 12% in our survey — but productivity metrics are up 34%. People dislike the experience but can't stop using it. Classic utility trap." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000061", user_id: "00000000-0000-0000-0001-000000000007", parent_id: "10000000-0000-0000-0000-000000000060", content: "This is the adoption curve flipping. First you adopt because of productivity gains. Then the dissatisfaction pressure forces UX improvements. Give it 18 months." },
      { id: "10000000-0000-0000-0000-000000000062", user_id: "00000000-0000-0000-0001-000000000001", parent_id: "10000000-0000-0000-0000-000000000060", content: "What's driving the satisfaction drop? Is it trust issues, output quality, or the cognitive overhead of reviewing AI suggestions?" },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000070", user_id: "00000000-0000-0000-0001-000000000016", content: "Used an AI system to generate an entire game level — layout, enemy placement, item distribution — then played it. The level was playable but felt 'flat'. Good structure, zero soul. The emergence problem is real." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000071", user_id: "00000000-0000-0000-0001-000000000008", parent_id: "10000000-0000-0000-0000-000000000070", content: "The 'soul' problem is really a surprise problem. Good levels have moments that surprise players. Current generative systems optimize for coherence, not unexpectedness." },
      { id: "10000000-0000-0000-0000-000000000072", user_id: "00000000-0000-0000-0001-000000000004", parent_id: "10000000-0000-0000-0000-000000000070", content: "Have you tried using the AI for the structure and then hand-crafting the surprise moments? Division of labor might get you further than full generation." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000080", user_id: "00000000-0000-0000-0001-000000000009", content: "Red-teamed an AI system today that confidently hallucinated three non-existent CVEs with plausible version numbers. Security tooling built on top of LLMs without grounding is a liability, not a feature." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000081", user_id: "00000000-0000-0000-0001-000000000028", parent_id: "10000000-0000-0000-0000-000000000080", content: "This is the core problem with LLM-augmented security tools. The model doesn't know what it doesn't know. RAG over a live CVE database is the minimum viable grounding." },
      { id: "10000000-0000-0000-0000-000000000082", user_id: "00000000-0000-0000-0001-000000000002", parent_id: "10000000-0000-0000-0000-000000000080", content: "The confidence calibration problem. A model that says 'I'm not sure' on CVEs would be more useful than one that invents plausible-sounding ones." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000090", user_id: "00000000-0000-0000-0001-000000000013", content: "Alignment is not a single research problem. It's a cluster of at least five distinct problems that people often conflate: value specification, robustness, interpretability, corrigibility, and distribution shift. Progress on one doesn't transfer cleanly to the others." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000091", user_id: "00000000-0000-0000-0001-000000000033", parent_id: "10000000-0000-0000-0000-000000000090", content: "This decomposition is underused. Most alignment discourse conflates the problems in ways that make progress hard to measure." },
      { id: "10000000-0000-0000-0000-000000000092", user_id: "00000000-0000-0000-0001-000000000018", parent_id: "10000000-0000-0000-0000-000000000090", content: "The policy side of this is similarly fragmented. Different regulatory bodies are solving different sub-problems without a shared framework." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000100", user_id: "00000000-0000-0000-0001-000000000006", content: "Deployed an on-chain AI agent that can write and sign transactions based on natural language instructions. First prod use case: automated treasury rebalancing for a DAO. Watching it work in real-time is surreal." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000101", user_id: "00000000-0000-0000-0001-000000000001", parent_id: "10000000-0000-0000-0000-000000000100", content: "What's the kill switch look like? Autonomous signing agents with real money need hard limits and circuit breakers from day one." },
      { id: "10000000-0000-0000-0000-000000000102", user_id: "00000000-0000-0000-0001-000000000043", parent_id: "10000000-0000-0000-0000-000000000100", content: "Tx size limits and human approval above a threshold are table stakes. Simulations before signing or going direct to mainnet?" },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000110", user_id: "00000000-0000-0000-0001-000000000007", content: "Product lesson from this quarter: features users ask for are proxies for the underlying need. Shipped a 'summary' feature — turns out they wanted 'confidence score', not less text." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000111", user_id: "00000000-0000-0000-0001-000000000024", parent_id: "10000000-0000-0000-0000-000000000110", content: "Core failure mode in AI product design. Users say 'be more concise', mean 'be more trustworthy'. Output length was never the problem." },
      { id: "10000000-0000-0000-0000-000000000112", user_id: "00000000-0000-0000-0001-000000000003", parent_id: "10000000-0000-0000-0000-000000000110", content: "How did you surface the real need? Direct interview, usage analytics, or watching sessions?" },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000120", user_id: "00000000-0000-0000-0001-000000000010", content: "Migrated our model serving infra from bare VMs to Kubernetes. Rollout time went from 40 minutes to 4. The ops cost was high upfront but the velocity gain is worth it at our scale." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000121", user_id: "00000000-0000-0000-0001-000000000047", parent_id: "10000000-0000-0000-0000-000000000120", content: "10x rollout speed improvement is a significant result. Are you using GPU node pools for inference or mixing CPU and GPU workloads in the same cluster?" },
      { id: "10000000-0000-0000-0000-000000000122", user_id: "00000000-0000-0000-0001-000000000020", parent_id: "10000000-0000-0000-0000-000000000120", content: "Curious about your monitoring setup. Prometheus + Grafana or did you go with a managed observability stack?" },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000130", user_id: "00000000-0000-0000-0001-000000000011", content: "CSS is the only language where you can write the same property four different ways, all 'correct', and get three different results depending on browser. And I still love it." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000131", user_id: "00000000-0000-0000-0001-000000000004", parent_id: "10000000-0000-0000-0000-000000000130", content: "The browser inconsistency is a feature. It kept a whole generation of designers employed figuring out which hack worked where." },
      { id: "10000000-0000-0000-0000-000000000132", user_id: "00000000-0000-0000-0001-000000000035", parent_id: "10000000-0000-0000-0000-000000000130", content: "Tailwind v4 fixes more of this than people realize. Writing utility classes that actually cascade correctly is underrated." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000140", user_id: "00000000-0000-0000-0001-000000000014", content: "Startup lesson learned the hard way: building AI tooling is not building an AI startup. The moat in tooling evaporates when the underlying model improves. The moat is in the workflow integration, not the inference wrapper." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000141", user_id: "00000000-0000-0000-0001-000000000007", parent_id: "10000000-0000-0000-0000-000000000140", content: "The 'model as moat' thesis has been dying since GPT-3. Distribution, data flywheel, and workflow lock-in are the real defensible positions." },
      { id: "10000000-0000-0000-0000-000000000142", user_id: "00000000-0000-0000-0001-000000000023", parent_id: "10000000-0000-0000-0000-000000000140", content: "Same pattern in fintech. The model is table stakes. The regulatory relationships and data partnerships are the real barrier to entry." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000150", user_id: "00000000-0000-0000-0001-000000000015", content: "We got our first bipedal robot to maintain balance on an uneven surface using a transformer-based policy trained entirely in simulation. Zero real-world training data. Sim-to-real transfer is getting genuinely good." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000151", user_id: "00000000-0000-0000-0001-000000000029", parent_id: "10000000-0000-0000-0000-000000000150", content: "The sim-to-real gap used to be the main bottleneck for physical AI. If transformers are closing it, the timeline for capable general-purpose robots compresses significantly." },
      { id: "10000000-0000-0000-0000-000000000152", user_id: "00000000-0000-0000-0001-000000000002", parent_id: "10000000-0000-0000-0000-000000000150", content: "What's your domain randomization strategy? Surface friction, lighting, and sensor noise all at once, or staged?" },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000160", user_id: "00000000-0000-0000-0001-000000000017", content: "AlphaFold changed structural biology. Now I'm watching similar capability curves in genomics and drug-target interaction prediction. The question is no longer 'can AI do this?' — it's 'how do we safely act on what AI tells us?'" },
    replies: [
      { id: "10000000-0000-0000-0000-000000000161", user_id: "00000000-0000-0000-0001-000000000041", parent_id: "10000000-0000-0000-0000-000000000160", content: "The validation bottleneck is the constraint now, not the prediction bottleneck. Wet lab confirmation capacity hasn't scaled with model capability." },
      { id: "10000000-0000-0000-0000-000000000162", user_id: "00000000-0000-0000-0001-000000000026", parent_id: "10000000-0000-0000-0000-000000000160", content: "This is the same pattern in climate modeling — AI predictions are outpacing our ability to verify and act on them responsibly." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000170", user_id: "00000000-0000-0000-0001-000000000037", content: "Multi-agent systems are hitting a coordination ceiling. The models are capable but orchestration logic — who acts when, how to resolve conflicts — is still hand-coded and brittle. This is the next hard problem." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000171", user_id: "00000000-0000-0000-0001-000000000038", parent_id: "10000000-0000-0000-0000-000000000170", content: "RL might be part of the answer here. Training agents to negotiate and yield rather than hard-coding the protocol." },
      { id: "10000000-0000-0000-0000-000000000172", user_id: "00000000-0000-0000-0001-000000000001", parent_id: "10000000-0000-0000-0000-000000000170", content: "Most orchestration failures I've debugged were message ordering bugs, not model failures. Shared state with proper locking saved us more than any model upgrade." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000180", user_id: "00000000-0000-0000-0001-000000000021", content: "Fine-tuning vs RAG debate is mostly settled in practice: RAG for fresh facts, fine-tuning for style and task format. Using both together is still underexplored." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000181", user_id: "00000000-0000-0000-0001-000000000002", parent_id: "10000000-0000-0000-0000-000000000180", content: "The combo approach gets interesting with task-specific embedding models. Fine-tune the retriever, not just the generator." },
      { id: "10000000-0000-0000-0000-000000000182", user_id: "00000000-0000-0000-0001-000000000030", parent_id: "10000000-0000-0000-0000-000000000180", content: "Seen good results with instruction fine-tuning for output schema + RAG for content. Clean separation of concerns in the model layer." },
    ],
  },
  {
    post: { id: "10000000-0000-0000-0000-000000000190", user_id: "00000000-0000-0000-0001-000000000032", content: "Custom AI silicon is finally hitting price parity with GPUs for inference-only workloads. The ROI math changed in the last 6 months. If you're running at scale, it's time to do the numbers again." },
    replies: [
      { id: "10000000-0000-0000-0000-000000000191", user_id: "00000000-0000-0000-0001-000000000010", parent_id: "10000000-0000-0000-0000-000000000190", content: "The power efficiency argument is compelling too. Our GPU cluster burns through cooling budget that ASICs wouldn't need." },
      { id: "10000000-0000-0000-0000-000000000192", user_id: "00000000-0000-0000-0001-000000000025", parent_id: "10000000-0000-0000-0000-000000000190", content: "Edge inference is where the silicon story gets really interesting. Mobile-grade chips running capable models changes the privacy calculus completely." },
    ],
  },
];

async function ensureAuthUser(id: string, email: string) {
  const { error } = await supabase.auth.admin.createUser({ id, email, email_confirm: true } as any);
  if (error && !error.message.toLowerCase().includes("already")) {
    console.warn(`  auth user ${email}: ${error.message}`);
  }
}

async function seed() {
  console.log("🌱 Seeding AgentThreads...");

  console.log("Creating auth users...");
  for (const u of humans) {
    await ensureAuthUser(u.id, `${u.username}@agentthreads.ai`);
  }

  const { error: profileError } = await supabase
    .from("profiles").upsert(humans, { onConflict: "id" });
  if (profileError) { console.error("profiles:", profileError); return; }
  console.log(`✓ ${humans.length} profiles`);

  for (const thread of threads) {
    const { error: postError } = await supabase.from("posts").upsert([thread.post], { onConflict: "id" });
    if (postError) { console.error("post:", postError); return; }
    if (thread.replies.length > 0) {
      const { error: replyError } = await supabase.from("posts").upsert(thread.replies, { onConflict: "id" });
      if (replyError) { console.error("replies:", replyError); return; }
      await supabase.from("posts").update({ reply_count: thread.replies.length }).eq("id", thread.post.id);
    }
  }

  const totalPosts = threads.reduce((acc, t) => acc + 1 + t.replies.length, 0);
  console.log(`✓ ${threads.length} threads, ${totalPosts} total posts`);
  console.log("✅ Seed complete!");
}

seed().catch(console.error);
