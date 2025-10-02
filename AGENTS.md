# Agent Instructions for `blessed` Modernization

Welcome, agent! This document outlines the vision, roadmap, and guidelines for modernizing the `blessed` library. Your primary goal is to assist in transforming this project into a modern, robust, and high-performance TUI toolkit.

## 1. Project Vision

The core vision for this fork of `blessed` is to evolve it into a state-of-the-art library for building terminal applications. This involves several key objectives:

- **Modernize the Toolchain:** Replace the legacy build and development process with modern tools like **TypeScript**, **Vite**, and **Prettier** to improve developer experience, code quality, and maintainability.
- **Enhance Code Quality:** Refactor the existing JavaScript codebase to TypeScript, introducing strict typing and best practices to reduce bugs and improve clarity.
- **Comprehensive Testing:** Establish a robust testing framework (e.g., Vitest) and significantly increase test coverage to ensure reliability and prevent regressions.
- **Performance Optimization:** Profile the library to identify and address performance bottlenecks, ensuring `blessed` remains a high-performance TUI solution.
- **Integrate `blessed-contrib`:** Incorporate the powerful and popular widgets from `blessed-contrib` directly into the library, providing a richer set of components out of the box.

## 2. Modernization Roadmap

This roadmap is divided into phases to provide a structured approach to the modernization effort.

---

### **Phase 1: Project Setup & Modernization**

- **Goal:** Lay the foundation for modern development by setting up TypeScript, Vite, and Prettier.
- **Complexity:** Medium

| Task                                      | Description                                                                                              | Complexity |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------- |
| **1.1: Initialize TypeScript**            | Add a `tsconfig.json` file and install TypeScript as a dev dependency.                                   | Low        |
| **1.2: Setup Vite**                       | Configure Vite for building the library and running a development environment.                           | Medium     |
| **1.3: Integrate Prettier**               | Add Prettier for consistent code formatting and configure it to run on pre-commit hooks.                   | Low        |
| **1.4: Create a Basic "Hello World" App** | Build a simple example application using the new toolchain to verify the setup.                            | Low        |

---

### **Phase 2: Core Refactoring & Type Definition**

- **Goal:** Convert the entire JavaScript codebase to TypeScript and add comprehensive type definitions.
- **Complexity:** High

| Task                                      | Description                                                                                              | Complexity |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------- |
| **2.1: Convert `lib` to TypeScript**      | Incrementally refactor all files in the `lib` directory to TypeScript, starting with `blessed.js`.         | High       |
| **2.2: Define Core Types**                | Create detailed type definitions for all core components, including `Screen`, `Element`, and `Node`.       | High       |
| **2.3: Type Widgets**                     | Add types for all widgets in the `lib/widgets` directory.                                                | High       |
| **2.4: Update Examples**                  | Refactor the existing examples in the `example` directory to use TypeScript and the new API.             | Medium     |

---

### **Phase 3: Testing Infrastructure & Coverage**

- **Goal:** Implement a modern testing framework and write extensive tests to ensure code quality.
- **Complexity:** High

| Task                                      | Description                                                                                              | Complexity |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------- |
| **3.1: Setup Vitest**                     | Configure Vitest as the testing framework for unit and integration tests.                                  | Medium     |
| **3.2: Write Core Logic Tests**           | Develop tests for the core functionalities in `program.js`, `screen.js`, and other critical files.       | High       |
| **3.3: Add Widget Tests**                 | Create tests for each widget to verify its behavior, rendering, and event handling.                      | High       |
| **3.4: Establish CI/CD Pipeline**         | Set up a continuous integration pipeline (e.g., using GitHub Actions) to run tests automatically.          | Medium     |

---

### **Phase 4: Performance Enhancements**

- **Goal:** Profile the library to identify and address performance bottlenecks.
- **Complexity:** Medium

| Task                                      | Description                                                                                              | Complexity |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------- |
| **4.1: Profiling**                        | Use profiling tools to identify performance-critical areas in the rendering and event-handling logic.      | Medium     |
| **4.2: Optimization**                     | Refactor and optimize the identified bottlenecks to improve rendering speed and reduce resource usage.     | High       |
| **4.3: Benchmarking**                     | Create a suite of benchmarks to measure performance and track improvements over time.                      | Medium     |

---

### **Phase 5: Integration of `blessed-contrib`**

- **Goal:** Port and integrate widgets from the `blessed-contrib` library.
- **Complexity:** High

| Task                                      | Description                                                                                              | Complexity |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------- |
| **5.1: Analyze `blessed-contrib`**        | Review the `blessed-contrib` codebase to understand its structure and identify widgets to be ported.       | Medium     |
| **5.2: Port Widgets**                     | Port the selected widgets (e.g., charts, maps, and tables) to the new TypeScript-based architecture.       | High       |
| **5.3: Integrate Widgets**                | Seamlessly integrate the ported widgets into the `blessed` library, ensuring they follow the same API patterns. | High       |
| **5.4: Create Examples**                  | Develop new examples to showcase the integrated `blessed-contrib` widgets.                               | Medium     |

---

### **Phase 6: Documentation & Release**

- **Goal:** Update the documentation and prepare for a new, modernized release.
- **Complexity:** Medium

| Task                                      | Description                                                                                              | Complexity |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------- |
| **6.1: Update `README.md`**               | Revise the `README.md` to reflect the new features, modern toolchain, and TypeScript usage.              | Medium     |
| **6.2: Generate API Documentation**       | Set up a tool (e.g., TypeDoc) to automatically generate API documentation from the TypeScript code.        | Medium     |
| **6.3: Prepare for Release**              | Create a changelog, update the version number, and publish the modernized library to npm.                  | Low        |

## 3. Open Questions

This section lists key questions that need to be addressed to guide the development process. Your input and research on these topics are highly valuable.

1.  **Backward Compatibility:** What is our strategy for backward compatibility? Should we aim for full compatibility with the original `blessed` API, or are we willing to introduce breaking changes for the sake of modernization and improvement?
2.  **Feature Prioritization:** Which `blessed-contrib` widgets are the most important to integrate first? We should prioritize based on popularity and utility.
3.  **Community Engagement:** How can we best engage the community to gather feedback and contributions for this modernization effort?
4.  **Performance Metrics:** What specific performance metrics should we target? (e.g., frames per second, memory usage).
5.  **Vite Configuration:** What is the optimal Vite configuration for a library like `blessed`? We need to consider aspects like tree-shaking, code-splitting, and output formats.

Please refer to this document as you work on the project. Your contributions are crucial to the success of this modernization effort. Let's build the future of terminal applications together!