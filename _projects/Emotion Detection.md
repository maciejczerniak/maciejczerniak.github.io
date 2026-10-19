---
layout: project
date: 2025-10-20
title: Emotion Detection Pipeline for Television Content
description: Proof-of-concept NLP pipeline for emotion analysis of television dialogue. Combines transcription, optional correction, translation, local RoBERTa classification, and structured CSV output.
image: "/assets/images/emotion_detection_cia/cia.png"
presentation: "/assets/presentations/emotion_detection_cia/Emotion in TV Shows.pdf"
repository: "https://github.com/maciejczerniak/Emotion_Detection_Pipeline"
---

## Overview

**Emotion Detection Pipeline** is a proof of concept for analysing emotional language in television dialogue. Developed for the **[Content Intelligence Agency](https://www.contentintelligence.nl/)**, it converts audiovisual material into translated transcript segments with predicted emotion labels and confidence scores.

The project investigates replacing the client's emotion-classification stage with a fine-tuned **RoBERTa-base** model. It classifies transcript text; it does not infer emotions directly from faces, voice tone, or a person's internal state.

## Problem

The client wanted a more controllable alternative to an external large-language-model classifier. The challenge was both model selection and pipeline integration: transcription errors, translation choices, and missing context can change the meaning that reaches the classifier.

## Implementation

**Video or audio -> transcription -> optional correction -> English translation -> RoBERTa classification -> CSV output.**

The pipeline accepts a local file or YouTube input. The current orchestration selects **AssemblyAI** for transcription; the repository also contains a Whisper implementation. Optional autocorrection combines language checks with an Ollama-hosted model before translation and classification.

RoBERTa performs the emotion classification locally. That deployment boundary matters: local classification does not make the entire configured pipeline offline, because transcription and optional correction can depend on external services.

The classifier predicts **anger, disgust, fear, joy, neutral, sadness, and surprise**. It supports batch prediction and returns a confidence score, with an optional full class-probability distribution.

## Structured Output

The saved CSV preserves transcript information and adds fields for downstream analysis:

| Field | Purpose |
| --- | --- |
| `Sentence` | Original transcribed segment |
| `Sentence_corrected` | Corrected segment, when autocorrection is enabled |
| `Translation` | English text supplied to the classifier |
| `Emotion_core` | Predicted category in the pipeline's default CSV output |
| `confidence` | Score assigned to the selected category |

Segment information can support downstream timelines, but the core delivered output is a structured CSV rather than a complete media-analytics dashboard. A confidence score expresses model certainty, not independently measured correctness.

## Model Development and Evaluation

Experiments compare traditional classifiers, recurrent networks, and transformer approaches. The project presentation reports **F1 approximately 0.755** for the selected RoBERTa model. The averaging method is not specified in that presentation, so this should be read as its reported experiment result rather than a general performance guarantee.

The model card documents **30,409 training and validation sentences** and a **792-sentence test set** from translated television material. It also describes both client-generated labels and manual annotation. The error-analysis report explicitly identifies mistakes in AI-generated reference labels, making label provenance and quality a limitation of the evaluation.

## Explainability and Error Analysis

The project explores Gradient x Input attribution, layer-wise relevance propagation, and token-removal analysis to investigate sensitivity to individual words.

{% include project_evidence.html image="/assets/images/emotion_detection_cia/token-attribution.png" alt="Stored Gradient times Input visualisation for an anger prediction on a short sentence" caption="Existing notebook visualisation for the short phrase 'How nice, seconds yes!'. It is diagnostic evidence of token sensitivity, not proof that the predicted emotion is correct." width="994" height="499" %}

Error analysis groups failures involving missing context, similarity between emotion classes, emotionally charged words, translation errors, and questionable reference labels. Short utterances can support several readings, so a sentence-level label may disagree with the surrounding scene.

The practical lesson is to inspect the full chain: better classification alone cannot recover information lost during transcription, translation, or sentence splitting.

## Software and Limitations

The repository provides a command-line pipeline, configuration and logging helpers, classifier interfaces, and automated tests for pipeline stages and services. Saved transcription artifacts and CSV outputs support inspection between stages.

The model card identifies the work as an eight-week **proof of concept**, with class imbalance and limited domain coverage. Broader use would require an audited evaluation set, clearer separation of label sources, and tests on new programmes and languages. Scene context and temporal aggregation are useful future improvements rather than demonstrated core capabilities.

## Implementation References

- [Pipeline orchestration and service dependencies](https://github.com/maciejczerniak/Emotion_Detection_Pipeline/blob/main/src/emotion_detection_pipeline/pipeline.py).
- [Classifier and output fields](https://github.com/maciejczerniak/Emotion_Detection_Pipeline/blob/main/src/emotion_detection_pipeline/classifier/classify.py).
- [Model card](https://github.com/maciejczerniak/Emotion_Detection_Pipeline/blob/main/docs/model_card.md) and [project presentation](https://github.com/maciejczerniak/Emotion_Detection_Pipeline/blob/main/docs/presentation.pdf).
- [Attribution experiments](https://github.com/maciejczerniak/Emotion_Detection_Pipeline/blob/main/experiments/explainability/XAI.ipynb) and [error-analysis report](https://github.com/maciejczerniak/Emotion_Detection_Pipeline/blob/main/experiments/error_analysis/Task%209%20Report%20%28Error%20Analysis%29.pdf).

**Tech stack:** Python, PyTorch, Hugging Face Transformers, RoBERTa, AssemblyAI, Whisper, Ollama, Pandas, Pytest.
