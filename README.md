# Ali Khemakhem — Interactive Software Engineering Portfolio

A ChatGPT-inspired **scripted portfolio interface** that helps visitors explore my software projects and engineering background.

> **Important:** This version uses JavaScript keyword matching and predefined responses. It does **not** call an LLM, implement retrieval-augmented generation (RAG), or train an AI model. A future AI version is planned but not implemented here.

## Explore the projects

| Project | What it demonstrates | Link |
| --- | --- | --- |
| YouAreMoreHere | React/TypeScript, Express API, Supabase-backed subscriptions, Resend email workflow | [Live application](https://youaremorehere.com) |
| Al Qua'a Services | Arabic-first UI, bilingual local search, static JSON, filtering | [Source](https://github.com/WebAlikm/alqua-services) · [Live demo](https://alqua-services.vercel.app/) |
| This portfolio | HTML, CSS, JavaScript, stateful UI and deterministic intent matching | This repository |

YouAreMoreHere source is private; its production behavior, security posture, and metrics should be verified against the real deployment before making stronger claims.

## How the interface works

```text
User input
    -> keyword matching in script.js
    -> predefined intent response (skills, projects, experience, contact)
    -> chat UI rendering
```

Key files:
- `index.html`: page structure and navigation
- `styles.css`: themes, responsive layout, visual presentation
- `script.js`: profile data, keyword matching, chat session state, project cards, contact form

**Limitations:** This is a portfolio UI, not an intelligent question-answering system. Broad or ambiguous questions may map to the wrong response; answers are manually maintained and are not automatically synchronized with GitHub.

## Run locally

No installation required for this static version.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Portfolio engineering roadmap

1. Keep the profile data factual and linked to the latest project evidence.
2. Improve mobile responsiveness, accessibility, keyboard handling and input rendering.
3. Add simple navigation to project case studies for visitors who don't want to chat.
4. Add automated browser tests for intent matching, projects, contact and navigation.
5. **Only after the above:** introduce a protected server-side LLM API with retrieval from allowlisted project documents, source citations, rate limiting, error handling and evaluation tests.
6. Compare scripted and LLM versions by response accuracy, latency and cost.

## Security and privacy considerations

The interface renders formatted messages as HTML; review user-controlled rendering paths and URL handling before deployment. Do not put LLM API keys in frontend JavaScript. Confirm contact form ownership and consent messaging.

## Why I built this

I wanted to make it easier for an interviewer to inspect my work through natural-language-style prompts while keeping project links available. The primary goal is to demonstrate working software, not to replace evidence with a chatbot persona.

**Author:** [WebAlikm](https://github.com/WebAlikm) · **Focus:** Software Engineering / Applied AI
