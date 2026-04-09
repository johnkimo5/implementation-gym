// =============================================================================
// Implementation Gym - Main Application
// Sets up CodeMirror editor, problem navigation, and UI interactions.
// =============================================================================

(function () {
    "use strict";

    // =========================================================================
    // State
    // =========================================================================
    let currentProblemIndex = 0;
    let editor = null; // CodeMirror instance
    let editorElement = null;
    const completedProblems = new Set(); // Track completed problems by id
    const CM_CDN = "https://cdn.jsdelivr.net/npm/codemirror@5.65.16";

    // Load saved state from localStorage
    function loadState() {
        try {
            const saved = localStorage.getItem("implementation_gym_state");
            if (saved) {
                const state = JSON.parse(saved);
                if (state.currentProblemIndex != null) currentProblemIndex = state.currentProblemIndex;
                if (state.completed) state.completed.forEach((id) => completedProblems.add(id));
                // Restore saved code for problems
                if (state.savedCode) {
                    PROBLEMS.forEach((p) => {
                        if (state.savedCode[p.id]) p._savedCode = state.savedCode[p.id];
                    });
                }
            }
        } catch (_) {}
    }

    function saveState() {
        try {
            const savedCode = {};
            PROBLEMS.forEach((p) => {
                if (p._savedCode) savedCode[p.id] = p._savedCode;
            });
            localStorage.setItem(
                "implementation_gym_state",
                JSON.stringify({
                    currentProblemIndex,
                    completed: [...completedProblems],
                    savedCode,
                })
            );
        } catch (_) {}
    }

    // =========================================================================
    // CodeMirror Loading (from CDN)
    // =========================================================================
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    function loadCSS(href) {
        return new Promise((resolve) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            link.onload = resolve;
            document.head.appendChild(link);
        });
    }

    async function loadCodeMirror() {
        await loadCSS(`${CM_CDN}/lib/codemirror.css`);
        await loadCSS(`${CM_CDN}/theme/material-darker.css`);
        await loadScript(`${CM_CDN}/lib/codemirror.js`);
        await loadScript(`${CM_CDN}/mode/python/python.js`);
        await loadScript(`${CM_CDN}/addon/edit/matchbrackets.js`);
        await loadScript(`${CM_CDN}/addon/edit/closebrackets.js`);
        await loadScript(`${CM_CDN}/addon/comment/comment.js`);
    }

    function initEditor() {
        const container = document.getElementById("editor-container");
        editor = CodeMirror(container, {
            mode: "python",
            theme: "material-darker",
            lineNumbers: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            lineWrapping: false,
            extraKeys: {
                Tab: (cm) => {
                    if (cm.somethingSelected()) {
                        cm.indentSelection("add");
                    } else {
                        cm.replaceSelection("    ", "end");
                    }
                },
                "Shift-Tab": (cm) => cm.indentSelection("subtract"),
                "Cmd-/": (cm) => cm.toggleComment(),
                "Ctrl-/": (cm) => cm.toggleComment(),
                "Cmd-Enter": () => document.getElementById("run-btn").click(),
                "Ctrl-Enter": () => document.getElementById("run-btn").click(),
                "Shift-Enter": () => document.getElementById("check-btn").click(),
            },
        });

        // Save code on change
        editor.on("change", () => {
            const problem = PROBLEMS[currentProblemIndex];
            problem._savedCode = editor.getValue();
            saveState();
        });
    }

    // =========================================================================
    // Problem List
    // =========================================================================
    function renderProblemList() {
        const list = document.getElementById("problem-list");
        list.innerHTML = "";

        PROBLEMS.forEach((problem, index) => {
            const item = document.createElement("div");
            item.className = `problem-list-item${index === currentProblemIndex ? " active" : ""}`;
            item.innerHTML = `
                <span class="item-status">${completedProblems.has(problem.id) ? "&#10003;" : ""}</span>
                <span class="item-number">${index + 1}.</span>
                <span class="item-title">${problem.title}</span>
                <span class="item-category">${problem.category}</span>
            `;
            item.addEventListener("click", () => loadProblem(index));
            list.appendChild(item);
        });
    }

    // =========================================================================
    // Load Problem
    // =========================================================================
    function loadProblem(index) {
        // Save current code before switching
        if (editor) {
            PROBLEMS[currentProblemIndex]._savedCode = editor.getValue();
        }

        currentProblemIndex = index;
        const problem = PROBLEMS[index];

        // Update counter
        document.getElementById("problem-counter").textContent = `${index + 1} / ${PROBLEMS.length}`;

        // Update description
        document.getElementById("problem-title").textContent = problem.title;

        const tagsEl = document.getElementById("problem-tags");
        tagsEl.innerHTML = `
            <span class="tag category">${problem.category}</span>
            <span class="tag difficulty-${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
        `;

        document.getElementById("problem-body").innerHTML = problem.description;

        // Update editor
        if (editor) {
            const code = problem._savedCode || problem.starterCode;
            editor.setValue(code);
            editor.clearHistory();
            // Focus editor after a tick
            setTimeout(() => editor.refresh(), 10);
        }

        // Update problem list active state
        renderProblemList();

        // Clear output
        clearOutput();

        saveState();
    }

    // =========================================================================
    // Output
    // =========================================================================
    function clearOutput() {
        document.getElementById("output-body").innerHTML =
            '<span class="output-placeholder">Run your code or check your solution to see results here.</span>';
    }

    function showOutput(html) {
        document.getElementById("output-body").innerHTML = html;
    }

    function renderResults(results, summary, allPassed) {
        let html = "";

        // Summary banner
        if (allPassed) {
            html += `<div class="result-summary pass">&#10003; ${summary}</div>`;
            // Mark problem as completed
            completedProblems.add(PROBLEMS[currentProblemIndex].id);
            renderProblemList();
            saveState();
        } else if (results.some((r) => r.error)) {
            html += `<div class="result-summary error">&#9888; ${summary}</div>`;
        } else {
            html += `<div class="result-summary fail">&#10007; ${summary}</div>`;
        }

        // Individual test cases
        results.forEach((r, i) => {
            const cls = r.pass ? "pass" : "fail";
            html += `<div class="test-case ${cls}">`;
            html += `<div class="test-label">${r.pass ? "&#10003;" : "&#10007;"} Test ${i + 1}: ${escapeHtml(r.description)}</div>`;
            if (!r.pass) {
                html += `<div class="test-detail">`;
                html += `<span class="expected">Expected: ${escapeHtml(r.expected)}</span><br>`;
                html += `<span class="actual">Actual: ${escapeHtml(String(r.actual))}</span>`;
                html += `</div>`;
            }
            html += `</div>`;
        });

        showOutput(html);
    }

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    // =========================================================================
    // Button Handlers
    // =========================================================================
    function setButtonsDisabled(disabled) {
        document.getElementById("run-btn").disabled = disabled;
        document.getElementById("check-btn").disabled = disabled;
    }

    async function handleRun() {
        if (!pythonRunner.ready) {
            showOutput('<div class="result-summary error">&#9888; Python runtime is still loading. Please wait...</div>');
            return;
        }

        setButtonsDisabled(true);
        showOutput('<div class="output-placeholder"><span class="spinner"></span> Running tests...</div>');

        const problem = PROBLEMS[currentProblemIndex];
        const userCode = editor.getValue();

        // Run against first 3 test cases (example tests)
        const exampleTests = problem.testCases.slice(0, 3);
        const { results, summary, allPassed } = await pythonRunner.runTests(
            userCode,
            exampleTests,
            problem.testSetup || ""
        );

        renderResults(results, summary, allPassed);
        setButtonsDisabled(false);
    }

    async function handleCheck() {
        if (!pythonRunner.ready) {
            showOutput('<div class="result-summary error">&#9888; Python runtime is still loading. Please wait...</div>');
            return;
        }

        setButtonsDisabled(true);
        showOutput('<div class="output-placeholder"><span class="spinner"></span> Checking solution against all tests...</div>');

        const problem = PROBLEMS[currentProblemIndex];
        const userCode = editor.getValue();

        const { results, summary, allPassed } = await pythonRunner.checkSolution(
            userCode,
            problem.solution,
            problem.testCases,
            problem.testSetup || ""
        );

        renderResults(results, summary, allPassed);
        setButtonsDisabled(false);
    }

    function handleReset() {
        const problem = PROBLEMS[currentProblemIndex];
        editor.setValue(problem.starterCode);
        editor.clearHistory();
        problem._savedCode = problem.starterCode;
        clearOutput();
        saveState();
    }

    function handleShowSolution() {
        const problem = PROBLEMS[currentProblemIndex];
        document.getElementById("modal-code").textContent = problem.solution;
        document.getElementById("solution-modal").style.display = "flex";
    }

    function handleCloseModal() {
        document.getElementById("solution-modal").style.display = "none";
    }

    // =========================================================================
    // Resizer
    // =========================================================================
    function initResizer() {
        const resizer = document.getElementById("resizer");
        const leftPanel = document.getElementById("left-panel");
        const container = document.querySelector(".main-container");
        let isResizing = false;

        resizer.addEventListener("mousedown", (e) => {
            isResizing = true;
            resizer.classList.add("active");
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
            e.preventDefault();
        });

        document.addEventListener("mousemove", (e) => {
            if (!isResizing) return;
            const containerRect = container.getBoundingClientRect();
            const newWidth = e.clientX - containerRect.left;
            const minWidth = 280;
            const maxWidth = containerRect.width - 400;
            leftPanel.style.width = Math.max(minWidth, Math.min(maxWidth, newWidth)) + "px";
            if (editor) editor.refresh();
        });

        document.addEventListener("mouseup", () => {
            if (isResizing) {
                isResizing = false;
                resizer.classList.remove("active");
                document.body.style.cursor = "";
                document.body.style.userSelect = "";
            }
        });
    }

    // =========================================================================
    // Problem List Toggle
    // =========================================================================
    function initProblemListToggle() {
        const toggle = document.getElementById("problem-list-toggle");
        const list = document.getElementById("problem-list");
        const chevron = document.getElementById("chevron");
        let collapsed = false;

        toggle.addEventListener("click", () => {
            collapsed = !collapsed;
            list.classList.toggle("collapsed", collapsed);
            chevron.classList.toggle("collapsed", collapsed);
        });
    }

    // =========================================================================
    // Navigation
    // =========================================================================
    function initNavigation() {
        document.getElementById("prev-btn").addEventListener("click", () => {
            if (currentProblemIndex > 0) loadProblem(currentProblemIndex - 1);
        });
        document.getElementById("next-btn").addEventListener("click", () => {
            if (currentProblemIndex < PROBLEMS.length - 1) loadProblem(currentProblemIndex + 1);
        });
    }

    // =========================================================================
    // Keyboard shortcuts
    // =========================================================================
    function initKeyboard() {
        document.addEventListener("keydown", (e) => {
            // Escape to close modal
            if (e.key === "Escape") handleCloseModal();
        });
    }

    // =========================================================================
    // Init
    // =========================================================================
    async function init() {
        loadState();

        // Init Pyodide (background)
        pythonRunner.onStatusChange = (status, msg) => {
            const badge = document.getElementById("pyodide-status");
            badge.textContent = msg;
            badge.className = `status-badge ${status}`;
        };
        pythonRunner.init(); // Don't await — let it load in background

        // Load CodeMirror and init editor
        try {
            await loadCodeMirror();
            initEditor();
        } catch (err) {
            console.error("Failed to load CodeMirror:", err);
            document.getElementById("editor-container").innerHTML =
                '<textarea id="fallback-editor" style="width:100%;height:100%;background:#1e1e1e;color:#abb2bf;font-family:monospace;padding:14px;border:none;resize:none;"></textarea>';
        }

        // Init UI
        renderProblemList();
        loadProblem(currentProblemIndex);
        initResizer();
        initProblemListToggle();
        initNavigation();
        initKeyboard();

        // Wire up buttons
        document.getElementById("run-btn").addEventListener("click", handleRun);
        document.getElementById("check-btn").addEventListener("click", handleCheck);
        document.getElementById("reset-btn").addEventListener("click", handleReset);
        document.getElementById("show-solution-btn").addEventListener("click", handleShowSolution);
        document.getElementById("modal-close").addEventListener("click", handleCloseModal);
        document.getElementById("solution-modal").addEventListener("click", (e) => {
            if (e.target === e.currentTarget) handleCloseModal();
        });
    }

    // Start when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
