# MapToMeet Design System & Product Guidelines

## Product Overview

MapToMeet is a location intelligence platform that helps users discover optimal meeting locations between two or more people.

The product combines:

* Google Maps style search and navigation
* Uber style destination selection
* Meetup style location planning
* Real-time route visualization
* Geographic midpoint calculations
* Modern SaaS dashboard design

The experience should feel:

* Fast
* Minimal
* Professional
* Map-first
* Mobile-friendly
* Enterprise quality

---

# Core Design Philosophy

## Principle 1 — The Map Is The Product

The map should always be the primary focus.

Users should never feel like they are navigating through forms.

The map must occupy the majority of the screen.

All panels should float above the map.

### Good

* Floating search panel
* Floating route cards
* Floating controls

### Bad

* Large forms
* Multiple full-page navigation screens
* Dashboard-heavy layouts

---

## Principle 2 — Minimal User Actions

Users should be able to:

1. Enter source
2. Enter destination
3. Select suggestions
4. View route
5. Get meetup recommendations

Within seconds.

Every unnecessary click should be removed.

---

## Principle 3 — Professional Startup Quality

Visual inspiration:

* Google Maps
* Linear
* Uber
* Notion

Avoid:

* Bright gradients
* Glassmorphism
* Excessive animations
* Cartoonish UI

---

# Brand Identity

## Brand Name

MapToMeet

## Brand Personality

* Smart
* Reliable
* Efficient
* Geographic
* Modern

## Keywords

Location Intelligence
Meetup Planning
Route Optimization
Geospatial Platform

---

# Color System

## Dark Theme (Primary)

Background:
#0B0F14

Surface:
#151B23

Card:
#1D2633

Border:
#2A3442

Text Primary:
#FFFFFF

Text Secondary:
#94A3B8

Primary:
#3B82F6

Success:
#22C55E

Warning:
#F59E0B

Danger:
#EF4444

---

# Typography

Font Family:

Inter

Fallback:

sans-serif

## Headings

Weight:
700

## Labels

Weight:
500

## Body

Weight:
400

## Rules

Never use more than:

* 3 font sizes per screen
* 2 font weights per section

---

# Spacing System

Use 8px grid.

Allowed spacing:

4px
8px
12px
16px
24px
32px
48px

Avoid random values.

---

# Border Radius

Inputs:
12px

Cards:
16px

Buttons:
12px

Modals:
20px

---

# Shadows

Use subtle shadows only.

No aggressive shadows.

Example:

0 8px 24px rgba(0,0,0,0.15)

---

# Application Layout

## Desktop

Map Area:
70%

Panels:
30%

Layout:

Left:
Search + Results

Center:
Map

Right:
Details Panel

---

## Tablet

Map:
75%

Panels:
25%

---

## Mobile

Map:
100%

Panels become bottom sheets.

---

# Search Experience

## Source Input

Behavior:

* Autocomplete enabled
* Debounced requests
* Search restricted to configured region
* Dropdown appears below input

Selection:

* Save display name
* Save coordinates
* Hide dropdown

---

## Destination Input

Behavior identical to Source Input.

---

## Suggestions Dropdown

Requirements:

* Floating card
* Rounded corners
* Max height scrollable
* Hover state
* Keyboard navigation support

Display:

Location Name

Smaller subtitle:

Area, City

---

# Route Experience

When user clicks Submit:

1. Validate source
2. Validate destination
3. Request route
4. Display route

---

# Route Visualization

Source Marker:

Green

Destination Marker:

Red

Route:

Blue polyline

Route Width:

5px

---

# Map Controls

Right Side:

* Zoom In
* Zoom Out

Future:

* Current Location
* Reset View

---

# Meetup Recommendation Cards

Display:

* Venue Name
* Distance from User A
* Distance from User B
* Estimated Travel Time
* Category

Card Style:

Compact
Modern
Clickable

---

# Dashboard Components

## Buttons

Primary:

Blue background

Secondary:

Outlined

Danger:

Red

Loading state required.

---

## Inputs

Requirements:

* Focus state
* Error state
* Disabled state

---

## Cards

Use cards for:

* Route summaries
* Meet recommendations
* User information

---

# Animations

Animation Duration:

150ms–250ms

Use only:

* Fade
* Slide
* Scale

Avoid:

* Bounce
* Rotation
* Complex motion

---

# Accessibility

All interactive elements must:

* Be keyboard accessible
* Have visible focus states
* Meet WCAG contrast standards

---

# Performance Rules

Do not block map rendering.

Autocomplete must be debounced.

Avoid unnecessary re-renders.

Lazy load heavy components.

---

# Engineering Rules

Frontend:

React
TypeScript
TailwindCSS

Maps:

Mapbox GL JS

Backend:

FastAPI

Database:

Supabase PostgreSQL

Routing:

OSRM

Geocoding:

OpenStreetMap Nominatim

---

# Code Quality Rules

Components must be:

* Reusable
* Typed
* Small
* Single responsibility

Avoid files larger than 300 lines.

Prefer composition over duplication.

---

# Future Features

Phase 1:
Location Search

Phase 2:
Route Rendering

Phase 3:
Meetup Recommendations

Phase 4:
Authentication

Phase 5:
Real-time User Matching

Phase 6:
AI Assisted Meeting Suggestions

---

# Final Goal

MapToMeet should feel like a professional location intelligence platform that could be used by thousands of users daily.

Every design decision should prioritize:

1. Simplicity
2. Speed
3. Geographic clarity
4. Professional appearance
5. Scalability
