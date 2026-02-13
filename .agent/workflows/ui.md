---
description: The UI aesthetic strips away modern graphical layers to reveal the "system" underneath. It is brutally functional, high-contrast, and authentically retro. It emulates a clean, usable shell environment (BASH/ZSH) rather than a Hollywood hacking clich
---

### 1.1 Visual Signatures
* **Monospace Supremacy:** Every character, from `<h1>` to `<footer>`, uses a monospace font.
* **The Cursor:** The blinking block `█` or underscore `_` is the heartbeat of the interface.
* **Shell Metaphors:** UI elements utilize prompt characters (`>`, `$`, `~`), command flags (`--help`), and status codes (`[OK]`, `[ERR]`).
* **Scanlines:** A faint CRT scanline effect adds depth without compromising readability.

---

## 2. Design Tokens

### 2.1 Colors (Dark Mode Exclusive)
The palette mimics a high-contrast phosphor monitor. 
* **Background:** `#0a0a0a` (Deep black, allowing CRT scanlines to blend smoothly)
* **Primary / Accent:** `#33ff00` (Classic Terminal Green - used for active states, text, and cursors)
* **Secondary:** `#ffb000` (Amber/Orange - used for warnings or secondary accents)
* **Muted / Border:** `#1f521f` (Dimmed green - used for borders, dividers, and inactive text)
* **Error:** `#ff3333` (Bright Red - system faults, critical errors)

### 2.2 Typography
* **Font Family:** `JetBrains Mono`, `Fira Code`, or `VT323`.
* **Casing:** **ALL CAPS** for headers and titles. Lowercase for standard body text and "code" output.
* **Scale:** Strict modular scale. Headers snap to rigid grid sizes rather than smooth curves.

### 2.3 Geometry & Borders
* **Border Radius:** `0px`. Absolutely no rounded corners.
* **Borders:** `1px solid` or `1px dashed` using the `muted` or `primary` colors. Borders define "windows" and "panes."

---

## 3. Effects & Animation

* **Phosphor Glow:** Primary text requires a subtle drop-shadow to mimic phosphor persistence.
    * *CSS:* `text-shadow: 0 0 5px rgba(51, 255, 0, 0.5);`
* **CRT Overlay:** A global, `pointer-events-none` fixed overlay providing subtle horizontal scanlines.
* **Blink:** A standard animation utility (`animate-blink`) applied to the cursor `█`.
* **Glitch:** Occasional, subtle RGB-split or text offset effects on hover states for interactive elements.
* **Typewriter:** Hero text and initial system load sequences should appear character-by-character.

---

## 4. Component Stylings

### 4.1 Buttons (Executables)
* **Default:** Text enclosed in brackets, e.g., `[ INITIATE_DEPLOYMENT ]`.
* **Hover:** Background fills with the `primary` color; text inverts to the `background` color (classic inverted video).
* **Active/Pressed:** Text shifts 1px down, or the element blinks rapidly.

### 4.2 Cards (Windows/Panes)
* **Structure:** A `#0a0a0a` box framed by a `1px` green border.
* **Header:** Features a title bar using ASCII framing or solid inverted backgrounds.
    * *Example:* `+--- SYSTEM STATUS ---+`
* **Content:** Monospaced, rigidly padded data points. 

### 4.3 Inputs (Command Line)
* **Structure:** No traditional bounding box. Relies on a shell prompt.
    * *Example:* `sysadmin@local:~$ [INPUT_FIELD]`
* **Focus/Cursor:** No focus ring. The active state is denoted strictly by the blinking `█` cursor at the caret position.

---

## 5. Layout & Accessibility

### 5.1 Grid & Spacing
* **Strict Grid:** Content aligns to a rigid character grid, simulating `tmux` or `vim` pane splits.
* **Separators:** Use ASCII characters for dividers (e.g., `----------------` or `================`).
* **Data Vis:** Avoid modern charts. Use raw data arrays or ASCII progress bars: `[||||||||||.....]`.

### 5.2 Responsive Strategy
* **Mobile:** "Windows" and panes stack vertically. 
* **Line Wrapping:** Long command lines or data strings that break to the next line should be prepended with a `\` indicator.

### 5.3 Accessibility
* **Contrast:** The neon green on deep black heavily exceeds WCAG AA/AAA contrast requirements.
* **Focus Management:** High visibility is guaranteed through hard color inversion on active/focused states.