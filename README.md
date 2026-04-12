# Motion Components

`motion-components` is a small component repo for interactive UI pieces built with Next.js, React, Tailwind CSS, and Motion-based animation APIs. The goal of the repo is to collect reusable animated components that feel polished, responsive, and easy to lift into other projects.

## What This Repo Contains

The repo is organized around reusable UI patterns rather than a single product UI.

- Animated buttons
- Micro-interactions
- Loading states
- Success-state feedback
- Border and hover effects

Current examples include:

- `HoverBorderGradient`
  A button with a moving border strip, glow, and a hover-triggered enhanced border effect.
- `StateFullButton`
  A state-driven action button that transitions between idle, loading, and success.
- `CircularLoading`
  A lightweight spinning loader.
- `SuccessTick`
  A success icon with animated SVG drawing.

## Stack

- Next.js `16`
- React `19`
- TypeScript
- Tailwind CSS `4`
- Motion / Framer Motion style animation APIs
- Lucide icons

## Project Structure

```text
app/
  page.tsx
  layout.tsx
components/
  Buttons/
    HoverBorderGradient.tsx
    StateFullButton.tsx
loaders/
  circularLoading.tsx
  sucessTick.tsx
```

## Running Locally

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Development Notes

- Components are written to be demoed quickly inside the App Router.
- Interactive components should be client components when they rely on effects, refs, animation loops, or browser APIs.
- Tailwind is used for layout and visual styling, while animation logic is handled in Motion and, where needed, `canvas`.
- The repo is a component playground, so components can be iterated independently and later extracted into a design system or package.

## Component Direction

This repo is intended to grow into a collection of motion-focused UI building blocks such as:

- Buttons
- Loaders
- Cards
- Toggles
- Inputs
- Status indicators
- Hover effects
- Transition patterns

## Usage

Import components directly from their files while the repo is in active development:

```tsx
import { HoverBorderGradient } from "@/components/Buttons/HoverBorderGradient";
import { StateFullButton } from "@/components/Buttons/StateFullButton";
```

## Goal

The focus is not just animation for its own sake. The aim is to build components that have:

- Clear interaction feedback
- Good visual rhythm
- Reusable structure
- Clean implementation in TypeScript
- Easy adaptation for real product interfaces
