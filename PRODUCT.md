# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Security operators monitoring a physical space in real time, watching for weapon detection events and acting on alerts as they arrive. The dashboard is the operator's primary view during an active monitoring session.

## Product Purpose

Smart Surveillance System gives a security operator a live, low-latency feed of weapon detections from one or more camera streams. When the YOLOv8 model identifies a gun, knife, or mask, the dashboard surfaces an immediate visual banner and audio alert and logs the event with label, confidence, and timestamp. Success means the operator sees and hears every detection within seconds and has a clear log to review.

## Positioning

End-to-end open pipeline: a custom-trained YOLOv8 Nano model runs on the operator's hardware, POSTs detections to a lightweight Socket.io backend, and the dashboard reflects them in real time — no third-party surveillance SaaS, no cloud video processing.

## Operating Context

- Operator keeps the dashboard open on a monitor while the Python detector runs on the same machine or a connected device.
- Detections arrive as Socket.io events; the dashboard shows a persistent log (last 50 events) and an auto-dismissing alert banner.
- Audio alert (880 Hz beep, 300 ms) fires on each detection.
- Detector classes: Gun, Knife, Mask. Confidence threshold is configurable in `weapon_detect.py` (default 0.15).
- Backend deployed on Render; frontend deployed on Vercel.

## Capabilities and Constraints

- Real-time detection log, stats tiles (total detections, last detected, system status), live/offline indicator.
- Max log depth: 50 entries (oldest dropped).
- Model is experimental — gun detection mAP@50 is 14.7%; not production-ready for unattended autonomous use.
- The system must not be used as the sole basis for security decisions or emergency responses.

## Brand Commitments

Name: **Smart Surveillance System**. No logo or colour palette committed yet.

## Evidence on Hand

- Trained model: `weapon_detector.pt` (YOLOv8n, 44 epochs, 3 classes).
- Test metrics: Precision 71.5%, Recall 61.2%, mAP@50 61.5% (30-image test set).
- Class-wise mAP@50: Gun 14.7%, Knife 70.4%, Mask 99.5%.

## Product Principles

1. **Alert before analysis** — the operator must not miss an event; speed and salience of the alert outrank aesthetic polish.
2. **Honest confidence** — always surface the model's confidence score; never suppress or round it in ways that imply higher certainty.
3. **Minimal operator load** — the dashboard should be legible at a glance; nothing should require reading or deliberate interpretation under pressure.
4. **Experimental transparency** — the system's known limitations (low gun recall, small test set) are documented and must not be obscured in any UI copy.

## Accessibility & Inclusion

Audio alerts must accompany visual alerts (and vice versa) so the operator is not dependent on either channel alone.
