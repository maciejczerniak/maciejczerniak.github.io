---
layout: project
order: 4
date: 2026-01-30
title: Query Assistant
description: Natural-language analytics assistant that turns questions into MySQL queries, result tables, and optional charts. Developed in collaboration with Alternate.nl, with schema-aware prompts and query validation.
image: "/assets/images/query_assistant/query_assistant.png"
video: "/assets/videos/query_assistant_demo.mp4"
repository: "https://github.com/maciejczerniak/Query_Assistant"
---

## Overview

**Query Assistant** is a Streamlit application that turns natural-language questions into MySQL queries and displays the resulting tables and optional charts. Users can inspect the SQL behind each response and browse the available database schema.

The project was developed as an end-of-block challenge at **Breda University of Applied Sciences**, in collaboration with **[Alternate](https://www.alternate.nl/)**. Its focus is making structured retail data easier to explore while keeping the generated query visible.

## Problem

A useful text-to-SQL interface needs more than a language model. It must ground queries in the actual database, interpret business terms consistently, handle execution failures, and render results in a form users can check.

## Implementation

**Question → schema-aware prompt → SQL checks → database execution → result table or chart.**

The application inspects the database schema with SQLAlchemy and supplies table and column details to an Ollama model. It uses separate prompts for ordinary results and chart-oriented queries. If execution fails, the database error is passed back for a bounded number of repair attempts; repeated identical queries stop the retry loop.

Business rules in the prompts address common retail-analysis mistakes:

- Gross revenue uses item price multiplied by quantity.
- Refunds are aggregated per order before joining, to avoid double counting.
- Weekly, monthly, and quarterly groups include the year.
- Chart queries request one x-axis column and a small set of numeric series.

These rules guide generation; they are not a substitute for checking whether an answer matches the intended business question.

## Example Interaction

For a request such as **“How many orders did we have each month?”**, the assistant groups order counts by month and returns a table. A follow-up such as **“Now plot those results”** can reuse the previous result without another database query.

{% include project_evidence.html image="/assets/images/query_assistant/monthly-order-chart.png" alt="Query Assistant displaying a monthly order-count table and line chart" caption="Frame captured from the existing project demo: monthly order counts rendered as a Plotly line chart below the result table. The sidebar exposes the database schema." width="1920" height="1080" %}

The **Show SQL** control makes the executed query available for inspection. The current repository implementation keeps response wording brief and places the analytical detail in the table or chart. The demo recording shows an earlier version with longer response text.

Follow-up plotting reuses stored results, but the current implementation does not provide unrestricted conversational SQL memory.

## Query Controls

The application accepts queries starting with `SELECT` or `WITH`, checks for disallowed operations and system-schema references, and compares detected table references with the schema. SQL comments are stripped before these checks.

The checks use pattern matching rather than a complete SQL parser. They do not comprehensively validate every column or guarantee that a query is semantically correct. A read-only database account provides an additional access boundary. The current query path also disables the helper's automatic row limit, so result-size controls would need attention before broader deployment.

## Data and Testing

The repository provides a synthetic retail-data generator covering orders, order items, and returns across 2024–2025. This supports repeatable demonstrations without relying on production customer records.

Automated tests cover configuration, SQL restrictions, prompt/output helpers, chart-intent handling, and retry behaviour. The documented CI test command includes an **80% coverage threshold**; this is a configured requirement rather than a claim about the latest run.

## Deployment and Limitations

The app supports local execution and Docker-based setup, with database and Ollama settings configured through environment variables. Ollama can be local or remote, so data handling depends on the selected endpoint.

The result is a demonstration of schema-grounded analytics and inspectable SQL. Ambiguous questions, expensive queries, and misleading joins still require careful evaluation before use with operational data.

## Implementation References

- [Application and follow-up plotting](https://github.com/maciejczerniak/Query_Assistant/blob/main/main.py).
- [SQL checks](https://github.com/maciejczerniak/Query_Assistant/blob/main/src/query_assistant/artifacts/sql_safety.py), [retry orchestration](https://github.com/maciejczerniak/Query_Assistant/blob/main/src/query_assistant/artifacts/chat_utils.py), and [business-aware prompts](https://github.com/maciejczerniak/Query_Assistant/blob/main/src/query_assistant/artifacts/llm_utils.py).
- [Automated tests](https://github.com/maciejczerniak/Query_Assistant/tree/main/tests).

**Tech stack:** Python, Streamlit, Ollama, LangChain, MySQL, SQLAlchemy, Pandas, Plotly, Pytest, Docker.
