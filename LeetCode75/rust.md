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

### Kids With the Greatest Number of Candies

> Runtime Beats 100%, Memory Beats 60.94%

```rust
impl Solution {
    pub fn kids_with_candies(candies: Vec<i32>, extra_candies: i32) -> Vec<bool> {
        let maxValue = candies.iter().max().unwrap();

        return candies.iter().map(|x| x + extra_candies >= *maxValue).collect();
    }
}
```

### Can Place Flowers

> Runtime Beats 100%, Memory Beats 76.19%

```rust
impl Solution {
    pub fn can_place_flowers(mut flowerbed: Vec<i32>, mut n: i32) -> bool {
        let len = flowerbed.len();

        for i in 0..len {
            if (flowerbed[i] == 1) {
                continue;
            }

            if let Some(prev) = flowerbed.get(i - 1) {
                if (*prev == 1) { continue; }
            }

            if let Some(next) = flowerbed.get(i + 1) {
                if (*next == 1) { continue; }
            }

            flowerbed[i] = 1;
            n -= 1;
        }

        return n <= 0;
    }
}
```

### Reverse Words in a String

> Runtime Beats 31.22%, Memory Beats 73.55%

```rust
impl Solution {
    pub fn reverse_vowels(s: String) -> String {
        let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
        let mut reverse = String::new();
        let mut result = String::new();

        for c in s.chars() {
            if vowels.contains(&c) {
                reverse.push(c);
            }
        }

        for c in s.chars() {
            if vowels.contains(&c) {
                result.push(reverse.pop().unwrap());
            } else {
                result.push(c);
            }
        }

        return result;
    }
}
```

### Reverse Words in a String

> Runtime Beats 2.72%, Memory Beats 3.80%

```rust
use regex::Regex;

impl Solution {
    pub fn reverse_words(s: String) -> String {
        let pattern = r"\w+";
        let re = Regex::new(pattern).unwrap();

        let mut words: Vec<String> = Vec::new();
        let mut result = String::new();

        for mat in re.find_iter(&s) {
            words.push(mat.as_str().to_string())
        }

        while let Some(word) = words.pop() {
            result.push_str(&word);
            result.push(' ');
        }

        result.pop();

        return result;
    }
}
```
