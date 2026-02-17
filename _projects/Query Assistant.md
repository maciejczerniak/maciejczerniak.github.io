---
layout: project
date: 2026-01-30
title: Query Assistant
image: "/assets/images/text_to_sql/query_assistant/Text-to-sql_chatbot_3.png"
video: "/assets/videos/Text-to-sql_chatbot.mp4"
tags:
  - streamlit
  - python
  - text-to-sql
  - mysql
  - ollama
  - langchain
  - data-visualization
  - llm
---

## Overview

**Query Assistant** is an AI-powered analytics chatbot that converts natural-language questions into SQL queries, executes them against a MySQL database, and returns both plain-language answers and optional visualizations. The system is designed to make structured data accessible to non-technical users while maintaining transparency through full SQL visibility.

The application combines a locally hosted large language model (via Ollama) with schema-aware prompting, deterministic intent parsing, and strict safety guardrails. The result is an interactive analytics assistant suitable for rapid exploration of structured datasets while remaining safe and interpretable.

## Problem

Accessing relational data often requires SQL expertise or reliance on analysts, which slows decision-making. Traditional dashboards also require predefined queries and visualizations, limiting flexibility.

At the same time, naive text-to-SQL approaches can:

- generate unsafe or destructive queries,
- produce ambiguous visualizations,
- reduce trust due to lack of transparency.

**Key challenge:**
How can natural-language database interaction be made accessible, safe, and reliable while preserving transparency?

## Solution

The project implements an end-to-end text-to-SQL workflow focused on usability and safety:

1. Automatic inspection of the live database schema.
2. Schema-aware prompt generation for SQL creation.
3. Strict validation enforcing read-only queries.
4. Error-aware retry loop for SQL correction.
5. Automated visualization and plain-language answers.

Users can ask follow-up questions, reveal the generated SQL, and optionally request charts directly within the chat interface.

## Key Features

- Natural-language Q&A over structured SQL data.
- Local LLM inference for privacy and performance.
- Deterministic chart-intent parsing (no extra LLM calls).
- Automatic chart generation with enforced axis consistency.
- SQL safety guardrails preventing destructive queries.
- Sidebar schema browser for data discovery.
- Follow-up queries without reloading context.

## Safety and Reliability

The app enforces multiple layers of protection:

- Only `SELECT` or `WITH` queries are allowed.
- SQL comments, system schemas, and destructive keywords are blocked.
- Queries are validated against the actual schema.
- Optional limits and ordering stabilize chart outputs.
- Database errors are fed back to the model for automatic correction.

These measures allow flexible exploration without compromising data integrity.

## Data and Demo Setup

A synthetic retail dataset was generated to support realistic testing:

- Orders, order items, and returns tables.
- Dates spanning 2024-01-01 to 2025-12-31.
- Revenue and refund logic designed to avoid double counting.

This controlled environment enables consistent demonstrations of revenue analytics, time-series queries, and chart generation.

## Tech Stack

- **Streamlit** — conversational analytics interface.
- **Ollama (local LLM)** — natural-language processing.
- **LangChain** — prompt templates and SQL repair loops.
- **SQLAlchemy** — schema inspection and database access.
- **Pandas & Plotly** — data handling and visualization.

## Deployment

The assistant can be deployed locally with minimal setup:

- Configure a database connection via environment variables.
- Run the Streamlit application locally or via Docker.
- Query the database conversationally with optional visualizations.

This lightweight deployment approach makes the tool suitable for experimentation, demonstrations, and controlled production scenarios.
