---
layout: project
order: 2
date: 2026-01-16
title: Root Inoculation System
description: Computer vision and robotics pipeline connecting plant-root segmentation, root-tip coordinates, and simulated OT-2 inoculation. Benchmarks PID and reinforcement-learning control for precision and speed.
image: "/assets/gifs/pid_sim.gif"
repository: "https://github.com/maciejczerniak/Root_Inoculation_System"
---

## Overview

**Root Inoculation System** connects image-based plant analysis to robotic positioning for plant-microbe experiments. Developed for the **[Netherlands Plant Eco-phenotyping Centre (NPEC)](https://www.npec.nl/)**, the demonstrated system performs inoculation in an **OT-2 robot simulation**.

The engineering task was to connect several stages that use different representations: camera pixels, segmentation masks, plant locations, millimetres on a plate, and robot coordinates.

## Problem

Manual root inoculation is difficult to scale consistently. Automating it requires both reliable root localisation and precise movement to the resulting target. A good segmentation result alone does not guarantee an accurate inoculation position.

## Implementation

<ol class="project-workflow" aria-label="Root inoculation pipeline">
  <li><strong>Detect the dish</strong><span>Crop and pad the plate image for patch-based processing.</span></li>
  <li><strong>Segment the image</strong><span>Run the U-Net model on patches and reconstruct the mask.</span></li>
  <li><strong>Extract root tips</strong><span>Apply morphology and locate the lowest root point per plant.</span></li>
  <li><strong>Convert coordinates</strong><span>Map pixel locations through plate dimensions into robot space.</span></li>
  <li><strong>Control movement</strong><span>Use PID or a trained SAC policy to approach each target.</span></li>
  <li><strong>Evaluate inoculation</strong><span>Record target error and execution time in simulation.</span></li>
</ol>

The computer-vision experiments progress from binary root segmentation to multiclass U-Net segmentation of background, roots, shoots, and seeds. Preprocessing includes dish detection, cropping, padding, and 256 x 256 pixel patches. Postprocessing reconstructs the full image and applies rules for fragmented roots.

<div class="project-media-grid">
  {% include project_evidence.html image="/assets/images/root_inoculation_system/segmentation-input.png" alt="Grayscale Petri-dish image containing three plants" caption="Input image preserved with the binary-segmentation experiments. Droplets and fine root structures make foreground extraction challenging." width="4112" height="3006" %}
  {% include project_evidence.html image="/assets/images/root_inoculation_system/segmentation-example.png" alt="Binary root prediction for the paired Petri-dish image" caption="Corresponding saved binary prediction from the experiment archive. This illustrates the image-to-mask stage, rather than the final multiclass model's evaluation." width="4112" height="3006" %}
</div>

## Calibration and Integration

The pipeline converts root-tip pixels to millimetres using the plate dimensions, then maps them into simulator coordinates. Plate origin, axis swapping, and offsets are explicit calibration parameters.

This conversion is a central integration challenge: a consistent coordinate offset can move every inoculation away from the intended tip even when segmentation looks correct. The runnable pipeline therefore supports debug crops, simulation GIFs, and benchmark CSV output to inspect intermediate and final behaviour.

## Evaluation

### Segmentation

The saved multiclass validation evaluation records root metrics of **F1 0.8657, recall 0.8751, IoU 0.7632, and precision 0.8565**. These assess pixel-level segmentation and should be interpreted separately from robot positioning error.

### Controller Comparison

The repository documents **95 target attempts per controller**, using a 1 mm positioning-error threshold. Error is the distance between the simulated inoculation position and the target root-tip position.

| Recorded simulation measure | PID | SAC reinforcement learning |
| --- | --- | --- |
| Mean positioning error | 0.386 mm | 0.563 mm |
| Mean execution time | 4.23 s | 1.10 s |
| Attempts exceeding 1 mm | 0 / 95 | 4 / 95 |

These are recorded simulator results, not measured performance on a physical robot. The timing comparison also reflects the implemented controllers and simulation settings.

<div class="project-media-grid">
  {% include project_evidence.html image="/assets/images/root_inoculation_system/pid_controler.png" alt="PID controller target-error curves" caption="PID controller error curves. The benchmark favours this controller when consistent final positioning is the priority." width="576" height="432" %}
  {% include project_evidence.html image="/assets/images/root_inoculation_system/rl_controler.png" alt="Reinforcement-learning controller target-error curves" caption="Reinforcement-learning error curves. Recorded movement is faster on average, with more variable final error." width="571" height="432" %}
</div>

## Software and Limitations

The packaged CLI supports switching between PID and RL, headless execution, GIF recording, debug outputs, and benchmark export. Tests cover preprocessing, postprocessing, coordinate utilities, and controller behaviour.

Root-tip extraction uses assumptions about plant arrangement and downward growth. Calibration, fragmented masks, and unusual root geometry can affect end-to-end accuracy. The supplied SAC checkpoint has 2.2 million training steps; the documented comparison is not an exhaustive optimisation of either control approach.

## Engineering Takeaway

The project's main value is the integration from perception to action. Separate segmentation and positioning measurements make it possible to identify whether an error originates in the model, coordinate conversion, or controller.

## Implementation References

- [Pipeline, coordinate calibration, and benchmark documentation](https://github.com/maciejczerniak/Root_Inoculation_System/blob/main/src/root_inoculation_system/README.md).
- [Runnable pipeline](https://github.com/maciejczerniak/Root_Inoculation_System/blob/main/src/root_inoculation_system/pipeline.py) and [controllers](https://github.com/maciejczerniak/Root_Inoculation_System/blob/main/src/root_inoculation_system/controllers.py).
- [PID benchmark records](https://github.com/maciejczerniak/Root_Inoculation_System/blob/main/src/root_inoculation_system/benchmark_pid.csv) and [RL benchmark records](https://github.com/maciejczerniak/Root_Inoculation_System/blob/main/src/root_inoculation_system/benchmark_rl.csv).
- [Archived segmentation experiments](https://github.com/maciejczerniak/Root_Inoculation_System/tree/main/experiments/segmentation_training).
- [Notebook containing the saved multiclass validation metrics](https://github.com/maciejczerniak/Root_Inoculation_System/blob/main/experiments/segmentation_training/binary_unet/task_5.ipynb).

**Tech stack:** Python, TensorFlow/Keras, U-Net, image processing, PyBullet OT-2 simulation, PID control, Soft Actor-Critic, Pytest.
