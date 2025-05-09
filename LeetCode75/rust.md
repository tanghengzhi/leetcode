# LeetCode 75

## Array / String

### Merge Strings Alternately

```rust
impl Solution {
    pub fn merge_alternately(word1: String, word2: String) -> String {
        let mut result = String::new();

        for i in 0..100 {
            if let Some(x) = word1.chars().nth(i) {
                result.push(x)
            }
            if let Some(y) = word2.chars().nth(i) {
                result.push(y)
            }
        }

        return result;
    }
}
```
