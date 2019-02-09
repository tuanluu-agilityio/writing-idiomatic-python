---
title: "Organizing Your Code"
date: "2019-02-09"
order: 3
---

### Contents

1. [Formatting](#formatting)
2. [Documentation](#documents)
3. [Imports](#imports)
4. [Modules and Packages](#modules_and_packages)
5. [Executable Scripts](#executable_scripts)


## <a name="formatting">Formatting</a>

1. Use all capital letters when declaring global constant values

**Harmful**
```python
seconds_in_a_day = 60 * 60 * 24
# ...
def display_uptime(uptime_in_seconds):
    percentage_run_time = (
        uptime_in_seconds/seconds_in_a_day) * 100
    # "Huh!? Where did seconds_in_a_day come from?"

    return 'The process was up {percent} percent of the day'.format(
        percent=int(percentage_run_time))

# ...
uptime_in_seconds = 60 * 60 * 24
display_uptime(uptime_in_seconds)
```

**Idiomatic**
```python
SECONDS_IN_A_DAY = 60 * 60 * 24

# ...
def display_uptime(uptime_in_seconds):
    percentage_run_time = (
        uptime_in_seconds/SECONDS_IN_A_DAY) * 100
    # "Clearly SECONDS_IN_A_DAY is a constant defined
    # elsewhere in this module."

    return 'The process was up {percent} percent of the day'.format(
        percent=int(percentage_run_time))

# ...
uptime_in_seconds = 60 * 60 * 24
display_uptime(uptime_in_seconds)
```

2. Format your code according to `PEP8`

__Table 3.1: Unless wildly unreasonable, abbreviations should not
be used (acronyms are fine if in common use, like ‘HTTP’)__

Identifier Type | Format | Example
------------ | ------------- | -------------
Class | Camel case | class StringManipulator():
Variable | Words joined by _ | joined_by_underscore = True
Function | Words joined by _ | def multi_word_name(words):
Constant | All uppercase | SECRET_KEY = 42

3. Avoid placing multiple statements on a single line

**Harmful**
```python
for element in my_list: print(element); print('--------')
```

**Idiomatic**
```python
for element in my_list:
    print(element)
    print('--------')
```

## <a name="documents">Documentation</a>

1. Follow the `docstring` conventions described in PEP-257

**Harmful**
```python
def calculate_statistics(value_list):

    # calculates various statistics for a list of numbers

    <The body of the function>
```

**Idiomatic**
```python
def calculate_statistics(value_list):
    """Return a tuple containing the mean, median,
    and mode of a list of integers

    Arguments:
    value_list -- a list of integer values

    """

    <The body of the function>
```

**Idiomatic**
```python
def calculate_statistics(value_list):
    """Return a tuple containing the mean, median,
    and mode of a list of integers

    Arguments:
    value_list -- a list of integer values

    """

    <The body of the function>
```

2. Use Inline Documentation Sparingly

**Harmful**
```python
def calculate_mean(numbers):
    """Return the mean of a list of numbers"""
    
    # If the list is empty, we have no mean!
    if not numbers:
        return 0

    # A variable to keep track of the running sum
    total = 0

    # Iterate over each number in the list
    for number in numbers:
        total += number
    
    # Divide the sum of all the numbers by how
    # many numbers were in the list
    # to arrive at the sum. Return this value.
    return total / len(numbers)
```

**Idiomatic**
```python
def calculate_mean(numbers):
    """Return the mean of a list of numbers"""
    return sum(numbers) / len(numbers)
```

3. Document *what* something does, not how

**Harmful**
```python
def is_prime(number):
    """Mod all numbers from 2 -> number and return True
    if the value is never 0"""

    for candidate in range(2, number):
        if number % candidate == 0:
            print(candidate)
            print(number % candidate)
            return False

    return number > 0
```

**Idiomatic**
```python
def is_prime(number):
    """Return True if number is prime"""

    for candidate in range(2, number):
        if number % candidate == 0:
            return False

    return number > 0
```

## <a name="imports">Imports</a>

1. Arrange your import statements in a standard order

    The following is the order recommended by Python’s Programming FAQ:

        1. standard library modules
        2. third-party library modules installed in site-packages
        3. modules local to the current project

**Harmful**
```python
import os.path

# Some function and class definitions,
# one of which uses os.path
# ....
import concurrent.futures
from flask import render_template

# Stuff using futures and Flask's render_template
# ....

from flask import (Flask, request, session, g,
    redirect, url_for, abort,
    render_template, flash, _app_ctx_stack)
import requests

# Code using flask and requests
# ....
if __name__ == '__main__':
    # Imports when imported as a module are not so
    # costly that they need to be relegated import cProfile
# Uh-oh! The user doesn't have cProfile installed! Raise an exception
# here...
print(cProfile.__all__)to inside
    # an 'if __name__ == '__main__'' block...
    import this_project.utilities.sentient_network as skynet
    import this_project.widgets
    import sys
```

**Idiomatic**
```python
# Easy to see exactly what my dependencies are and where to
# make changes if a module or package name changes
import concurrent.futures
import os.path
import sys
from flask import (Flask, request, session, g,
    redirect, url_for, abort,
    render_template, flash, _app_ctx_stack)
import requests
import this_project.utilities.sentient_network as skynet
import this_project.widgets
```

2. Prefer `absolute imports` to `relative imports`

**Harmful**
```python
# My location is package.sub_package.module
# and I want to import package.other_module.
# The following should be avoided:

from ...package import other_module
```

**Idiomatic**
```python
# My location is package.sub_package.another_sub_package.module
# and I want to import package.other_module.
# Either of the following are acceptable:

import package.other_module
import package.other_module as other
```

3. Do not use `from foo import *` to import the contents of a module.

**Harmful**
```python
from foo import *
```

**Idiomatic**
```python
from foo import (bar, baz, qux,
        quux, quuux)

# or even better...
import foo
```

4. Use a `try` block to determine if a package is available

**Harmful**
```python
import cProfile
# Uh-oh! The user doesn't have cProfile installed! Raise an exception
# here...
print(cProfile.__all__)
```

**Idiomatic**
```python
try:
    import cProfile as profiler
except:
    import profile as profiler
print(profiler.__all__)
```

5. Use the `tuples` to organize a long list of modules to `import`

**Harmful**
```python
from django.db.models import AutoField, BigIntegerField, BooleanField, CharField
from django.db.models import CommaSeparatedIntegerField, DateField, DateTimeField
```

**Idiomatic**
```python
from django.db.models import (AutoField, BigIntegerField, BooleanField,
        CharField, CommaSeparatedIntegerField, DateField, DateTimeField)
```

## <a name="modules_and_packages">Modules and Packages</a>

1. Make use of `__init__.py` files to simplify package interfaces

**Harmful**
```python
# If the gizmo directory has an emtpy __init__.py,
# imports like the ones below are necessary, even
# if Gizmo and GizmoHelper are all that clients should ever need to use
from gizmo.client.interface import Gizmo
from gizmo.client.contrib.utils import GizmoHelper
```

**Idiomatic**
```python
# __init__.py:

from gizmo.client.interface import Gizmo
from gizmo.client.contrib.utils import GizmoHelper

#client code:
from gizmo import Gizmo, GizmoHelper
```

2. Use `__main__.py` to run packages as scripts
3. Use `modules` for encapsulation where other languages would use Objects

## <a name="executable_scripts">Executable Scripts</a>

1. Use the `if __name__ == '__main__'` pattern to allow a file to be both imported and run directly

**Harmful**
```python
import sys
import os

FIRST_NUMBER = float(sys.argv[1])
SECOND_NUMBER = float(sys.argv[2])

def divide(a, b):
    return a / b

# I can't import this file (for the super
# useful 'divide' function) without the following
# code being executed.
if SECOND_NUMBER != 0:
    print(divide(FIRST_NUMBER, SECOND_NUMBER))
```

**Idiomatic**
```python
import sys
import os

def divide(a, b):
    return a / b

# Will only run if script is executed directly,
# not when the file is imported as a module
if __name__ == '__main__':
    first_number = float(sys.argv[1])
    second_number = float(sys.argv[2])
    if second_number != 0:
        print(divide(first_number, second_number))
```

2. Make your Python scripts directly executable

    Making the line `#! /usr/bin/env python` the first line, the script can be executed directly.

    You can make a script executable via the command `chmod +x script_name.py`.

3. Use `sys.exit` in your script to return proper error codes

**Harmful**
```python
if __name__ == '__main__':
    import sys

    # What happens if no argument is passed on the
    # command line?
    if len(sys.argv) > 1:
        argument = sys.argv[1]
        result = do_stuff(argument)
        # Again, what if this is False? How would other
        # programs know?
        if result:
            do_stuff_with_result(result)
```

**Idiomatic**
```python
def main():
    import sys
    if len(sys.argv) < 2:
        # Calling sys.exit with a string automatically
        # prints the string to stderr and exits with
        # a value of '1' (error)
        sys.exit('You forgot to pass an argument')
    argument = sys.argv[1]
    result = do_stuff(argument)
    if not result:
        sys.exit(1)
        # We can also exit with just the return code

    do_stuff_with_result(result)

    # Optional, since the return value without this return
    # statment would default to None, which sys.exit treats
    # as 'exit with 0'
    return 0

# The two lines below are the canonical script entry
# point lines. You'll see them often in other Python scripts
if __name__ == '__main__':
    sys.exit(main())
```

4. Use `sys.argv` to reference command line parameters

**Harmful**
```python
import argparse

if __name__ == '__main__':
    parser = argparse.ArgumentParser(usage="my_cat.py <filename>")
    parser.add_argument('filename', help='The name of the file to use')
    parsed = parser.parse_args(sys.argv)
    print(open(parsed['filename']).read())
```

**Idiomatic**
```python
if __name__ == '__main__':
    try:
        print(open(sys.argv[1]).read())
    except IndexError:
        print('You forgot the file name!')
```
