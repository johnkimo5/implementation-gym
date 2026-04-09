// =============================================================================
// Implementation Gym - Problem Definitions
// Each problem asks the user to implement a common algorithm template.
// =============================================================================

const PROBLEMS = [
    // =========================================================================
    // 1. Two Pointers: one input, opposite ends
    // =========================================================================
    {
        id: "two-pointers-opposite",
        title: "Two Pointers: Opposite Ends",
        category: "Two Pointers",
        difficulty: "Easy",
        description: `
<h3>Pattern</h3>
<p>Given a <strong>sorted</strong> array of integers and a target sum, determine if there exist two numbers that add up to the target. Use the <strong>two pointer technique</strong> with pointers starting at opposite ends.</p>

<h3>Task</h3>
<p>Implement <code>two_sum_sorted(arr, target)</code> that returns <code>True</code> if any two elements in the sorted array sum to <code>target</code>, otherwise <code>False</code>.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>two_sum_sorted([1, 3, 5, 7, 10], 8) &rarr; True</code> (3 + 5)<br>
    <code>two_sum_sorted([1, 3, 5, 7, 10], 14) &rarr; False</code>
</div>

<div class="hint">Template: Initialize <code>left = 0</code>, <code>right = len(arr) - 1</code>. While <code>left &lt; right</code>, check the sum and move pointers accordingly.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n) &mdash; Space: O(1)
</div>`,
        starterCode: `def two_sum_sorted(arr, target):
    # Implement using two pointers from opposite ends
    pass`,
        solution: `def two_sum_sorted(arr, target):
    left = 0
    right = len(arr) - 1

    while left < right:
        curr_sum = arr[left] + arr[right]
        if curr_sum == target:
            return True
        elif curr_sum < target:
            left += 1
        else:
            right -= 1

    return False`,
        testCases: [
            { input: "two_sum_sorted([1, 3, 5, 7, 10], 8)", expected: "True", description: "3 + 5 = 8" },
            { input: "two_sum_sorted([1, 3, 5, 7, 10], 14)", expected: "False", description: "No pair sums to 14" },
            { input: "two_sum_sorted([1, 2, 3, 4, 5], 9)", expected: "True", description: "4 + 5 = 9" },
            { input: "two_sum_sorted([1, 2, 3, 4, 5], 10)", expected: "False", description: "Max sum is 9" },
            { input: "two_sum_sorted([], 5)", expected: "False", description: "Empty array" },
            { input: "two_sum_sorted([5], 5)", expected: "False", description: "Single element" },
            { input: "two_sum_sorted([1, 1], 2)", expected: "True", description: "Duplicates" },
            { input: "two_sum_sorted([-3, -1, 0, 2, 4, 6], 3)", expected: "True", description: "-1 + 4 = 3" },
        ],
    },

    // =========================================================================
    // 2. Two Pointers: two inputs, exhaust both
    // =========================================================================
    {
        id: "two-pointers-two-inputs",
        title: "Two Pointers: Merge Two Sorted Arrays",
        category: "Two Pointers",
        difficulty: "Easy",
        description: `
<h3>Pattern</h3>
<p>Given two <strong>sorted</strong> arrays, merge them into a single sorted array. Use two pointers to exhaust both inputs.</p>

<h3>Task</h3>
<p>Implement <code>merge_sorted(arr1, arr2)</code> that returns a new sorted array containing all elements from both arrays.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>merge_sorted([1, 3, 5], [2, 4, 6]) &rarr; [1, 2, 3, 4, 5, 6]</code>
</div>

<div class="hint">Template: Use <code>i</code> and <code>j</code> pointers. Compare elements, append the smaller one, then exhaust remaining elements from both arrays.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n + m) &mdash; Space: O(n + m)
</div>`,
        starterCode: `def merge_sorted(arr1, arr2):
    # Implement using two pointers, exhaust both inputs
    pass`,
        solution: `def merge_sorted(arr1, arr2):
    i = j = 0
    ans = []

    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            ans.append(arr1[i])
            i += 1
        else:
            ans.append(arr2[j])
            j += 1

    while i < len(arr1):
        ans.append(arr1[i])
        i += 1

    while j < len(arr2):
        ans.append(arr2[j])
        j += 1

    return ans`,
        testCases: [
            { input: "merge_sorted([1, 3, 5], [2, 4, 6])", expected: "[1, 2, 3, 4, 5, 6]", description: "Basic merge" },
            { input: "merge_sorted([1, 2, 3], [])", expected: "[1, 2, 3]", description: "Second empty" },
            { input: "merge_sorted([], [4, 5])", expected: "[4, 5]", description: "First empty" },
            { input: "merge_sorted([], [])", expected: "[]", description: "Both empty" },
            { input: "merge_sorted([1], [2])", expected: "[1, 2]", description: "Single elements" },
            { input: "merge_sorted([1, 1, 1], [1, 1])", expected: "[1, 1, 1, 1, 1]", description: "All duplicates" },
            { input: "merge_sorted([1, 5, 9], [2, 3, 4, 6, 7, 8, 10])", expected: "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]", description: "Different lengths" },
        ],
    },

    // =========================================================================
    // 3. Sliding Window
    // =========================================================================
    {
        id: "sliding-window",
        title: "Sliding Window: Longest Subarray Sum <= K",
        category: "Sliding Window",
        difficulty: "Medium",
        description: `
<h3>Pattern</h3>
<p>Given an array of <strong>positive</strong> integers and a number <code>k</code>, find the length of the <strong>longest subarray</strong> whose sum is less than or equal to <code>k</code>.</p>

<h3>Task</h3>
<p>Implement <code>longest_subarray(arr, k)</code> that returns the length of the longest valid subarray.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>longest_subarray([3, 1, 2, 7, 4, 2, 1, 1, 5], 8) &rarr; 4</code><br>
    (subarray [4, 2, 1, 1] has sum 8 and length 4)
</div>

<div class="hint">Template: Use <code>left</code> pointer and iterate <code>right</code>. Add to <code>curr</code>. While window condition is broken (sum &gt; k), subtract <code>arr[left]</code> and increment <code>left</code>. Update <code>ans</code> with window size.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n) &mdash; Space: O(1)
</div>`,
        starterCode: `def longest_subarray(arr, k):
    # Implement using sliding window
    pass`,
        solution: `def longest_subarray(arr, k):
    left = ans = curr = 0

    for right in range(len(arr)):
        curr += arr[right]

        while curr > k:
            curr -= arr[left]
            left += 1

        ans = max(ans, right - left + 1)

    return ans`,
        testCases: [
            { input: "longest_subarray([3, 1, 2, 7, 4, 2, 1, 1, 5], 8)", expected: "4", description: "[4,2,1,1] sum=8" },
            { input: "longest_subarray([1, 1, 1, 1, 1], 3)", expected: "3", description: "Three ones" },
            { input: "longest_subarray([5, 5, 5], 4)", expected: "0", description: "All elements > k" },
            { input: "longest_subarray([1, 2, 3], 100)", expected: "3", description: "Entire array fits" },
            { input: "longest_subarray([1], 1)", expected: "1", description: "Single element" },
            { input: "longest_subarray([], 5)", expected: "0", description: "Empty array" },
            { input: "longest_subarray([3, 2, 1, 1, 1, 1, 1], 5)", expected: "5", description: "[1,1,1,1,1]" },
        ],
    },

    // =========================================================================
    // 4. Prefix Sum
    // =========================================================================
    {
        id: "prefix-sum",
        title: "Build a Prefix Sum",
        category: "Prefix Sum",
        difficulty: "Easy",
        description: `
<h3>Pattern</h3>
<p>Given an array of integers, build a <strong>prefix sum</strong> array where <code>prefix[i]</code> is the sum of all elements from index 0 to i.</p>

<h3>Task</h3>
<p>Implement <code>build_prefix_sum(arr)</code> that returns the prefix sum array. Then implement <code>range_sum(prefix, left, right)</code> that returns the sum of elements from index <code>left</code> to <code>right</code> (inclusive) in O(1).</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>build_prefix_sum([1, 2, 3, 4, 5]) &rarr; [1, 3, 6, 10, 15]</code><br>
    <code>range_sum([1, 3, 6, 10, 15], 1, 3) &rarr; 9</code> (2+3+4)
</div>

<div class="hint">Template: Start with <code>prefix = [arr[0]]</code>. For each subsequent element, append <code>prefix[-1] + arr[i]</code>.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Build: O(n) &mdash; Query: O(1)
</div>`,
        starterCode: `def build_prefix_sum(arr):
    # Build prefix sum array
    pass

def range_sum(prefix, left, right):
    # Return sum of elements from index left to right using prefix sum
    pass`,
        solution: `def build_prefix_sum(arr):
    prefix = [arr[0]]
    for i in range(1, len(arr)):
        prefix.append(prefix[-1] + arr[i])
    return prefix

def range_sum(prefix, left, right):
    if left == 0:
        return prefix[right]
    return prefix[right] - prefix[left - 1]`,
        testCases: [
            { input: "build_prefix_sum([1, 2, 3, 4, 5])", expected: "[1, 3, 6, 10, 15]", description: "Basic prefix sum" },
            { input: "build_prefix_sum([5])", expected: "[5]", description: "Single element" },
            { input: "build_prefix_sum([1, 1, 1, 1])", expected: "[1, 2, 3, 4]", description: "All ones" },
            { input: "range_sum([1, 3, 6, 10, 15], 0, 4)", expected: "15", description: "Full range" },
            { input: "range_sum([1, 3, 6, 10, 15], 1, 3)", expected: "9", description: "Middle range (2+3+4)" },
            { input: "range_sum([1, 3, 6, 10, 15], 2, 2)", expected: "3", description: "Single element range" },
            { input: "range_sum([1, 3, 6, 10, 15], 0, 0)", expected: "1", description: "First element only" },
        ],
    },

    // =========================================================================
    // 5. Efficient String Building
    // =========================================================================
    {
        id: "string-building",
        title: "Efficient String Building",
        category: "Strings",
        difficulty: "Easy",
        description: `
<h3>Pattern</h3>
<p>Build a string efficiently by collecting characters in a list and joining at the end, instead of concatenating strings (which creates new copies each time).</p>

<h3>Task</h3>
<p>Implement <code>build_string(arr)</code> that takes a list of characters, filters out non-alphabetical characters, converts them to uppercase, and returns the resulting string.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>build_string(['h', 'e', '1', 'l', 'l', '!', 'o']) &rarr; "HELLO"</code>
</div>

<div class="hint">Template: Create an empty list <code>ans = []</code>. Append characters, then return <code>"".join(ans)</code>.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n) &mdash; Space: O(n)
</div>`,
        starterCode: `def build_string(arr):
    # Build string efficiently using list + join
    pass`,
        solution: `def build_string(arr):
    ans = []
    for c in arr:
        if c.isalpha():
            ans.append(c.upper())
    return "".join(ans)`,
        testCases: [
            { input: `build_string(['h', 'e', '1', 'l', 'l', '!', 'o'])`, expected: `"HELLO"`, description: "Filter and uppercase" },
            { input: `build_string(['a', 'b', 'c'])`, expected: `"ABC"`, description: "All alpha" },
            { input: `build_string(['1', '2', '3'])`, expected: `""`, description: "No alpha chars" },
            { input: `build_string([])`, expected: `""`, description: "Empty input" },
            { input: `build_string(['Z'])`, expected: `"Z"`, description: "Single char" },
            { input: `build_string(['a', ' ', 'b', '\\n', 'c'])`, expected: `"ABC"`, description: "With whitespace" },
        ],
    },

    // =========================================================================
    // 6. Linked List: Fast and Slow Pointer
    // =========================================================================
    {
        id: "fast-slow-pointer",
        title: "Linked List: Fast and Slow Pointer",
        category: "Linked List",
        difficulty: "Easy",
        description: `
<h3>Pattern</h3>
<p>Use the <strong>fast and slow pointer</strong> (Floyd's tortoise and hare) technique to find the <strong>middle node</strong> of a linked list.</p>

<h3>Task</h3>
<p>Implement <code>find_middle(head)</code> that returns the value of the middle node. For even-length lists, return the second middle node.</p>

<p>A <code>ListNode</code> class is provided with <code>.val</code> and <code>.next</code> attributes.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>1 -> 2 -> 3 -> 4 -> 5</code> &rarr; <code>3</code><br>
    <code>1 -> 2 -> 3 -> 4</code> &rarr; <code>3</code> (second middle)
</div>

<div class="hint">Template: <code>slow = fast = head</code>. While <code>fast and fast.next</code>, advance <code>slow</code> by 1 and <code>fast</code> by 2.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n) &mdash; Space: O(1)
</div>`,
        starterCode: `def find_middle(head):
    # Use fast and slow pointers to find the middle node
    # Return the value of the middle node
    pass`,
        solution: `def find_middle(head):
    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow.val`,
        testSetup: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def make_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    curr = head
    for v in arr[1:]:
        curr.next = ListNode(v)
        curr = curr.next
    return head
`,
        testCases: [
            { input: "find_middle(make_list([1, 2, 3, 4, 5]))", expected: "3", description: "Odd length, middle is 3" },
            { input: "find_middle(make_list([1, 2, 3, 4]))", expected: "3", description: "Even length, second middle" },
            { input: "find_middle(make_list([1]))", expected: "1", description: "Single node" },
            { input: "find_middle(make_list([1, 2]))", expected: "2", description: "Two nodes" },
            { input: "find_middle(make_list([10, 20, 30, 40, 50, 60, 70]))", expected: "40", description: "Seven nodes" },
        ],
    },

    // =========================================================================
    // 7. Reverse a Linked List
    // =========================================================================
    {
        id: "reverse-linked-list",
        title: "Reverse a Linked List",
        category: "Linked List",
        difficulty: "Easy",
        description: `
<h3>Pattern</h3>
<p>Reverse a singly linked list in-place using three pointers: <code>prev</code>, <code>curr</code>, and <code>next_node</code>.</p>

<h3>Task</h3>
<p>Implement <code>reverse_list(head)</code> that reverses the linked list and returns the new head. A helper <code>to_array(head)</code> is used for testing.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>1 -> 2 -> 3 -> 4 -> 5</code> becomes <code>5 -> 4 -> 3 -> 2 -> 1</code>
</div>

<div class="hint">Template: <code>prev = None</code>, <code>curr = head</code>. While <code>curr</code>: save <code>next_node</code>, point <code>curr.next</code> to <code>prev</code>, advance <code>prev</code> and <code>curr</code>. Return <code>prev</code>.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n) &mdash; Space: O(1)
</div>`,
        starterCode: `def reverse_list(head):
    # Reverse the linked list iteratively
    # Return the new head
    pass`,
        solution: `def reverse_list(head):
    curr = head
    prev = None
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`,
        testSetup: `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def make_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    curr = head
    for v in arr[1:]:
        curr.next = ListNode(v)
        curr = curr.next
    return head

def to_array(head):
    arr = []
    while head:
        arr.append(head.val)
        head = head.next
    return arr
`,
        testCases: [
            { input: "to_array(reverse_list(make_list([1, 2, 3, 4, 5])))", expected: "[5, 4, 3, 2, 1]", description: "Five elements" },
            { input: "to_array(reverse_list(make_list([1, 2])))", expected: "[2, 1]", description: "Two elements" },
            { input: "to_array(reverse_list(make_list([1])))", expected: "[1]", description: "Single element" },
            { input: "to_array(reverse_list(make_list([])))", expected: "[]", description: "Empty list" },
            { input: "to_array(reverse_list(make_list([10, 20, 30])))", expected: "[30, 20, 10]", description: "Three elements" },
        ],
    },

    // =========================================================================
    // 8. Subarrays with Exact Criteria (Hash Map)
    // =========================================================================
    {
        id: "subarray-sum-k",
        title: "Number of Subarrays with Sum = K",
        category: "Hash Map",
        difficulty: "Medium",
        description: `
<h3>Pattern</h3>
<p>Given an array of integers and a target <code>k</code>, find the number of <strong>subarrays</strong> whose elements sum to exactly <code>k</code>. Use a hash map to track prefix sum counts.</p>

<h3>Task</h3>
<p>Implement <code>subarray_sum(arr, k)</code> that returns the count of subarrays summing to <code>k</code>.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>subarray_sum([1, 2, 1, 2, 1], 3) &rarr; 4</code><br>
    (subarrays: [1,2], [2,1], [1,2], [2,1])
</div>

<div class="hint">Template: Use <code>defaultdict(int)</code> with <code>counts[0] = 1</code>. Track running sum <code>curr</code>. At each element, <code>ans += counts[curr - k]</code>, then <code>counts[curr] += 1</code>.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n) &mdash; Space: O(n)
</div>`,
        starterCode: `from collections import defaultdict

def subarray_sum(arr, k):
    # Count subarrays with sum equal to k using hash map
    pass`,
        solution: `from collections import defaultdict

def subarray_sum(arr, k):
    counts = defaultdict(int)
    counts[0] = 1
    ans = curr = 0

    for num in arr:
        curr += num
        ans += counts[curr - k]
        counts[curr] += 1

    return ans`,
        testCases: [
            { input: "subarray_sum([1, 2, 1, 2, 1], 3)", expected: "4", description: "Four subarrays sum to 3" },
            { input: "subarray_sum([1, 1, 1], 2)", expected: "2", description: "[1,1] appears twice" },
            { input: "subarray_sum([1], 1)", expected: "1", description: "Single element equals k" },
            { input: "subarray_sum([1], 2)", expected: "0", description: "No valid subarray" },
            { input: "subarray_sum([0, 0, 0], 0)", expected: "6", description: "Zeros: all subarrays valid" },
            { input: "subarray_sum([-1, 1, 0], 0)", expected: "3", description: "With negatives" },
            { input: "subarray_sum([1, -1, 1, -1], 0)", expected: "4", description: "Alternating" },
        ],
    },

    // =========================================================================
    // 9. Monotonic Stack
    // =========================================================================
    {
        id: "monotonic-stack",
        title: "Monotonic Stack: Next Greater Element",
        category: "Stack",
        difficulty: "Medium",
        description: `
<h3>Pattern</h3>
<p>Given an array, for each element find the <strong>next greater element</strong> to its right. If none exists, use <code>-1</code>. Use a <strong>monotonic decreasing stack</strong>.</p>

<h3>Task</h3>
<p>Implement <code>next_greater(arr)</code> that returns an array where <code>result[i]</code> is the next element greater than <code>arr[i]</code> to the right.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>next_greater([2, 1, 2, 4, 3]) &rarr; [4, 2, 4, -1, -1]</code>
</div>

<div class="hint">Template: Iterate from right to left, maintaining a stack of elements. While the stack top is &le; current element, pop. If stack is non-empty, the top is the answer. Push current element.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n) &mdash; Space: O(n)
</div>`,
        starterCode: `def next_greater(arr):
    # Find next greater element for each position using a monotonic stack
    pass`,
        solution: `def next_greater(arr):
    n = len(arr)
    result = [-1] * n
    stack = []

    for i in range(n - 1, -1, -1):
        while stack and stack[-1] <= arr[i]:
            stack.pop()
        if stack:
            result[i] = stack[-1]
        stack.append(arr[i])

    return result`,
        testCases: [
            { input: "next_greater([2, 1, 2, 4, 3])", expected: "[4, 2, 4, -1, -1]", description: "Basic case" },
            { input: "next_greater([1, 2, 3, 4])", expected: "[2, 3, 4, -1]", description: "Ascending" },
            { input: "next_greater([4, 3, 2, 1])", expected: "[-1, -1, -1, -1]", description: "Descending" },
            { input: "next_greater([1])", expected: "[-1]", description: "Single element" },
            { input: "next_greater([1, 3, 2, 4])", expected: "[3, 4, 4, -1]", description: "Mixed" },
            { input: "next_greater([5, 5, 5])", expected: "[-1, -1, -1]", description: "All equal" },
        ],
    },

    // =========================================================================
    // 10. Binary Tree DFS (Recursive)
    // =========================================================================
    {
        id: "tree-dfs-recursive",
        title: "Binary Tree DFS: Max Depth (Recursive)",
        category: "Binary Tree",
        difficulty: "Easy",
        description: `
<h3>Pattern</h3>
<p>Use <strong>recursive DFS</strong> to find the <strong>maximum depth</strong> of a binary tree.</p>

<h3>Task</h3>
<p>Implement <code>max_depth(root)</code> that returns the maximum depth of the tree. An empty tree has depth 0.</p>

<div class="example">
    <div class="example-label">Example</div>
    <pre><code>    1
   / \\
  2   3
 /
4</code></pre>
    <code>max_depth(root) &rarr; 3</code>
</div>

<div class="hint">Template: Base case: if not root, return 0. Recurse on left and right children. Return 1 + max of both.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n) &mdash; Space: O(h) where h is the height
</div>`,
        starterCode: `def max_depth(root):
    # Find max depth using recursive DFS
    pass`,
        solution: `def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
        testSetup: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def make_tree(arr, i=0):
    if i >= len(arr) or arr[i] is None:
        return None
    node = TreeNode(arr[i])
    node.left = make_tree(arr, 2 * i + 1)
    node.right = make_tree(arr, 2 * i + 2)
    return node
`,
        testCases: [
            { input: "max_depth(make_tree([1, 2, 3, 4]))", expected: "3", description: "Depth 3 (left-heavy)" },
            { input: "max_depth(make_tree([1, 2, 3]))", expected: "2", description: "Balanced depth 2" },
            { input: "max_depth(make_tree([1]))", expected: "1", description: "Single node" },
            { input: "max_depth(None)", expected: "0", description: "Empty tree" },
            { input: "max_depth(make_tree([1, None, 2, None, None, None, 3]))", expected: "3", description: "Right-skewed" },
        ],
    },

    // =========================================================================
    // 11. Binary Tree DFS (Iterative)
    // =========================================================================
    {
        id: "tree-dfs-iterative",
        title: "Binary Tree DFS: Sum of Nodes (Iterative)",
        category: "Binary Tree",
        difficulty: "Easy",
        description: `
<h3>Pattern</h3>
<p>Use an <strong>iterative DFS with an explicit stack</strong> to compute the sum of all node values in a binary tree.</p>

<h3>Task</h3>
<p>Implement <code>tree_sum(root)</code> using a stack (not recursion).</p>

<div class="example">
    <div class="example-label">Example</div>
    <pre><code>    1
   / \\
  2   3
 /
4</code></pre>
    <code>tree_sum(root) &rarr; 10</code>
</div>

<div class="hint">Template: Initialize <code>stack = [root]</code>. While stack not empty: pop node, add value to ans, push left/right children if they exist.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n) &mdash; Space: O(n)
</div>`,
        starterCode: `def tree_sum(root):
    # Sum all nodes using iterative DFS with a stack
    pass`,
        solution: `def tree_sum(root):
    if not root:
        return 0
    stack = [root]
    ans = 0

    while stack:
        node = stack.pop()
        ans += node.val
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)

    return ans`,
        testSetup: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def make_tree(arr, i=0):
    if i >= len(arr) or arr[i] is None:
        return None
    node = TreeNode(arr[i])
    node.left = make_tree(arr, 2 * i + 1)
    node.right = make_tree(arr, 2 * i + 2)
    return node
`,
        testCases: [
            { input: "tree_sum(make_tree([1, 2, 3, 4]))", expected: "10", description: "1+2+3+4=10" },
            { input: "tree_sum(make_tree([5]))", expected: "5", description: "Single node" },
            { input: "tree_sum(None)", expected: "0", description: "Empty tree" },
            { input: "tree_sum(make_tree([1, 2, 3, 4, 5, 6, 7]))", expected: "28", description: "Complete tree" },
            { input: "tree_sum(make_tree([10, 20, 30]))", expected: "60", description: "Three nodes" },
        ],
    },

    // =========================================================================
    // 12. Binary Tree BFS
    // =========================================================================
    {
        id: "tree-bfs",
        title: "Binary Tree BFS: Level Order Traversal",
        category: "Binary Tree",
        difficulty: "Medium",
        description: `
<h3>Pattern</h3>
<p>Use <strong>BFS with a queue</strong> to traverse a binary tree level by level, returning a list of lists where each inner list contains the values at that depth.</p>

<h3>Task</h3>
<p>Implement <code>level_order(root)</code> that returns the level-order traversal.</p>

<div class="example">
    <div class="example-label">Example</div>
    <pre><code>    1
   / \\
  2   3
 / \\
4   5</code></pre>
    <code>level_order(root) &rarr; [[1], [2, 3], [4, 5]]</code>
</div>

<div class="hint">Template: Use <code>deque([root])</code>. While queue: get <code>current_length</code>. Loop <code>current_length</code> times, popleft, collect values, add children.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n) &mdash; Space: O(n)
</div>`,
        starterCode: `from collections import deque

def level_order(root):
    # BFS level-order traversal returning list of lists
    pass`,
        solution: `from collections import deque

def level_order(root):
    if not root:
        return []
    queue = deque([root])
    ans = []

    while queue:
        current_length = len(queue)
        level = []

        for _ in range(current_length):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        ans.append(level)

    return ans`,
        testSetup: `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def make_tree(arr, i=0):
    if i >= len(arr) or arr[i] is None:
        return None
    node = TreeNode(arr[i])
    node.left = make_tree(arr, 2 * i + 1)
    node.right = make_tree(arr, 2 * i + 2)
    return node
`,
        testCases: [
            { input: "level_order(make_tree([1, 2, 3, 4, 5]))", expected: "[[1], [2, 3], [4, 5]]", description: "Three levels" },
            { input: "level_order(make_tree([1]))", expected: "[[1]]", description: "Single node" },
            { input: "level_order(None)", expected: "[]", description: "Empty tree" },
            { input: "level_order(make_tree([1, 2, 3, 4, 5, 6, 7]))", expected: "[[1], [2, 3], [4, 5, 6, 7]]", description: "Complete tree" },
            { input: "level_order(make_tree([1, 2, None]))", expected: "[[1], [2]]", description: "Left child only" },
        ],
    },

    // =========================================================================
    // 13. Graph DFS (Recursive)
    // =========================================================================
    {
        id: "graph-dfs-recursive",
        title: "Graph DFS: Connected Components (Recursive)",
        category: "Graph",
        difficulty: "Medium",
        description: `
<h3>Pattern</h3>
<p>Given an undirected graph as an adjacency list and a number of nodes <code>n</code>, count the number of <strong>connected components</strong> using recursive DFS.</p>

<h3>Task</h3>
<p>Implement <code>count_components(n, graph)</code> where <code>graph</code> is a dict mapping node to list of neighbors.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>n=5, graph={0:[1], 1:[0], 2:[3], 3:[2], 4:[]}</code> &rarr; <code>3</code><br>
    (components: {0,1}, {2,3}, {4})
</div>

<div class="hint">Template: For each unvisited node, run DFS marking all reachable nodes as seen. Increment count for each DFS call from the outer loop. Use a <code>seen</code> set.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n + e) &mdash; Space: O(n)
</div>`,
        starterCode: `def count_components(n, graph):
    # Count connected components using recursive DFS
    pass`,
        solution: `def count_components(n, graph):
    def dfs(node):
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                dfs(neighbor)

    seen = set()
    count = 0
    for i in range(n):
        if i not in seen:
            seen.add(i)
            dfs(i)
            count += 1
    return count`,
        testCases: [
            { input: "count_components(5, {0:[1], 1:[0], 2:[3], 3:[2], 4:[]})", expected: "3", description: "Three components" },
            { input: "count_components(3, {0:[1,2], 1:[0,2], 2:[0,1]})", expected: "1", description: "Fully connected" },
            { input: "count_components(4, {0:[], 1:[], 2:[], 3:[]})", expected: "4", description: "No edges" },
            { input: "count_components(1, {0:[]})", expected: "1", description: "Single node" },
            { input: "count_components(6, {0:[1], 1:[0], 2:[3], 3:[2], 4:[5], 5:[4]})", expected: "3", description: "Three pairs" },
        ],
    },

    // =========================================================================
    // 14. Graph BFS
    // =========================================================================
    {
        id: "graph-bfs",
        title: "Graph BFS: Shortest Path (Unweighted)",
        category: "Graph",
        difficulty: "Medium",
        description: `
<h3>Pattern</h3>
<p>Given an unweighted undirected graph, find the <strong>shortest path length</strong> (number of edges) from a <code>source</code> to a <code>target</code> node using BFS. Return <code>-1</code> if unreachable.</p>

<h3>Task</h3>
<p>Implement <code>shortest_path(graph, source, target)</code>.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>graph={0:[1,2], 1:[0,3], 2:[0,3], 3:[1,2]}</code><br>
    <code>shortest_path(graph, 0, 3) &rarr; 2</code>
</div>

<div class="hint">Template: BFS from source using <code>deque</code>. Track <code>seen</code> set. Count levels. When target is found, return current distance.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n + e) &mdash; Space: O(n)
</div>`,
        starterCode: `from collections import deque

def shortest_path(graph, source, target):
    # BFS shortest path in unweighted graph
    pass`,
        solution: `from collections import deque

def shortest_path(graph, source, target):
    if source == target:
        return 0
    queue = deque([(source, 0)])
    seen = {source}

    while queue:
        node, dist = queue.popleft()
        for neighbor in graph[node]:
            if neighbor == target:
                return dist + 1
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append((neighbor, dist + 1))

    return -1`,
        testCases: [
            { input: "shortest_path({0:[1,2], 1:[0,3], 2:[0,3], 3:[1,2]}, 0, 3)", expected: "2", description: "Two hops" },
            { input: "shortest_path({0:[1], 1:[0,2], 2:[1]}, 0, 2)", expected: "2", description: "Linear graph" },
            { input: "shortest_path({0:[1], 1:[0], 2:[]}, 0, 2)", expected: "-1", description: "Unreachable" },
            { input: "shortest_path({0:[1], 1:[0]}, 0, 0)", expected: "0", description: "Source equals target" },
            { input: "shortest_path({0:[1,2,3], 1:[0], 2:[0], 3:[0,4], 4:[3]}, 0, 4)", expected: "2", description: "Through node 3" },
        ],
    },

    // =========================================================================
    // 15. Heap: Top K Elements
    // =========================================================================
    {
        id: "top-k-heap",
        title: "Heap: Top K Largest Elements",
        category: "Heap",
        difficulty: "Medium",
        description: `
<h3>Pattern</h3>
<p>Given an array and integer <code>k</code>, find the <code>k</code> largest elements using a <strong>min-heap</strong> of size k.</p>

<h3>Task</h3>
<p>Implement <code>top_k_largest(arr, k)</code> that returns the k largest elements as a sorted list (ascending).</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>top_k_largest([3, 1, 5, 12, 2, 11], 3) &rarr; [5, 11, 12]</code>
</div>

<div class="hint">Template: Maintain a min-heap of size k. Push each element; if heap size exceeds k, pop the smallest. Final heap contains the k largest.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n log k) &mdash; Space: O(k)
</div>`,
        starterCode: `import heapq

def top_k_largest(arr, k):
    # Find k largest elements using a min-heap
    pass`,
        solution: `import heapq

def top_k_largest(arr, k):
    heap = []
    for num in arr:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return sorted(heap)`,
        testCases: [
            { input: "top_k_largest([3, 1, 5, 12, 2, 11], 3)", expected: "[5, 11, 12]", description: "Top 3 of 6" },
            { input: "top_k_largest([1, 2, 3, 4, 5], 2)", expected: "[4, 5]", description: "Top 2" },
            { input: "top_k_largest([5, 5, 5], 2)", expected: "[5, 5]", description: "Duplicates" },
            { input: "top_k_largest([1], 1)", expected: "[1]", description: "Single element" },
            { input: "top_k_largest([10, -1, 3, 7, 2, 8], 4)", expected: "[3, 7, 8, 10]", description: "Top 4 with negatives" },
        ],
    },

    // =========================================================================
    // 16. Binary Search
    // =========================================================================
    {
        id: "binary-search",
        title: "Binary Search",
        category: "Binary Search",
        difficulty: "Easy",
        description: `
<h3>Pattern</h3>
<p>Implement classic <strong>binary search</strong> on a sorted array. Return the index of the target, or <code>-1</code> if not found.</p>

<h3>Task</h3>
<p>Implement <code>binary_search(arr, target)</code>.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>binary_search([1, 3, 5, 7, 9], 5) &rarr; 2</code><br>
    <code>binary_search([1, 3, 5, 7, 9], 4) &rarr; -1</code>
</div>

<div class="hint">Template: <code>left = 0</code>, <code>right = len(arr) - 1</code>. While <code>left &le; right</code>: compute <code>mid</code>, compare, adjust bounds.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(log n) &mdash; Space: O(1)
</div>`,
        starterCode: `def binary_search(arr, target):
    # Classic binary search, return index or -1
    pass`,
        solution: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] > target:
            right = mid - 1
        else:
            left = mid + 1
    return -1`,
        testCases: [
            { input: "binary_search([1, 3, 5, 7, 9], 5)", expected: "2", description: "Found in middle" },
            { input: "binary_search([1, 3, 5, 7, 9], 1)", expected: "0", description: "Found at start" },
            { input: "binary_search([1, 3, 5, 7, 9], 9)", expected: "4", description: "Found at end" },
            { input: "binary_search([1, 3, 5, 7, 9], 4)", expected: "-1", description: "Not found" },
            { input: "binary_search([], 5)", expected: "-1", description: "Empty array" },
            { input: "binary_search([5], 5)", expected: "0", description: "Single element found" },
            { input: "binary_search([5], 3)", expected: "-1", description: "Single element not found" },
        ],
    },

    // =========================================================================
    // 17. Binary Search: Left-most Insertion Point
    // =========================================================================
    {
        id: "bisect-left",
        title: "Binary Search: Left-most Insertion Point",
        category: "Binary Search",
        difficulty: "Medium",
        description: `
<h3>Pattern</h3>
<p>Given a sorted array (possibly with duplicates) and a target, find the <strong>left-most index</strong> where target could be inserted to keep the array sorted (equivalent to <code>bisect_left</code>).</p>

<h3>Task</h3>
<p>Implement <code>bisect_left(arr, target)</code>.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>bisect_left([1, 3, 3, 3, 5], 3) &rarr; 1</code><br>
    <code>bisect_left([1, 3, 5], 4) &rarr; 2</code>
</div>

<div class="hint">Template: <code>left = 0</code>, <code>right = len(arr)</code>. While <code>left &lt; right</code>: if <code>arr[mid] &ge; target</code>, <code>right = mid</code>; else <code>left = mid + 1</code>.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(log n) &mdash; Space: O(1)
</div>`,
        starterCode: `def bisect_left(arr, target):
    # Find left-most insertion point
    pass`,
        solution: `def bisect_left(arr, target):
    left = 0
    right = len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] >= target:
            right = mid
        else:
            left = mid + 1
    return left`,
        testCases: [
            { input: "bisect_left([1, 3, 3, 3, 5], 3)", expected: "1", description: "Left-most position for 3" },
            { input: "bisect_left([1, 3, 5], 4)", expected: "2", description: "Insert between 3 and 5" },
            { input: "bisect_left([1, 3, 5], 0)", expected: "0", description: "Insert at beginning" },
            { input: "bisect_left([1, 3, 5], 6)", expected: "3", description: "Insert at end" },
            { input: "bisect_left([], 5)", expected: "0", description: "Empty array" },
            { input: "bisect_left([2, 2, 2], 2)", expected: "0", description: "All same, left-most" },
        ],
    },

    // =========================================================================
    // 18. Backtracking: Subsets
    // =========================================================================
    {
        id: "backtracking-subsets",
        title: "Backtracking: Generate All Subsets",
        category: "Backtracking",
        difficulty: "Medium",
        description: `
<h3>Pattern</h3>
<p>Given an array of <strong>distinct</strong> integers, generate all possible subsets (the power set) using <strong>backtracking</strong>.</p>

<h3>Task</h3>
<p>Implement <code>subsets(nums)</code> that returns a list of all subsets. Each subset should be sorted, and the output list should be sorted by length then lexicographically.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>subsets([1, 2, 3]) &rarr; [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]</code>
</div>

<div class="hint">Template: Define <code>backtrack(start, curr)</code>. At each call, add a copy of <code>curr</code> to results. Iterate from <code>start</code> to end: add element, recurse with <code>start+1</code>, remove element.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n * 2^n) &mdash; Space: O(n) for recursion
</div>`,
        starterCode: `def subsets(nums):
    # Generate all subsets using backtracking
    pass`,
        solution: `def subsets(nums):
    result = []

    def backtrack(start, curr):
        result.append(curr[:])
        for i in range(start, len(nums)):
            curr.append(nums[i])
            backtrack(i + 1, curr)
            curr.pop()

    backtrack(0, [])
    result.sort(key=lambda x: (len(x), x))
    return result`,
        testCases: [
            { input: "subsets([1, 2, 3])", expected: "[[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]", description: "Three elements" },
            { input: "subsets([1])", expected: "[[], [1]]", description: "Single element" },
            { input: "subsets([])", expected: "[[]]", description: "Empty input" },
            { input: "len(subsets([1, 2, 3, 4]))", expected: "16", description: "2^4 = 16 subsets" },
        ],
    },

    // =========================================================================
    // 19. Dynamic Programming: Top-Down Memoization
    // =========================================================================
    {
        id: "dp-top-down",
        title: "DP: Climbing Stairs (Top-Down)",
        category: "Dynamic Programming",
        difficulty: "Easy",
        description: `
<h3>Pattern</h3>
<p>You are climbing a staircase with <code>n</code> steps. Each time you can climb 1 or 2 steps. Use <strong>top-down memoization</strong> to count the distinct ways to reach the top.</p>

<h3>Task</h3>
<p>Implement <code>climb_stairs(n)</code> using a recursive approach with a memo dictionary.</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>climb_stairs(5) &rarr; 8</code><br>
    <code>climb_stairs(3) &rarr; 3</code> (1+1+1, 1+2, 2+1)
</div>

<div class="hint">Template: Define inner <code>dp(state)</code>. Base cases: dp(0) = 1, dp(1) = 1. Check memo. Compute <code>dp(state-1) + dp(state-2)</code>. Store in memo.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O(n) &mdash; Space: O(n)
</div>`,
        starterCode: `def climb_stairs(n):
    # Count ways to climb n stairs using top-down DP with memoization
    pass`,
        solution: `def climb_stairs(n):
    def dp(i):
        if i <= 1:
            return 1
        if i in memo:
            return memo[i]
        ans = dp(i - 1) + dp(i - 2)
        memo[i] = ans
        return ans

    memo = {}
    return dp(n)`,
        testCases: [
            { input: "climb_stairs(1)", expected: "1", description: "One step" },
            { input: "climb_stairs(2)", expected: "2", description: "Two steps: 1+1 or 2" },
            { input: "climb_stairs(3)", expected: "3", description: "1+1+1, 1+2, 2+1" },
            { input: "climb_stairs(5)", expected: "8", description: "Fibonacci pattern" },
            { input: "climb_stairs(10)", expected: "89", description: "Larger input" },
            { input: "climb_stairs(0)", expected: "1", description: "Zero steps (base case)" },
            { input: "climb_stairs(20)", expected: "10946", description: "Fib(21)" },
        ],
    },

    // =========================================================================
    // 20. Trie
    // =========================================================================
    {
        id: "trie",
        title: "Build a Trie",
        category: "Trie",
        difficulty: "Medium",
        description: `
<h3>Pattern</h3>
<p>Build a <strong>Trie</strong> (prefix tree) that supports <code>insert</code> and <code>search</code> operations.</p>

<h3>Task</h3>
<p>Implement a <code>Trie</code> class with:</p>
<ul>
    <li><code>insert(word)</code> &mdash; inserts a word into the trie</li>
    <li><code>search(word)</code> &mdash; returns <code>True</code> if the exact word exists</li>
    <li><code>starts_with(prefix)</code> &mdash; returns <code>True</code> if any word starts with the prefix</li>
</ul>

<div class="example">
    <div class="example-label">Example</div>
    <code>t = Trie(); t.insert("apple"); t.search("apple") &rarr; True</code><br>
    <code>t.search("app") &rarr; False; t.starts_with("app") &rarr; True</code>
</div>

<div class="hint">Template: Each node has a <code>children</code> dict and an <code>is_end</code> flag. Insert traverses/creates nodes. Search traverses and checks <code>is_end</code>.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Insert/Search: O(m) where m = word length
</div>`,
        starterCode: `class Trie:
    def __init__(self):
        # Initialize trie
        pass

    def insert(self, word):
        # Insert a word into the trie
        pass

    def search(self, word):
        # Return True if word exists in trie
        pass

    def starts_with(self, prefix):
        # Return True if any word starts with prefix
        pass`,
        solution: `class Trie:
    def __init__(self):
        self.children = {}
        self.is_end = False

    def insert(self, word):
        curr = self
        for c in word:
            if c not in curr.children:
                curr.children[c] = Trie()
            curr = curr.children[c]
        curr.is_end = True

    def search(self, word):
        curr = self
        for c in word:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return curr.is_end

    def starts_with(self, prefix):
        curr = self
        for c in prefix:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return True`,
        testCases: [
            { input: `t = Trie(); t.insert("apple"); t.search("apple")`, expected: "True", description: "Search inserted word" },
            { input: `t = Trie(); t.insert("apple"); t.search("app")`, expected: "False", description: "Prefix is not a word" },
            { input: `t = Trie(); t.insert("apple"); t.starts_with("app")`, expected: "True", description: "Prefix exists" },
            { input: `t = Trie(); t.insert("apple"); t.insert("app"); t.search("app")`, expected: "True", description: "After inserting prefix as word" },
            { input: `t = Trie(); t.search("anything")`, expected: "False", description: "Empty trie" },
            { input: `t = Trie(); t.insert("a"); t.insert("ab"); t.starts_with("ab")`, expected: "True", description: "Overlapping words" },
        ],
    },

    // =========================================================================
    // 21. Dijkstra's Algorithm
    // =========================================================================
    {
        id: "dijkstra",
        title: "Dijkstra's Shortest Path",
        category: "Graph",
        difficulty: "Hard",
        description: `
<h3>Pattern</h3>
<p>Given a weighted directed graph, find the shortest distance from a <code>source</code> node to all other nodes using <strong>Dijkstra's algorithm</strong>.</p>

<h3>Task</h3>
<p>Implement <code>dijkstra(n, graph, source)</code> where <code>n</code> is the number of nodes, <code>graph</code> is a dict mapping <code>node</code> to list of <code>(neighbor, weight)</code> tuples. Return a list of shortest distances (use <code>float('inf')</code> for unreachable nodes).</p>

<div class="example">
    <div class="example-label">Example</div>
    <code>dijkstra(4, {0:[(1,1),(2,4)], 1:[(2,2),(3,6)], 2:[(3,3)], 3:[]}, 0)</code><br>
    &rarr; <code>[0, 1, 3, 6]</code>
</div>

<div class="hint">Template: Initialize <code>distances = [inf] * n</code>, <code>distances[source] = 0</code>. Use min-heap <code>[(0, source)]</code>. Pop smallest, skip if stale, relax edges.</div>

<div class="complexity">
    <div class="complexity-label">Expected Complexity</div>
    Time: O((n + e) log n) &mdash; Space: O(n + e)
</div>`,
        starterCode: `from math import inf
from heapq import heappush, heappop

def dijkstra(n, graph, source):
    # Dijkstra's shortest path from source to all nodes
    pass`,
        solution: `from math import inf
from heapq import heappush, heappop

def dijkstra(n, graph, source):
    distances = [inf] * n
    distances[source] = 0
    heap = [(0, source)]

    while heap:
        curr_dist, node = heappop(heap)
        if curr_dist > distances[node]:
            continue
        for nei, weight in graph[node]:
            dist = curr_dist + weight
            if dist < distances[nei]:
                distances[nei] = dist
                heappush(heap, (dist, nei))

    return distances`,
        testCases: [
            { input: "dijkstra(4, {0:[(1,1),(2,4)], 1:[(2,2),(3,6)], 2:[(3,3)], 3:[]}, 0)", expected: "[0, 1, 3, 6]", description: "Basic weighted graph" },
            { input: "dijkstra(3, {0:[(1,1)], 1:[(2,1)], 2:[]}, 0)", expected: "[0, 1, 2]", description: "Linear graph" },
            { input: "dijkstra(3, {0:[(1,5),(2,2)], 1:[], 2:[(1,1)]}, 0)", expected: "[0, 3, 2]", description: "Shorter path through 2" },
            { input: "dijkstra(2, {0:[], 1:[]}, 0)", expected: "[0, inf]", description: "Unreachable node" },
            { input: "dijkstra(1, {0:[]}, 0)", expected: "[0]", description: "Single node" },
        ],
    },
];
