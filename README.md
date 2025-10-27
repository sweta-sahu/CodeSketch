# CodeSketch: Project Documentation

**Project:** CodeSketch  
**Slogan:** From Doodle to Deployed, 100% On-Device.  
**Event:** Google Chrome Built-in AI Challenge 2025

-----

## 1\. Executive Summary

CodeSketch is a Progressive Web App (PWA) that bridges the gap between low-fidelity design and front-end code. It allows developers and designers to upload a hand-drawn wireframe (from a whiteboard, notebook, etc.) and receive clean, functional HTML/CSS boilerplate in seconds.

The entire AI-powered workflow—from image analysis to code generation, refinement, and documentation—is powered by the **Google Chrome Built-in AI API suite**, including **Gemini Nano**. This ensures every feature is 100% private, works completely offline, and operates with zero server costs or API quotas, demonstrating the future of network-resilient, privacy-first creative tools.

## 2\. Submission Details (Hackathon Requirement)

### The Problem We Are Solving

In a typical development workflow, inspiration is fast but implementation is slow. A developer or designer might sketch 10 ideas on a whiteboard, but translating even one of those sketches into code is a tedious, manual process.

Existing AI "image-to-code" solutions are cloud-based. This creates three major problems:

1.  **Privacy Risk:** Users must upload their proprietary designs and intellectual property to a third-party server.
2.  **No Offline Access:** They are useless on a plane, train, or in any area with unstable internet—the very places creativity often strikes.
3.  **Cost & Quotas:** Heavy use is gated by API keys, quotas, and costs, which stifles rapid experimentation.

### Our Solution

CodeSketch solves these problems by creating a **privacy-first creative co-pilot**. By using the on-device `Prompt`, `Rewriter`, `Writer`, and `Translator` APIs, CodeSketch delivers a powerful, "app-like" experience that runs entirely in the browser.

A user can generate code from a sketch, refactor it to use Tailwind CSS, document it with a README, and translate that documentation, all without a single byte of their data ever leaving their machine.

### APIs Used

  * **`Prompt API (Image Input)`:** This is the core "wow" feature. It analyzes the uploaded wireframe image and generates structured HTML and CSS code.
  * **`Rewriter API`:** This is the "refinement" tool. The user can select a block of generated code and use the API to refactor it (e.g., "Rewrite this CSS to use Tailwind CSS utility classes" or "Make this HTML accessible").
  * **`Writer API`:** This is the "documentation" tool. It analyzes the final code and generates a complete `README.md` file for the new project.
  * **`Translator API`:** This is the "internationalization" tool. It translates the generated README or other text content on demand.

## 3\. Core Features & API Implementation

### Feature 1: Wireframe-to-Code Generation

  * **Description:** The user uploads an image of a sketch. The app sends this image, along with a "master prompt," to the `Prompt API`. The API returns a string of HTML and CSS.
  * **API Used:** `Prompt API (Image Input)`
  * **Example Prompt:** "You are an expert front-end developer. Analyze this image of a web layout. Identify the UI components (like 'navbar', 'hero section', 'image gallery', '3-column card layout', 'footer'). Generate clean, semantic HTML and modern CSS (using Flexbox or Grid) to build this layout."

### Feature 2: AI-Powered Code Refinement

  * **Description:** The user highlights text in the code editor. A set of buttons appears (e.g., "Make Tailwind," "Add Comments," "Make Accessible"). Clicking one sends the selected code and a specific prompt to the `Rewriter API`, which returns the refactored code.
  * **API Used:** `Rewriter API`
  * **Example Prompt:** "Rewrite this CSS to use Tailwind CSS utility classes."

### Feature 3: Automatic Project Documentation

  * **Description:** A "Generate README" button analyzes the *entire* generated codebase, sends it to the `Writer API` as context, and generates a formatted Markdown file.
  * **API Used:** `Writer API`
  * **Example Prompt:** "Based on the following HTML/CSS code, write a simple `README.md` file for this new project. Describe the components (like the navbar, cards, etc.) that you see: `[...full code string...]`"

### Feature 4: On-the-Fly Translation

  * **Description:** After generating the README, a "Translate" button allows the user to instantly translate the text into another language, demonstrating the utility of the on-device `Translator API`.
  * **API Used:** `Translator API`

### Feature 5: Offline-First PWA

  * **Description:** The app is a fully installable PWA. Using a service worker, all application assets (and the on-device AI models) are available offline. A user can be completely disconnected from the internet and have full access to every feature.
  * **Benefit:** This showcases the **Network Resilient UX** pillar of the hackathon.

## 4\. Technical Architecture

### Tech Stack

  * **Core:** React.js (with Hooks)
  * **Build Tool:** Vite (for fast HMR and optimized builds)
  * **Styling:** Tailwind CSS
  * **PWA:** `vite-plugin-pwa` (for auto-generation of service workers and manifest)
  * **Code Editor:** `@uiw/react-codemirror` (React wrapper for CodeMirror)
  * **Hosting:** Vercel / Netlify

### Architecture Diagram

The application logic is contained entirely within the browser. React components manage state and orchestrate calls to the Chrome AI APIs, which run locally.

![Architecture Diagram](architecture_diagram\Architecture_diagram.png)

## 5\. Judge's Guide: How to Test

### Prerequisites

  * A compatible version of **Google Chrome** that supports the Built-in AI APIs.
  * Node.js (v18 or higher).

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sweta-sahu/CodeSketch.git
    cd codesketch
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your compatible Chrome browser.

### Test Cases

1.  **Test `Prompt API (Image)`:**

      * On a piece of paper, draw a simple layout: a rectangle at the top labeled "NAV," a large box labeled "HERO," and three smaller boxes below labeled "Card."
      * Upload a photo of your drawing.
      * Click "Generate Code."
      * **Expected Result:** The CodeMirror editor should populate with HTML and CSS for a navbar, a hero section, and a 3-column card layout.

2.  **Test `Rewriter API`:**

      * Highlight the CSS generated in Test 1.
      * Click the "Rewrite to Tailwind" button.
      * **Expected Result:** The selected CSS should be replaced with Tailwind utility classes embedded directly in the HTML (`<div class="flex...">`).

3.  **Test `Writer API`:**

      * Click the "Generate README" button.
      * **Expected Result:** A modal or new view should appear, displaying a formatted Markdown `README.md` file describing the project you just generated.

4.  **Test `Translator API`:**

      * With the README visible, click the "Translate to Spanish" (or another) button.
      * **Expected Result:** The README text should be instantly replaced with its Spanish translation.

5.  **Test PWA & Offline Capability:**

      * In your browser's dev tools, go to the "Network" tab.
      * **Check the "Offline" box.**
      * Reload the page.
      * **Expected Result:** The app should load and function perfectly.
      * **Run Test 1 again (while still offline).**
      * **Expected Result:** The image-to-code generation should *still work*, proving the on-device, network-resilient nature of the app.

## 6\. Future Roadmap

Given more time, the project would be extended with:

  * **Project Storage:** Fully implement the `IndexedDB` integration to save and load multiple projects (image + code) locally.
  * **Component Generation:** Add a "Framework" toggle to allow the `Prompt API` to generate React or Vue components, not just static HTML.
  * **Live Preview:** Add a third panel that renders the generated code in a sandboxed `<iframe>` for a live preview.