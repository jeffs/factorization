use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve(arg: f64) -> Vec<f64> {
    vec![arg, 2.0]
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_solve() {
        assert_eq!(solve(42.0), vec![42.0, 2.0]);
    }
}
