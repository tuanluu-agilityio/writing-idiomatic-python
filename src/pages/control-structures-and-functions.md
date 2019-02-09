---
title: "Control Structures and Functions"
date: "2019-02-06"
order: 1
---

### Contents

1. [If Statements](#if_statements)
2. [For loops](#for_loops)
3. [Functions](#functions)
4. [Exceptions](#exceptions)

## <a name="if_statements">If Statements</a>

1. Use if statements to return early on error conditions

**Harmful**
```python
def process_login_form(request):
    if request.form.get('username') and request.form.get('password'):
        if captcha_displayed(request) and captcha_passed(request):
            if authenticate_user(request.form['username'], request.form['password']):
                current_user.login()
                return redirect(HOME_PAGE)
            else:
        return 'Unable to authenticate with provided username and password', 403
        else:
            if captcha_displayed(requet):
                return 'Captcha entry failed. Please resubmit', 403
    else:
        return 'Missing username or password. Both are required', 400
```

**Idiomatic**
```python
def process_login_form(request):
    if 'username' not in request.form:
        return 'Please enter a value for username', 400
    if 'password' not in request.form:
        return 'Please enter a value for password', 400
    if captcha_displayed(request) and not captcha_passed(request):
        return 'Captcha entry failed. Please resubmit', 403
    if not authenticate_user(request.form['username'], request.form['password']):
        return 'Unable to authenticate with provided username and password', 403

    current_user.login()
    return redirect(HOME_PAGE)
```

2. Chain comparisons to make if statements more concise

**Harmful**
```python
if x <= y and y <= z:
    return True
```

**Idiomatic**
```python
if x <= y <= z:
    return True
```

3. Avoid placing conditional branch code on the same line as the colon

**Harmful**
```python
name = 'Jeff'
address = 'New York, NY'
if name: print(name)
print(address)
```

**Idiomatic**
```python
name = 'Jeff'
address = 'New York, NY'
if name:
    print(name)
print(address)
```

4. Avoid repeating variable name in compound `if` statement

**Harmful**
```python
is_generic_name = False
name = 'Tom'
if name == 'Tom' or name == 'Dick' or name == 'Harry':
    is_generic_name = True
```

**Idiomatic**
```python
name = 'Tom'
is_generic_name = name in ('Tom', 'Dick', 'Harry')
```

5. Avoid comparing directly to `True`, `False`, or `None`

**Harmful**
```python
def number_of_evil_robots_attacking():
    return 10

def should_raise_shields():
    #"We only raise Shields when one or more giant robots attack,
    # so I can just return that value..."
    return number_of_evil_robots_attacking()

if should_raise_shields() == True:
    raise_shields()
    print('Shields raised')
else :
    print('Safe! No giant robots attacking')
```

**Idiomatic**
```python
def number_of_evil_robots_attacking():
    return 10

def should_raise_shields():
    # "We only raise Shields when one or more giant robots attack,
    # so I can just return that value..."
    return number_of_evil_robots_attacking()

if should_raise_shields():
    raise_shields()
    print('Shields raised')
else:
    print('Safe! No giant robots attacking')
```

6. Use `if` and `else` as a short ternary operator replacement

**Harmful**
```python
foo = True
value = 0
if foo:
    value = 1
print(value)
```

**Idiomatic**  
```python
foo = True
value = 1 if foo else 0
print(value)
```  

## <a name="for_loops">For loops</a>

1. Use the `enumerate` function in loops instead of creating an “index” variable

**Harmful**
```python
my_container = ['Larry', 'Moe', 'Curly']
index = 0
for element in my_container:
    print('{} {}'.format(index, element))
    index += 1
```

**Idiomatic**
```python
my_container = ['Larry', 'Moe', 'Curly']
for index, element in enumerate(my_container):
    print('{} {}'.format(index, element))
```

2. Use the `in` keyword to iterate over an `iterable`

**Harmful**
```python
my_list = ['Larry', 'Moe', 'Curly']
index = 0
while index < len(my_list):
    print(my_list[index])
    index += 1
```

**Idiomatic**
```python
my_list = ['Larry', 'Moe', 'Curly']
for element in my_list:
    print(element)
```

3. Use `else` to execute code after a `for` loop concludes

**Harmful**
```python
for user in get_all_users():
    has_malformed_email_address = False
    print('Checking {}'.format(user))
    for email_address in user.get_all_email_addresses():
        if email_is_malformed(email_address):
            has_malformed_email_address = True
            print('Has a malformed email address!')
            break

    if not has_malformed_email_address:
        print('All email addresses are valid!')
```

**Idiomatic**
```python
for user in get_all_users():
    print('Checking {}'.format(user))
    for email_address in user.get_all_email_addresses():
        if email_is_malformed(email_address):
            print('Has a malformed email address!')
            break

    else: #this else matches the `for` loop, not the if !
        print('All email addresses are valid!')
```

## <a name="functions">Functions</a>

1. Avoid using a mutable object as the `default value` for a function argument

**Harmful**
```python
def f(a, L = []):
    L.append(a)
    return L
    
print(f(1))
print(f(2))
print(f(3))

# This will print
#
#[1]
#[1, 2]
#[1, 2, 3]
```

**Idiomatic**
```python
# If you don 't want the default to be shared between subsequent
# calls, you can write the function like this instead:
def f(a, L = None):
    if L is None:
        L = []
    L.append(a)
    return L
    
print(f(1))
print(f(2))
print(f(3)) 
# This will print
# [1]
# [2]
# [3]
```

2. Use `return` to evaluate expressions in addition to return values

**Harmful**
```python
def all_equal(a, b, c):
    result = False
    if a == b == c:
        result = True
    return result
```

**Idiomatic**
```python
def all_equal(a, b, c):
    return a == b == c
```

3. Learn to use `keyword arguments` properly

**Harmful**
```python
def print_list(list_value, sep):
    print('{}'.format(sep).join(list_value))

the_list = ['a', 'b', 'c']
the_other_list = ['Jeff', 'hates', 'Java']
print_list(the_list, ' ')
print_list(the_other_list, ' ')
print_list(the_other_list, ', ')
```

**Idiomatic**
```python
def print_list(list_value, sep=' '):
    print('{}'.format(sep).join(list_value))

the_list = ['a', 'b', 'c']
the_other_list = ['Jeff', 'hates', 'Java']
print_list(the_list)
print_list(the_other_list)
print_list(the_other_list, ', ')
```

4. Use `*args` and `**kwargs` to accept arbitrary arguments

**Harmful**
```python
def wrap_add_for_console_output(x, y):
    print('--------------------------------')
    print(str(x + y))
    print('--------------------------------')

wrap_add_for_console_output(2,3)
```

**Idiomatic**
```python
def for_console_output(func):
    def wrapper(*args, **kwargs):
        print('--------------------------------')
        print(str(func(*args, **kwargs)))
        print('--------------------------------')
    return wrapper

@for_console_output
def add(x, y):
    return x + y

add(3, 2)
```

5. Learn to treat functions as values

**Harmful**
```python
def print_addition_table():
    for x in range(1, 3):
        for y in range(1, 3):
            print(str(x + y) + '\n')

def print_subtraction_table():
    for x in range(1, 3):
        for y in range(1, 3):
            print(str(x - y) + '\n')

def print_multiplication_table():
    for x in range(1, 3):
        for y in range(1, 3):
            print(str(x * y) + '\n')

def print_division_table():
    for x in range(1, 3):
        for y in range(1, 3):
            print(str(x / y) + '\n')

print_addition_table()
print_subtraction_table()
print_multiplication_table()
print_division_table()
```

**Idiomatic**
```python
import operator as op

def print_table(operator):
    for x in range(1, 3):
        for y in range(1, 3):
            print(str(operator(x, y)) + '\n')

for operator in (op.add, op.sub, op.mul, op.itruediv):
    print_table(operator)
```

## <a name="exceptions">Exceptions</a>

1. Don’t be afraid to use Exceptions
2. Use Exceptions to write code in an `EAFP` style

**Harmful**
```python
def get_log_level(config_dict):
    if 'ENABLE_LOGGING' in config_dict:
        if config_dict['ENABLE_LOGGING'] != True:
            return None
        elif not 'DEFAULT_LOG_LEVEL' in config_dict:
            return None
        else:
            return config_dict['DEFAULT_LOG_LEVEL']
    else:
        return None
```

**Idiomatic**
```python
def get_log_level(config_dict):
    try:
        if config_dict['ENABLE_LOGGING']:
            return config_dict['DEFAULT_LOG_LEVEL']

    except KeyError:
        # if either value wasn't present, a
        # KeyError will be raised, so
        # return None
        return None
```

3. Avoid `swallowing` useful exceptions with bare except clauses

**Harmful**
```python
import requests

def get_json_response(url):
    try:
        r = requests.get(url)
        return r.json()
    except:
        print('Oops, something went wrong!')
        return None
```

**Idiomatic**
```python
import requests
def get_json_response(url):
    return requests.get(url).json()

# If we need to make note of the exception, we
# would write the function this way...
def alternate_get_json_response(url):
    try:
        r = requests.get(url)
        return r.json()
    except:
        # do some logging here, but don't handle the exception
        # ...
        raise
```

4. Prefer raising a user-defined `Exception` to core Python `Exceptions`

**Harmful**
```python
import requests
def fetch_url_contents(url):
    response = requests.get(url)
    print(response.status_code)
    if response.status_code != 200:
        raise RuntimeError('Unable to fetch contents. Received status code {}'.format(response.status_code))

    return response.content
```

**Idiomatic**
```python
import requests

class URLFetchError(Exception):
    pass

def fetch_url_contents(url):
    response = requests.get(url)
    if response.status_code != 200:
        raise URLFetchError('Unable to fetch contents. Received status code {}'.format(response.status_code))

    return response.content
```
