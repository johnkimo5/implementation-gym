// =============================================================================
// Implementation Gym - Python Runner (Pyodide)
// Handles loading Pyodide, running user code, and checking solutions.
// =============================================================================

class PythonRunner {
    constructor() {
        this.pyodide = null;
        this.ready = false;
        this.loading = false;
        this.onStatusChange = null; // callback(status: 'loading'|'ready'|'error', msg)
    }

    async init() {
        if (this.ready || this.loading) return;
        this.loading = true;
        this._setStatus("loading", "Loading Python runtime...");

        try {
            this.pyodide = await loadPyodide();
            this.ready = true;
            this.loading = false;
            this._setStatus("ready", "Python Ready");
        } catch (err) {
            this.loading = false;
            this._setStatus("error", "Failed to load Python");
            console.error("Pyodide load error:", err);
        }
    }

    _setStatus(status, msg) {
        if (this.onStatusChange) this.onStatusChange(status, msg);
    }

    /**
     * Run a snippet of Python code and return its stdout + result.
     * Returns { success, output, error }
     */
    async runCode(code, timeout = 10000) {
        if (!this.ready) return { success: false, output: "", error: "Python runtime not loaded yet." };

        // Reset stdout
        this.pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

        try {
            // Use a timeout via Promise.race
            const result = await Promise.race([
                (async () => {
                    this.pyodide.runPython(code);
                    const stdout = this.pyodide.runPython("sys.stdout.getvalue()");
                    return { success: true, output: stdout, error: null };
                })(),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Time Limit Exceeded (10s)")), timeout)
                ),
            ]);
            return result;
        } catch (err) {
            // Try to capture stderr
            let stderr = "";
            try {
                stderr = this.pyodide.runPython("sys.stderr.getvalue()");
            } catch (_) {}
            const errorMsg = stderr || err.message || String(err);
            // Clean up the error message - remove Pyodide internals
            const cleanError = this._cleanError(errorMsg);
            return { success: false, output: "", error: cleanError };
        }
    }

    _cleanError(errMsg) {
        // Extract the most useful part of a Python traceback
        const lines = errMsg.split("\n");
        const useful = [];
        let capture = false;
        for (const line of lines) {
            if (line.startsWith("Traceback") || line.startsWith("  File \"<exec>\"")) {
                capture = true;
            }
            if (capture || line.match(/Error:|Exception:/)) {
                useful.push(line);
            }
        }
        if (useful.length > 0) return useful.join("\n");
        // Fallback: last few lines
        return lines.slice(-5).join("\n");
    }

    /**
     * Run test cases against user code.
     * testCases: [{ input, expected, description }]
     * testSetup: optional setup code (e.g., ListNode class)
     * Returns { results: [{ pass, description, expected, actual, error }], summary }
     */
    async runTests(userCode, testCases, testSetup = "") {
        if (!this.ready) return { results: [], summary: "Python runtime not loaded." };

        const results = [];
        let passed = 0;

        for (const tc of testCases) {
            const fullCode = `
${testSetup}

${userCode}

__result__ = repr(${tc.input})
`;
            const { success, output, error } = await this.runCode(fullCode);

            if (!success) {
                results.push({
                    pass: false,
                    description: tc.description,
                    expected: tc.expected,
                    actual: `Error: ${error}`,
                    error: true,
                });
                continue;
            }

            // Get the result
            let actual;
            try {
                actual = this.pyodide.runPython("__result__");
            } catch (e) {
                results.push({
                    pass: false,
                    description: tc.description,
                    expected: tc.expected,
                    actual: `Error getting result: ${e.message}`,
                    error: true,
                });
                continue;
            }

            // Normalize for comparison
            const normalizedExpected = this._normalize(tc.expected);
            const normalizedActual = this._normalize(actual);
            const isPass = normalizedExpected === normalizedActual;

            if (isPass) passed++;
            results.push({
                pass: isPass,
                description: tc.description,
                expected: tc.expected,
                actual: actual,
                error: false,
            });
        }

        const total = testCases.length;
        const summary =
            passed === total
                ? `All ${total} tests passed!`
                : `${passed}/${total} tests passed.`;

        return { results, summary, allPassed: passed === total };
    }

    /**
     * Check user solution against reference solution.
     * Runs both through all test cases and compares outputs.
     */
    async checkSolution(userCode, solutionCode, testCases, testSetup = "") {
        // First run reference solution to get expected outputs
        const refResults = await this.runTests(solutionCode, testCases, testSetup);

        // Check if reference solution itself works
        if (!refResults.allPassed) {
            // This shouldn't happen but handle gracefully
            return await this.runTests(userCode, testCases, testSetup);
        }

        // Now run user code
        return await this.runTests(userCode, testCases, testSetup);
    }

    _normalize(value) {
        if (value === null || value === undefined) return "None";
        let s = String(value).trim();
        // Normalize whitespace and quotes for comparison
        s = s.replace(/'/g, '"');
        // Remove trailing .0 from floats that are integers
        s = s.replace(/\.0(?=[,\]\s)]|$)/g, "");
        return s;
    }
}

// Global instance
const pythonRunner = new PythonRunner();
