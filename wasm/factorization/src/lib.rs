use wasm_bindgen::prelude::*;

fn reduce(n: &mut u64, factor: u64) -> Option<f64> {
    let mut power = 0;
    while *n % factor == 0 {
        *n /= factor;
        power += 1;
    }
    (power > 0).then_some(power as f64)
}

// TODO: Iterate through primes, not all odd numbers.
#[wasm_bindgen]
pub fn solve(arg: f64) -> Vec<f64> {
    let mut n = arg as u64;
    if n as f64 != arg || n < 2 {
        return Vec::new();
    }
    let mut flat_pairs = reduce(&mut n, 2)
        .map(|power| vec![2.0, power])
        .unwrap_or_default();
    let mut factor = 3;
    while factor <= n {
        if let Some(power) = reduce(&mut n, factor) {
            flat_pairs.extend([factor as f64, power]);
        }
        factor += 2;
    }
    flat_pairs
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_solve() {
        assert_eq!(solve(252.0), [2.0, 2.0, 3.0, 2.0, 7.0, 1.0]);
    }

    #[ignore]
    #[test]
    fn test_solve_big() {
        assert_eq!(
            solve(23456789985365.0),
            [5.0, 1.0, 11.0, 1.0, 426487090643.0, 1.0]
        );
    }
}
