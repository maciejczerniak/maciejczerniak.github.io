---
layout: project
title: AI-Driven Scale
image: "/assets/images/AI-driven_scale.png"
video: "/assets/videos/Demo-AI-driven_scale.mp4"
tags:
  - streamlit
  - python
  - image_recognition
  - transfer_learning
  - NN
  - XAI
---

## Overview

The **AI-Driven Scale** project aims to modernize produce weighing in supermarkets by using computer vision and machine learning to automatically recognize fruits and vegetables, eliminating the need for manual PLU code entry.

This solution reduces operational time by up to 60%, minimizes mislabeling errors, and addresses hygiene concerns by limiting physical contact with shared touchscreens. It was developed as part of my **Applied Data Science & AI coursework in the first year of university**, showcasing an early blend of business understanding, technical implementation, and human-centered design applied to a practical retail use case.

## Problem

Traditional supermarket scales rely on manual or semi-automated PLU entry, leading to:
- **Inefficiency:** Customers spend unnecessary time searching for or typing codes.
- **Error-prone processes:** Mislabeling leads to financial losses (“shrink”) and customer frustration.
- **Hygiene risks:** Frequent touching of shared surfaces increases contamination risks.

**The challenge:**
Can AI improve speed, accuracy, and hygiene in the produce weighing process?

## Data & Model

- **Classes:** Apple, Banana, Carrot (prototype stage).
- **Method:** Transfer learning with EfficientNetB0.
- **Performance:** Achieved 99.01% classification accuracy on the test set.
- **Explainability:** Integrated LIME and Grad-CAM to visualize model decisions and improve user trust.

## Business Value

- **Operational efficiency:** Time per transaction reduced by up to 60%. For a store processing 5,000 weighings/day, this equals ~7 hours saved daily.
- **Cost savings:** Preventing even 1–2% shrink (mislabeling losses) can save tens of thousands annually in a mid-sized supermarket.
- **Improved user experience:** Faster, intuitive interactions with fewer steps.
- **Market opportunity:** Limited adoption in Europe (Netherlands, Poland), making it a strong differentiator.

## Human-Centered Design

The prototype was developed with human-centered AI principles:
- **Simplicity:** Minimal steps (“Let’s Start,” “Capture Image”).
- **Accessibility:** Large, clear buttons and readable fonts.
- **Transparency:** Predictions shown immediately with explainability overlays.
- **Hygiene:** Minimal touchpoints for germ-conscious users.
- **User control:** Ability to override AI predictions if necessary.

## Usability Testing

- **Think-Aloud Study:** Users found the app intuitive and straightforward. Main improvements requested were faster responsiveness and clearer loading indicators.
- **A/B Testing:** Compared baseline vs. larger buttons + mirrored layout. No statistically significant difference, but insights led to further UI refinements (bigger fonts, clearer hygiene cues).

## Deployment

A **Streamlit** prototype was built to simulate the scale’s workflow, including:
- **Image capture/upload.**
- **Produce identification** and weight display.
- **Label generation** simulation.
- **XAI** (LIME/Grad-CAM) explanations.

A final demo video was created to showcase end-to-end functionality. You can find it at the bottom of this page.

## Results

- Achieved **99.01% accuracy** in produce recognition (apples, bananas, carrots).
- **Reduced operational time by up to 60%** compared to traditional scales.
- **Validated design through usability testing**, confirming intuitive flow and hygiene benefits.
- **Established strong business case for supermarkets:** lower shrink, faster throughput, and improved customer satisfaction.

## Demo

<video
  controls
  preload="metadata"
  style="width:100%;border-radius:12px;">
  <source src="{{ site.baseurl }}/assets/videos/Demo-AI-driven_scale.mp4" type="video/mp4">
  <source src="{{ site.baseurl }}/assets/videos/Demo-AI-driven_scale.webm" type="video/webm">
  Sorry, your browser doesn’t support embedded videos.
</video>