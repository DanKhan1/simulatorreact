export function factorial(n) {
    if (n === 0) {
        return 1;
    }
    if (n > 0) {
        return n * factorial(n - 1);
    }
}