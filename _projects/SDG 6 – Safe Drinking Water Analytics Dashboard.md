---
layout: project
title: 💧 SDG 6 – Safe Drinking Water Analytics Dashboard
image: /assets/images//clean_water_access/SDG_6-clean_water_and_sanitation.png
tags:
  - power-bi
  - data-analysis
  - sustainability
  - sdg
  - public-policy
  - data-visualization
  - crisp-dm
---

<iframe title="MaciejCzerniak_SDG_Indicators_Dashboard" width="800" height="486" src="https://app.powerbi.com/view?r=eyJrIjoiMDFmYjdlNTAtNjcyZS00MzFkLTk1NDgtYWZmOWM5NGFjY2IxIiwidCI6IjBhMzM1ODliLTAwMzYtNGZlOC1hODI5LTNlZDA5MjZhZjg4NiIsImMiOjl9&embedImagePlaceholder=true" frameborder="0" allowFullScreen="true"></iframe>

## Overview

This project analyzes access to safe drinking water in Southeast Asia, with a primary focus on Indonesia, in the context of UN Sustainable Development Goal 6 (Clean Water and Sanitation). Despite economic growth and international support, a large share of Indonesia’s population still lacks access to safely managed drinking water.

Using the CRISP-DM framework, the project explores how GDP per capita and Official Development Assistance (ODA) relate to improvements in water access. The outcome is an interactive Power BI dashboard designed to support evidence-based decision-making for sustainability-focused stakeholders.

This project was developed as part of my university coursework, demonstrating applied data analytics, data modeling, and dashboard design for real-world social and public health challenges.

## Problem

Access to safe drinking water remains a major public health and development challenge in Indonesia.

### The key challenges:

- Nearly 70% of the population relies on unsafe or unsecured water sources.
- Economic growth alone does not guarantee improved water access.
- International aid is unevenly distributed when measured on a per-capita basis.

### Core questions addressed:

- How strongly is GDP per capita related to access to safe drinking water?
- What role does Official Development Assistance (ODA) play in improving water access?
- Why do some lower-income countries outperform wealthier ones in water accessibility?

## Data

The analysis combines multiple international datasets covering the period 2000–2022:
- Safe drinking water access: UN SDG Indicator 6.1.1 (percentage of population using safely managed drinking water).
- Economic indicators: GDP per capita (PPP, International Dollars) from Our World in Data.
- Development aid: Official Development Assistance (ODA) for water and sanitation.
- Geographic scope: Southeast Asia, with a focus on Indonesia.

### Data preparation included:

- Resolving data type mismatches and inconsistent formats.
- Standardizing country names across datasets.
- Filtering for relevant countries and years.
- Handling missing values and reshaping data from wide to long format using Python (Jupyter Notebook).
- Calculating average change ratios for GDP and water access using Excel.

## Methodology

- Framework: CRISP-DM (Business Understanding → Deployment).
- Tools: Power BI (Power Query, DAX), Excel, Python (Jupyter Notebook).
- Analysis type: Descriptive, diagnostic, and correlation analysis (non-predictive).

## Analytical Techniques

- Descriptive analysis: Maps, line charts, and median-based KPIs to summarize regional trends.
- Correlation analysis: Examining relationships between GDP per capita, ODA, and water access.
- Comparative case studies: Indonesia vs. Cambodia to identify structural differences in outcomes.
- Data modeling: Star-schema–like Power BI model to enable flexible slicing and filtering.

## Results

- Positive correlation between GDP per capita and safe drinking water access (correlation ≈ 0.56), but not sufficient on its own.
- Indonesia underperforms relative to some lower-GDP countries.
- Cambodia, despite a lower GDP per capita, shows faster improvements in water access.
- ODA per capita emerged as a key explanatory factor: Cambodia receives more aid per person, suggesting more effective resource allocation.
- Median-based summaries highlighted regional inequality while reducing the influence of extreme values.