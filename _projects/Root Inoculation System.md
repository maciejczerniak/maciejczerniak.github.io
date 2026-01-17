---
layout: project
date: 2026-01-16
title: 🌱 Root Inoculatuon System
image: "/assets/gifs/pid_sim.gif"
tags:
  - machine_learning
  - python
  - deepLlearning
  - robotics
  - computer_vision
  - end-to-end_pipeline
  - benchmarking
  - error_analysis
  - reinforcement_learning
  - keras
  - tensorflow
  - pytorch
  - lmage_segmentation
  - hyperparameter_tuning
---

## Overview

This project focuses on automating the root inoculation process in plant–microbe interaction experiments. While modern phenotyping systems automate plant growth and imaging, root inoculation is still performed manually, making large-scale, reproducible experiments difficult.

The project was developed for the Netherlands Plant Eco-phenotyping Centre ([NPEC](https://www.npec.nl/)) and demonstrates how computer vision and robotics can be combined into a closed-loop system that links image analysis directly to robotic action.

The result is an end-to-end pipeline that detects roots from images, identifies biologically relevant root locations, and guides a robot to perform precise, automated inoculation.

## Problem
Manual root inoculation is:
- time-consuming,
- difficult to scale,
- prone to human variability.

This limits the throughput and reproducibility of plant–microbe interaction studies, especially when hundreds or thousands of plants must be treated consistently.

**The key challenge:**

Can we automatically detect roots from images and use this information to guide a robot to inoculate plants accurately and at scale?

## Data

- Input data: Grayscale images of plants grown in vitro on Petri dishes.
- Annotations: Pixel-level labels for background, root, shoot, and seed.
- Structure: Each image contains multiple plants with consistent spatial patterns.

Preprocessing included Petri dish detection, region-of-interest extraction, patch-based processing (256×256), normalization, and biologically informed data augmentation.

## Methodology

Computer Vision & Segmentation
- Baselines: Single-class root segmentation using a U-Net architecture.
- Improvement: Multiclass segmentation (background, root, shoot, seed) to provide biological context.
- Iterations: Addressed class imbalance, fragmented predictions, and training instability through loss design, data filtering, and augmentation.
- Evaluation metrics: F1-score, IoU, precision, recall, and learning curves.

## Root System Architecture Extraction

Segmentation outputs were post-processed using rule-based logic to handle noise and imperfect predictions. Root, shoot, and seed masks were combined to improve connectivity, and morphological operations were applied to reconnect fragmented roots.

For each plant, the root tip was identified as the lowest point of the root structure, based on biological growth assumptions. This step enabled reliable extraction of root tip locations across different growth stages.

## Robotics & Control

- PID control: Implemented and tuned in simulation for precise positioning.
- Reinforcement learning: Soft Actor-Critic (SAC) trained and evaluated as a learning-based alternative.
- Benchmarking: Compared PID and RL in terms of accuracy and speed on random target positions.

## Results

- Multiclass segmentation significantly outperformed single-class baselines.
- Final root segmentation achieved an F1-score of ~86.6% after hyperparameter tuning.
- PID control provided higher precision and consistency (~0.39 mm mean error).
- RL control was faster but showed higher error variance and occasional failures.
- Benchmarking revealed a clear precision vs. speed trade-off between classical and learning-based control.

## Deployment & Demonstration

The full pipeline was integrated and tested in simulation, demonstrating:
- automatic root detection,
- root tip localization,
- and robotic inoculation guided by image analysis.

The project is visualized using simulation GIFs, learning curves, segmentation masks, and benchmarking plots to illustrate both model behavior and system-level performance.

## Key Takeaways

- Biological context is critical for accurate root segmentation.
- Classical control (PID) remains highly effective for precision-critical robotic tasks.
- Reinforcement learning offers speed advantages but requires careful tuning and reward design.
- End-to-end AI systems can directly support experimental workflows, not just prediction tasks.
