---
layout: project
date: 2025-05-17
title: AI-Driven Scale
description: Streamlit produce-recognition prototype using EfficientNet-B0, simulated weighing, and LIME/Grad-CAM explanations. Combines computer vision experiments with usability research for a supermarket-scale workflow.
image: "/assets/images/ai_driven_scale/AI-driven_scale.png"
video: "/assets/videos/Demo-AI-driven_scale.mp4"
repository: "https://github.com/maciejczerniak/AI-Driven_Scale"
---

## Overview

**AI-Driven Scale** is a first-year Applied Data Science & AI prototype that recognises apples, bananas, and carrots from an uploaded image or camera capture. A Streamlit interface combines classification, a simulated weight, and visual explanations of model behaviour.

The project explores how computer vision could simplify supermarket produce weighing. The working prototype demonstrates the interaction and recognition pipeline; it does not connect to a physical weighing sensor or supermarket checkout system.

## Problem

Manual produce selection requires customers to find the correct product or PLU code before printing a label. The design challenge was to reduce those steps while giving users a clear way to inspect and correct a prediction.

## Implementation

**Image capture or upload → image preprocessing → produce classification → simulated weight → optional explanation.**

The application resizes images to 128 × 128 pixels and loads the saved TensorFlow/Keras model. Weight is generated in software to demonstrate the weighing flow. The explanation screen provides **LIME** and **Grad-CAM** views, connecting the predicted class to image regions the model uses.

Training progressed through several approaches:

- A dense-network baseline and custom convolutional networks.
- Data augmentation to vary position, rotation, brightness, and contrast.
- MobileNet transfer learning.
- EfficientNet-B0 transfer learning with a custom three-class classifier.

The EfficientNet backbone was frozen during the documented fifth iteration, with a classification head trained for the produce categories. Early stopping and model checkpoints supported the experiments.

## Evaluation Evidence

The saved notebook output records **99.01% test accuracy** for the EfficientNet-based iteration. The confusion matrix below contains 101 examples with one misclassification. These results describe the captured experiment on three produce categories.

{% include project_evidence.html image="/assets/images/ai_driven_scale/efficientnet-confusion-matrix.png" alt="Saved EfficientNet test confusion matrix with one error among 101 examples" caption="Confusion matrix exported from the existing training notebook. Rows are true labels and columns are predictions; the numeric labels follow the notebook's class ordering." width="498" height="438" %}

{% include project_evidence.html image="/assets/images/ai_driven_scale/training-accuracy.png" alt="Training and validation accuracy curves for the fifth CNN iteration" caption="The recorded training and validation accuracy curves for the EfficientNet-based iteration. These describe the experiment, not performance across supermarket lighting, cameras, or all produce varieties." width="576" height="453" %}

## Usability Research

Think-aloud sessions examined image capture, navigation, and understanding of the result. Feedback pointed to clearer loading indicators, faster perceived responses, and readable controls.

An A/B study compared the original interface with larger buttons, larger fonts, and a mirrored layout. The stored analysis reports **p ≈ 0.041 for one questionnaire item**. That is an item-level result; it does not establish that the revised interface improves every aspect of usability. The test assumptions and other questionnaire items need to be considered before drawing a broader conclusion.

## Business Case and Limitations

The business-understanding report explores potential time savings of up to **60%** and reduced mislabelling losses. These are business-case estimates based on assumed transaction volumes and external examples, rather than measured operational improvements from this prototype.

The demonstrated classifier covers three produce categories. Expanding it would require more representative data, evaluation on unfamiliar cameras and backgrounds, handling of unsupported items, and integration with actual scale hardware. The usability study supports design decisions; it does not measure hygiene outcomes.

## Engineering Takeaway

The project connects model experimentation to a usable interface. Explainability, feedback, and the distinction between measured model performance and projected business value are as important as the classification result.

## Implementation References

- [Training experiments and saved evaluation figures](https://github.com/maciejczerniak/AI-Driven_Scale/blob/main/notebooks/deep_learning/deep_learning_project.ipynb).
- [Inference and simulated weighing](https://github.com/maciejczerniak/AI-Driven_Scale/blob/main/app/inference.py) and [explanation code](https://github.com/maciejczerniak/AI-Driven_Scale/blob/main/app/XAI.py).
- [A/B study analysis](https://github.com/maciejczerniak/AI-Driven_Scale/blob/main/experiments/ab_test/source/W8-T-Test-Student-Notebook.ipynb) and [business-case report](https://github.com/maciejczerniak/AI-Driven_Scale/blob/main/reports/business_understanding.docx).

**Tech stack:** Python, TensorFlow/Keras, EfficientNet-B0, Streamlit, LIME, Grad-CAM, Poetry, Docker.
