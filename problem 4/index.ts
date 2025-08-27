
function validateInput(n: number): void {
    if (n < 1) {
        throw new Error('Invalid input n')
    }
}

function sum_to_n_a(n: number): number {
    // Using the arithmetic series formula: n * (n + 1) / 2
    // Time Complexity: O(n)
    // Space Complexity: O(1)
    // Efficiency: The best solution.

    return (n * (n + 1)) / 2;
}

function sum_to_n_b(n: number): number {
    // Using Iterative Loop from 1 to n
    // Time Complexity: O(n)
    // Space Complexity: O(1)

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sum_to_n_recursive(n: number): number {
    if (n <= 1) return n;
    return n + sum_to_n_recursive(n - 1);
}

function sum_to_n_c(n: number): number {
    // Using Recursive Method
    // Time Complexity: O(n) – each recursive call reduces n by 1.
    // Space Complexity: O(n) – call stack grows linearly with n.

    const s = sum_to_n_recursive(n);

    return s;
}

function main() {
    const n = 230

    // validate input if needed
    validateInput(n)

    // func A
    const suma = sum_to_n_a(n)
    console.log('Sum A=' + suma)

    // func B
    const sumb = sum_to_n_b(n)
    console.log('Sum B=' + sumb)

    // func C
    const sumc = sum_to_n_c(n)
    console.log('Sum C=' + sumc)
}
main()