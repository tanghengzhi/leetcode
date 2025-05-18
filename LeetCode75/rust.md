# LeetCode 75

## Array / String

### Merge Strings Alternately

> Runtime Beats 49.76%, Memory Beats 68.54%

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

### Greatest Common Divisor of Strings

> Runtime Beats 100%, Memory Beats 71.97%

```rust
impl Solution {
    pub fn gcd_of_strings(str1: String, str2: String) -> String {
        if (format!("{}{}", str1, str2) != format!("{}{}", str2, str1)) {
            return String::new()
        }

        str1[0..Self::gcd(str1.len(), str2.len())].to_string()
    }

    fn gcd(a: usize, b: usize) -> usize {
        if b == 0 {
            a
        } else {
            Self::gcd(b, a % b)
        }
    }
}
```
