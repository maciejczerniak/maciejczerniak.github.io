---
layout: project
title: 📈 VXN Predictor
image: "/assets/images/vxn_dashboard_img.png"
tags:
  - streamlit
  - python
  - neural-networks
  - forecasting
  - finance
  - stock-market
  - machine-learning
---

## Overview

This project explores whether we can predict changes in the Nasdaq-100 Volatility Index (VXN) using macroeconomic indicators and Nasdaq market data. Volatility indexes capture investor sentiment and risk expectations, making them essential for traders, portfolio managers, and retail investors.
By applying machine learning to this problem, we aim to go beyond traditional linear forecasting methods and build models that reveal hidden relationships in financial markets. The outcome is a predictive system that can enhance alerting, improve market timing, and provide more transparency to users of **Move Tickers**, a platform focused on surfacing stock movements.

This project was developed as the **final project of my first year at university**, demonstrating early application of data science and machine learning methods to a real-world financial forecasting problem.

## Problem

Traditional methods struggle to forecast volatility because markets are nonlinear, multi-factor, and regime-dependent.

The key challenge:

Can we predict daily or intraday VXN movements accurately enough to power trading signals and risk assessment?

## Data

- Market data: NASDAQ-100 OHLCV data, trading volume, RSI indicator, crude oil, gold, VIX/S&P data.
- Macroeconomic indicators: GDP growth, inflation, unemployment, treasury yields, interest rates.
- Target: VXN index (sourced from Yahoo Finance).

Preprocessing steps included: merging datasets by timestamp, handling missing values with forward/backward fill, detecting outliers, creating engineered features (moving averages, lagged features, rolling volatility), and scaling inputs.

## Methodology

- Baselines: Naive forecast, Linear Regression, XGBoost, Random Forest Regressor, and Neural Network (Multilayer Perceptron).
- Evaluation: Models were compared across three iterations, with each iteration testing stability and consistency of performance.
- Validation: Time-based holdout (2015–2022 train, 2023–2025 validation) with rolling backtesting.
- Metrics: coefficient of determination (R²), mean absolute error (MAE) and root mean square error (RMSE).

## 🔑 Results

- Correlation-driven features such as lagged values, rolling means, and exponentially weighted moving averages improved predictability.
- Backtesting showed that models consistently captured 1-day ahead VXN movements with higher accuracy than baselines.
- The Neural Network was the best-performing model, achieving the highest R² and outperforming Naive, Linear Regression, XGBoost, and Random Forest.
- The Neural Network captured nonlinear market relationships more effectively but required careful tuning and regularization.
- Ethical safeguards: Predictions are advisory only, not for automated trading.

## Deployment

At the request of **Move Tickers**, a Streamlit dashboard was developed to present interactive charts and forecasts as a standalone application.

The dashboard also included a FAQ page, which explains:

- What the VXN is and why it is valuable to calculate.
- Why this model was chosen for the task.
- How the VXN itself is calculated.
- Which features were used to feed the model and how they correlate with the target variable (VXN).

This provided users with important context for understanding the model and its outputs.

## Demo

<video
  controls
  preload="metadata"
  style="width:100%;border-radius:12px;">
  <source src="{{ site.baseurl }}/assets/videos/vxn_predictor-demo.mp4" type="video/mp4">
  <source src="{{ site.baseurl }}/assets/videos/vxn_predictor-demo.webm" type="video/webm">
  Sorry, your browser doesn’t support embedded videos.
</video>

\* * **Move Tickers** was a fictional client created by the university for the purposes of this project.* 

You can find it on Github:

- <https://github.com>
