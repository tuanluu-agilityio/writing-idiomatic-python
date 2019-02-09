---
title: "General Advice"
date: "2019-02-09"
order: 4
---

### Contents

1. [Avoid Reinventing the Wheel](#formatting)
2. [Modules of Note](#documents)
3. [Testing](#imports)


## <a name="avoid_reinventing">Avoid Reinventing the Wheel</a>

1. Get to know `PyPI` (the Python Package Index)

    `pip install <package name>`

2. Learn the Contents of the Python Standard Library

## <a name="modules_of_note">Modules of Note</a>

1. Learn the contents of the itertools module

2. Use functions in the `os.path` module when working with directory paths

**Harmful**
```python
from datetime import date
import os

filename_to_archive = 'test.txt'
new_filename = 'test.bak'
target_directory = './archives'
today = date.today()
os.mkdir('./archives/' + str(today))
os.rename(
    filename_to_archive,
    target_directory + '/' + str(today) + '/' + new_filename)
```

**Idiomatic**
```python
from datetime import date
import os

current_directory = os.getcwd()
filename_to_archive = 'test.txt'
new_filename = os.path.splitext(filename_to_archive)[0] + '.bak'
target_directory = os.path.join(current_directory, 'archives')
today = date.today()
new_path = os.path.join(target_directory, str(today))
if (os.path.isdir(target_directory)):
    if not os.path.exists(new_path):
        os.mkdir(new_path)
    os.rename(
        os.path.join(current_directory, filename_to_archive),
        os.path.join(new_path, new_filename))
```

## <a name="testing">Testing</a>

1. Use an automated testing tool; it doesn’t matter which one

2. Separate your test code from your application code

3. Use unit tests to aid in refactoring

4. Make use of the appropriate `assert` methods in unit tests

**Harmful**
```python
class Test(unittest.TestCase):

    def test_adding_positive_ints(self):
        """Does adding together two positive integers work?"""
        self.assertTrue(my_addition(2, 2) == 4)

    def test_increment(self):
        """Does increment return a value greater than what was passed as an argument?"""
        self.assertTrue(increment(1) > 1)

    def test_divisors_of_prime_number(self):
        self.assertTrue(get_divisors(11) is None)
```

**Idiomatic**
```python
class Test(unittest.TestCase):
    def test_adding_positive_ints(self):
        """Does adding together two positive integers work?"""
        self.assertEqual(my_addition(2, 2), 4)

    def test_increment(self):
        """Does increment return a value greater than what was passed as an argument?"""
        self.assertGreaterThan(increment(1), 1)

    def test_divisors_of_prime_number(self):
        self.assertIsNone(get_divisors(11))
```
