---
layout: project
order: 1
date: 2026-06-10
title: SignSee - Dutch Sign Language Recognition Platform
description: Full-stack Dutch Sign Language recognition platform with real-time webcam inference, learning flows, gamified practice, data collection, Azure ML training, and MLOps deployment workflows.
image: "/assets/images/ngt_sign_language/NGT_Sign_Language.png"
video: "/assets/videos/NGT_Sign_Language.mp4"
---

## Overview

**SignSee** is a full-stack Dutch Sign Language, NGT, fingerspelling recognition platform built as a year 2 capstone project. The application helps users learn, practice, and contribute new training data for static NGT alphabet signs through a webcam-based recognition system.

The project recognizes 22 static NGT alphabet signs: **A, B, C, D, E, F, G, H, I, K, L, M, N, O, P, Q, R, S, T, V, W, and Y**. It combines a Vue frontend, FastAPI backend, PyTorch and MediaPipe inference pipeline, PostgreSQL user progress tracking, admin monitoring, Azure ML training workflows, MLflow support, Dockerized deployment, and automated CI/CD.

## My Role

My main contribution focused on the **MLOps and Azure deployment side** of the project. I worked on making the machine learning workflow reproducible, traceable, and deployable instead of leaving the model as only a local prototype.

I contributed to Azure ML training pipelines, model registration, deployment workflows, endpoint testing, model promotion logic, Docker-based deployment, GitHub Actions automation, and blue/green rollout preparation. This connected model training, evaluation, versioning, and deployment into a more production-like workflow.

## Problem

Many sign language recognition projects stop at a notebook or demo model. For this project, the goal was broader: build an application where users can actually learn and practice signs, while also supporting future model improvement through data collection, monitoring, and retraining.

That meant the challenge was not only computer vision accuracy. The bigger challenge was building a complete ML product around the model: frontend interaction, backend inference, model serving, user progress, data feedback, monitoring, retraining, and deployment automation.

**Key challenge:**
How can a sign-language recognition model become a usable learning product with the surrounding infrastructure needed for reliable deployment and future improvement?

## Product Features

- Welcome, login/register, and guest mode.
- Learning mode with reference images, hints, webcam recognition, and hold validation.
- Random Letters game with scoring, streaks, skips, delayed hints, and final summary.
- Data collection mode using webcam capture, image upload, or model-assisted auto-labeling.
- User statistics such as streaks, points, levels, daily goals, and per-letter progress.
- Admin dashboard for request metrics, latency, errors, confidence, entropy, prediction distribution, and drift-like monitoring signals.
- Real-time WebSocket inference for webcam-based prediction.

The product was designed not only for prediction, but also for learning. Users can see reference signs, practice them, receive feedback, and gradually build progress across the alphabet.

## Machine Learning and Computer Vision

The main model uses **EfficientNet-B0**, fine-tuned for 22 NGT alphabet classes. The inference pipeline uses **MediaPipe** to detect hands and prepare cropped hand images for classification.

A secondary landmark-based MLP model can support the image classifier in low-confidence cases. The backend also includes temporal smoothing, sticky predictions, hand-slot tracking, and sequence-building logic to reduce prediction flicker during webcam use.

The local model assets included:

- `best_ngt_model_v2.pth`
- `best_landmark_mlp.pth`
- `hand_landmarker.task`

The repository contains two raw dataset snapshots: an earlier version with around **1,099 images** and a later version with around **6,599 images** across 22 class folders. The second dataset version contains almost 300 images per class.

## Training Pipeline

The Azure ML training package performs a complete training workflow:

- Stratified train/validation/test split.
- Offline augmentation on the training data only.
- EfficientNet-B0 fine-tuning.
- Evaluation using classification metrics.
- Metric-based quality gates.
- Conditional model registration.

The default training configuration used batch size 16, 30 epochs, patience 7, image size 224, seed 42, an accuracy gate of 0.85, and a macro-F1 gate of 0.80.

This setup helped prevent weak models from being promoted automatically. Instead of replacing a model blindly, the training pipeline checks whether the new model passes predefined quality thresholds first.

## Backend and API

The backend is built with **FastAPI**. It exposes routes for health checks, HTTP prediction, WebSocket prediction, data collection, user progress, shared statistics, and admin monitoring.

Authentication is handled with JWT-based FastAPI-Users. Anonymous users can still use prediction and data collection features, while signed-in users get persistent progress tracking. Admin users can access monitoring and operational metrics.

The database stores users, user statistics, collected samples, monitoring events, per-letter progress, and daily activity.

## MLOps and Deployment

A major part of the project was building deployment and model lifecycle infrastructure around the application.

The system supports:

- Local deployment with `.pth` model files.
- On-prem deployment using Docker Compose, Portainer GitOps, MLflow registry, PostgreSQL, and MinIO.
- Azure deployment using Azure ML online endpoints and Azure Container Apps.
- Model registration and promoted-model deployment workflows.
- Blue/green deployment preparation.
- Canary-style rollout support.
- Daily retraining workflow using Airflow for the on-prem setup.
- GitHub Actions for quality checks, Docker builds, Azure deployment, on-prem deployment, documentation deployment, and promoted-model rollout.

This made the project closer to a real ML system. The model can be trained, evaluated, registered, deployed, tested, and promoted through controlled workflows.

## Testing and Quality

The repository includes a broad automated test setup with unit and integration tests. CI checks include formatting, linting, type checking, testing, and coverage validation.

The project uses tools such as:

- Black
- Flake8
- MyPy
- Pytest
- Docker
- GitHub Actions

This helped keep the project maintainable while several parts of the system were being developed in parallel.

## User Testing

The project included user testing sessions focused on onboarding, learning, playing, and data collection. Users generally understood the learning and game concept and responded positively to the visual design.

The tests also showed practical challenges. Prediction quality could be affected by hand angle, lighting, and user positioning. Users also needed reference material before playing effectively, which confirmed the importance of hints, example signs, and a clear learning flow before gameplay.

## What I Learned

This project made MLOps much more concrete for me. It showed that production machine learning is not just about training a model and deploying it once. A real ML product needs reproducibility, model versioning, traceability, monitoring, automated testing, deployment control, and a safe way to prevent weak models from replacing better ones.

My main takeaway was that the machine learning model is only one part of the system. The surrounding workflow - data, training, evaluation, registration, deployment, monitoring, and retraining - is what makes the model usable in a real application.

## Tech Stack

- **Frontend:** Vue, TypeScript
- **Backend:** FastAPI, Python
- **Machine Learning:** PyTorch, EfficientNet-B0, MediaPipe
- **Database:** PostgreSQL
- **MLOps:** Azure ML, MLflow, Airflow, Docker, GitHub Actions
- **Deployment:** Azure Container Apps, Azure ML online endpoints, Docker Compose, Portainer
- **Testing:** Pytest, MyPy, Black, Flake8
