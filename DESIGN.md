---
name: Smart Surveillance System
description: Real-time weapon detection dashboard for security operators
colors:
  surface-base: "#09090b"
  surface-panel: "#18181b"
  surface-hover: "#27272a"
  border: "#27272a"
  text-primary: "#ffffff"
  text-secondary: "#a1a1aa"
  text-muted: "#71717a"
  alert: "#f87171"
  alert-strong: "#ef4444"
  alert-banner: "#dc2626"
  status-live: "#4ade80"
typography:
  display:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
  headline:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    letterSpacing: "0.025em"
  title:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  full: "9999px"
  md: "0.75rem"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "1.5rem"
components:
  stat-card:
    backgroundColor: "{colors.surface-panel}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "1.25rem"
  detection-row:
    backgroundColor: "{colors.surface-panel}"
    textColor: "{colors.text-primary}"
    padding: "1rem 1.25rem"
  detection-row-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.text-primary}"
    padding: "1rem 1.25rem"
  alert-banner:
    backgroundColor: "{colors.alert-banner}"
    textColor: "{colors.text-primary}"
    padding: "0.75rem 1.5rem"
---

# Design System: Smart Surveillance System

## Overview

**Creative North Star: "The Night Ops Terminal"**

This interface is built for the operator who cannot look away. Dark, near-black surfaces reduce visual fatigue across extended monitoring sessions. High-contrast white primary text and sharp red alert signals cut through without competing for attention. The system speaks only when it must — the absence of decoration is the design; every element that remains is load-bearing.

The palette is strictly functional: neutral grays hold structure, red owns threat signals, and green holds exactly one meaning: the system is live. No color appears for decoration. The layout is generous enough to scan at a glance from across a room, but dense enough to fit meaningful data without scrolling under normal conditions.

Geist Sans carries the typographic system — geometric, legible at small sizes, with zero personality flourish. The tracking on uppercase detection labels adds the slight military-grade legibility register appropriate for the domain without cosplay.

**Key Characteristics:**
- Near-black tonal layering with no shadows
- Red as the exclusive signal color for threats and alerts
- Green reserved for a single state: system live
- Uppercase tracking on detection class labels
- Rounded-xl containers; full-pill only for status indicators

## Colors

The palette is two-axis: neutral grays for structure, saturated signals only for state.

### Primary
- **Alert Red** (`#f87171`): Detection labels, stat value for total detections. The highest-frequency signal color; kept at the 400-weight to avoid visual fatigue across a full log.
- **Alert Strong** (`#ef4444`): Detection dot in the log and disconnected status indicator. Used where the signal must register in a 2px or 3px mark.
- **Alert Banner** (`#dc2626`): The fixed full-bleed banner on active detection. The darkest red — maximum urgency, one surface only.

### Secondary
- **Status Live** (`#4ade80`): The live connection indicator and Active system status text. Used in exactly two places; its uniqueness is the signal.

### Neutral
- **Surface Base** (`#09090b`): Page background. Near-black, not pure black — reduces halation on OLED screens.
- **Surface Panel** (`#18181b`): Card and log container backgrounds. One step lighter than the base; defines panel boundaries without a border in ambient light.
- **Surface Hover** (`#27272a`): Row hover state. The only interactive affordance on list rows.
- **Border** (`#27272a`): Card and section borders. Same value as the hover state — borders are not decorative chrome; they are structural at this contrast level.
- **Text Primary** (`#ffffff`): Page title, stat values, detection data, section headings.
- **Text Secondary** (`#a1a1aa`): Stat labels, timestamp text, metadata. The working read layer.
- **Text Muted** (`#71717a`): Clear button, inactive labels. For elements that should register without demanding attention.

### Named Rules
**The Red Monopoly Rule.** Red means weapon. It appears on detection labels, detection dots, the alert banner, and the disconnected state. No other element borrows it. If you're tempted to use red for a non-threat purpose, use gray instead.

**The Two-Signal Rule.** Only two colors carry live semantic meaning: red (threat / disconnected) and green (live). Every other element is neutral. Adding a third signal color breaks the read.

## Typography

**Display Font:** Geist (with Arial, sans-serif fallback)
**Body Font:** Geist (same stack)

**Character:** Geometric, screen-optimized, zero decoration. Geist reads cleanly at 12–14px and anchors the terminal register without feeling retro. The monospaced companion (Geist Mono) is available for timestamps and numeric data when precise-column alignment matters.

### Hierarchy
- **Display** (700, 2.25rem, 1.1): Stat numbers — total detection count. The largest text on screen; must be legible from 1–2 metres.
- **Headline** (700, 1.5rem, tracking-wide 0.025em): Page title. The only element using wide tracking in its non-uppercase form.
- **Title** (600, 1.25rem, 1.4): Stat value text (last-detected time, system status word).
- **Body** (400, 0.875rem, 1.5): Stat labels, metadata, timestamps, secondary text.
- **Label** (500, 0.875rem, uppercase, 0.05em tracking): Detection class names (GUN, KNIFE, MASK). Uppercase with tracked spacing — the register of a tactical readout.

### Named Rules
**The Label Register Rule.** Detection class names are always uppercase, medium weight, 0.05em tracked. They must read like a classification, not a word.

## Layout

Single-column page with 1.5rem (`p-6`) padding on all sides. The stats grid is a 3-column auto-layout (`grid-cols-1 sm:grid-cols-3`) that collapses to single-column below the `sm` breakpoint (640px). The detection log is full-width below the grid with no maximum width constraint — it uses all available horizontal space to give each row room to breathe.

Row height is consistent at `py-4` (1rem top + 1rem bottom) with `px-5` (1.25rem) horizontal padding. This gives each detection row a fixed 56px minimum height — readable as a quick scan and touchable on mobile.

The page has no maximum width container. On large displays, the grid and log stretch to the viewport. On narrow displays (< 640px), stats stack vertically and log rows wrap their metadata flush-right.

## Elevation & Depth

This system is **flat-by-default, tonal-layered**. No `box-shadow` appears anywhere in the codebase. Depth is expressed entirely through background-color contrast between layers:

- **Layer 0** (`surface-base`, `#09090b`): The page canvas.
- **Layer 1** (`surface-panel`, `#18181b`): Cards, the detection log container.
- **Layer 2** (`surface-hover`, `#27272a`): Row hover state, borders.

The alert banner breaks this model intentionally — it is `fixed`, full-bleed, `z-50`, and uses the most saturated background in the system. It is meant to interrupt the established calm.

### Named Rules
**The Flat-By-Default Rule.** No shadows. If you need to indicate a new layer, raise the background one step toward white. If you need to indicate action, raise it on hover. Shadows introduce visual noise that competes with alert signals.

## Shapes

**Cards and containers** use `rounded-xl` (0.75rem / 12px). This is the only radius value used for structural surfaces. It softens the terminal aesthetic just enough to not read as hostile on a web interface.

**Status dots** and **detection dots** use `rounded-full` (9999px) — a full circle. These are 12px (`w-3 h-3`) and 8px (`w-2 h-2`) respectively.

**Alert banner** has no border radius — it is full-bleed by design.

No other shapes, clipping paths, or decorative geometry are used in this system.

## Components

### Alert Banner
The highest-priority surface. Full-bleed fixed strip, `z-50`, `animate-pulse` (opacity 1 → 0.6 infinite). Text is `text-lg font-bold uppercase` centered.
- **Background:** `alert-banner` (`#dc2626`)
- **Height:** auto (`py-3`)
- **Dismissal:** auto-dismissed after 3 seconds

### Stat Cards
Three equal-width cards in a responsive grid. Each card shows a label (text-secondary, body) and a value (varies by card).
- **Corner Style:** rounded-xl (0.75rem)
- **Background:** surface-panel
- **Border:** 1px `border` color
- **Internal Padding:** lg (1.25rem)
- **Value typography:** display weight for counts, title weight for text values

### Detection Log
Full-width container below the stat grid. Header row with section title and a "Clear" ghost action flush-right.
- **Corner Style:** rounded-xl (0.75rem)
- **Background:** surface-panel
- **Border:** 1px `border` color
- **Max height:** 400px with `overflow-y-auto`
- **Row dividers:** `divide-y divide-gray-800`

### Detection Row
Each detection event is a list row with class label left, metadata right.
- **Left:** 8px detection dot (alert-strong) + uppercase label (alert color)
- **Right:** Confidence value (text-secondary label + text-primary number) + timestamp (text-secondary)
- **Hover:** background steps to surface-hover
- **Transition:** `transition-colors 150ms`

### Status Indicator
12px dot + text label in the page header, flush right.
- **Live state:** green-400 dot + "Live" in text-secondary
- **Offline state:** red-500 dot + "Disconnected" in text-secondary

## Do's and Don'ts

### Do:
- **Do** use `rounded-xl` (0.75rem) for all panel and card surfaces.
- **Do** keep all detection-related text in `alert` (`#f87171`) or stronger — never muted or secondary gray.
- **Do** use `uppercase` with `tracking-[0.05em]` for detection class labels.
- **Do** pair every audio alert with a visual one (and vice versa) so the operator is not dependent on a single channel.
- **Do** reserve green (`status-live`) exclusively for the system-live connection state.

### Don't:
- **Don't** add box-shadows. Depth is tonal only.
- **Don't** use red for anything other than weapon detections, disconnect state, and the alert banner.
- **Don't** introduce a third semantic signal color. The two-signal system (red / green) must stay unambiguous.
- **Don't** wrap static metadata (timestamps, confidence scores) in pill containers — they are plain text with appropriate color weight.
- **Don't** use `backdrop-filter` or blur effects. The system has no glassmorphic surfaces.
