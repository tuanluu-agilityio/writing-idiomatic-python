---
title: "Working with Data"
date: "2019-02-06"
order: 2
---

### Contents
1. [Variables](#variables)
2. [Strings](#strings)
3. [Lists](#lists)
4. [Dictionaries](#dictionaries)
5. [Sets](#sets)
6. [Tuples](#tuples)
7. [Classes](#classes)
8. [Context Managers](#context_managers)
9. [Generators](#generators)


## <a name="variables">Variables</a>

1. Use multiple assignment to condense variables all set to the same value

**Harmful**
```python
x = 'foo'
y = 'foo'
z = 'foo'
```

**Idiomatic**
```python
x = y = z = 'foo'
```

2. Avoid using a temporary variable when performing a swap of two values

**Harmful**
```python
foo = 'Foo'
bar = 'Bar'
temp = foo
foo = bar
bar = temp
```

**Idiomatic**
```python
foo = 'Foo'
bar = 'Bar'
(foo, bar) = (bar, foo)
```

## <a name="strings">Strings</a>

1. Chain `string` functions to make a simple series of transformations more clear

**Harmful**
```python
book_info = ' The Three Musketeers: Alexandre Dumas'
formatted_book_info = book_info.strip()
formatted_book_info = formatted_book_info.upper()
formatted_book_info = formatted_book_info.replace(':', ' by')
```

**Idiomatic**
```python
book_info = ' The Three Musketeers: Alexandre Dumas'
formatted_book_info = book_info.strip().upper().replace(':', ' by')
```

2. Use `''.join` when creating a single `string` for `list` elements

**Harmful**
```python
result_list = ['True', 'False', 'File not found']
result_string = ''
for result in result_list:
    result_string += result
```

**Idiomatic**
```python
result_list = ['True', 'False', 'File not found']
result_string = ''.join(result_list)
```

3. Use `ord` to get the ASCII code of a character and `chr` to get the character from an ASCII code

**Harmful**
```python
hash_value = 0
character_hash = {
        'a': 97,
        'b': 98,
        'c': 99,
        # ...
        'y': 121,
        'z': 122,
        }

for e in some_string:
    hash_value += character_hash[e]

return hash_value
```

**Idiomatic**
```python
hash_value = 0
for e in some_string:
    hash_value += ord(e)
return hash_value
```

4. Prefer the `format` function for formatting strings

**Harmful**
```python
def get_formatted_user_info_worst(user):
    # Tedious to type and prone to conversion errors
    return 'Name: ' + user.name + ', Age: ' + \
            str(user.age) + ', Sex: ' + user.sex

def get_formatted_user_info_slightly_better(user):
    # No visible connection between the format string placeholders
    # and values to use. Also, why do I have to know the type?
    # Don't these types all have __str__ functions?
    return 'Name: %s, Age: %i, Sex: %c' % (
        user.name, user.age, user.sex)
```

**Idiomatic**
```python
def get_formatted_user_info(user):
    # Clear and concise. At a glance I can tell exactly what
    # the output should be. Note: this string could be returned
    # directly, but the string itself is too long to fit on the
    # page.
    output = 'Name: {user.name}, Age: {user.age}, Sex: {user.sex}'.format(user=user)
    return output
```

## <a name="lists">Lists</a>

1. Use a `list comprehension` to create a transformed version of an existing list

**Harmful**
```python
some_other_list = range(10)
some_list = list()
for element in some_other_list:
    if is_prime(element):
        some_list.append(element + 5)
```

**Idiomatic**
```python
some_other_list = range(10)
some_list = [element + 5
            for element in some_other_list
            if is_prime(element)]
```

2. Make use of negative indexes

**Harmful**
```python
def get_suffix(word):
    word_length = len(word)
    return word[word_length - 2:]
```

**Idiomatic**
```python
def get_suffix(word):
    return word[-2:]
```

3. Prefer `list comprehensions` to the built-in `map()` and `filter()` functions.

**Harmful**
```python
the_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

def is_odd(number):
    return number % 2 == 1

odd_numbers = filter(is_odd, the_list)
odd_numbers_times_two = list(map(lambda x: x * 2, odd_numbers))
```

**Idiomatic**
```python
the_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
odd_numbers_times_two = [n * 2 for n in the_list if n % 2 == 1]
```

4. Use the built-in function `sum` to calculate the sum of a list of values

**Harmful**
```python
the_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
the_sum = 0
for element in the_list:
    the_sum += element
```

**Idiomatic**
```python
the_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
the_sum = sum(the_list)
```

5. Use `all` to determine if all elements of an `iterable` are True

**Harmful**
```python
def contains_zero(iterable):
    for e in iterable:
        if e == 0:
            return True
    return False
```

**Idiomatic**
```python
def contains_zero(iterable):
    # 0 is "Falsy," so this works
    return not all(iterable)
```

6. Use the `* operator` to represent the “rest” of a list

**Harmful**
```python
some_list = ['a', 'b', 'c', 'd', 'e']
(first, second, rest) = some_list[0], some_list[1], some_list[2:]
print(rest)
(first, middle, last) = some_list[0], some_list[1:-1], some_list[-1]
print(middle)
(head, penultimate, last) = some_list[:-2], some_list[-2], some_list[-1]
print(head)
```

**Idiomatic**
```python
some_list = ['a', 'b', 'c', 'd', 'e']
(first, second, *rest) = some_list
print(rest)
(first, *middle, last) = some_list
print(middle)
(*head, penultimate, last) = some_list
print(head)
```

## <a name="dictionaries">Dictionaries</a>

1. Use a `dict` as a substitute for a `switch...case` statement

**Harmful**
```python
def apply_operation(left_operand, right_operand, operator):
    if operator == '+':
        return left_operand + right_operand
    elif operator == '-':
        return left_operand - right_operand
    elif operator == '*':
        return left_operand * right_operand
    elif operator == '/':
        return left_operand / right_operand
```

**Idiomatic**
```python
def apply_operation(left_operand, right_operand, operator):
    import operator as op
    operator_mapper = {'+': op.add, '-': op.sub,
            '*': op.mul, '/': op.truediv}

    return operator_mapper[operator](left_operand, right_operand)
```

2. Use the `default` parameter of `dict.get` to provide default values

**Harmfull**
```python
log_severity = None
if 'severity' in configuration:
    log_severity = configuration['severity']
else:
    log_severity = 'Info'
```

**Idiomatic**
```python
log_severity = configuration.get('severity', 'Info')
```

3. Use a `dict comprehension` to build a `dict` clearly and efficiently

**Harmful**
```python
user_email = {}
for user in users_list:
    if user.email:
        user_email[user.name] = user.email
```

**Idiomatic**
```python
user_email = {user.name: user.email
              for user in users_list if user.email}
```

## <a name="sets">Sets</a>

1. Understand and use the mathematical `set` operations

**Harmful**
```python
def get_both_popular_and_active_users():
    # Assume the following two functions each return a
    # list of user names
    most_popular_users = get_list_of_most_popular_users()
    most_active_users = get_list_of_most_active_users()
    popular_and_active_users = []
    for user in most_active_users:
        if user in most_popular_users:
            popular_and_active_users.append(user)

    return popular_and_active_users
```

**Idiomatic**
```python
def get_both_popular_and_active_users():
    # Assume the following two functions each return a
    # list of user names
    return(set(
        get_list_of_most_active_users()) & set(
            get_list_of_most_popular_users()))
```

2. Use a `set comprehension` to generate sets concisely

**Harmful**
```python
users_first_names = set()
for user in users:
    users_first_names.add(user.first_name)
```

**Idiomatic**
```python
users_first_names = {user.first_name for user in users}
```

3. Use sets to determine if two lists share any common values

**Harmful**
```python
list_one = ['Manny', 'Moe', 'Jack']
list_two = ['Larry', 'Moe', 'Curly']

def has_duplicate(list_one, list_two):
    duplicate_name = False
    for name in list_one:
        if name in list_two:
            duplicate_name = True
    return duplicate_name
```

**Idiomatic**
```python
list_one = ['Manny', 'Moe', 'Jack']
list_two = ['Larry', 'Moe', 'Curly']

def has_duplicate(list_one, list_two):
    return set(list_one) & set(list_two)
```

4. Use sets to eliminate duplicate entries from `Iterable` containers

**Harmful**
```python
unique_surnames = []
for surname in employee_surnames:
    if surname not in unique_surnames:
        unique_surnames.append(surname)

def display(elements, output_format='html'):
    if output_format == 'std_out':
        for element in elements:
            print(element)
    elif output_format == 'html':
        as_html = '<ul>'
        for element in elements:
            as_html += '<li>{}</li>'.format(element)
        return as_html + '</ul>'
    else:
        raise RuntimeError('Unknown format {}'.format(output_format))
```

**Idiomatic**
```python
unique_surnames = set(employee_surnames)

def display(elements, output_format='html'):
    if output_format == 'std_out':
        for element in elements:
            print(element)
    elif output_format == 'html':
        as_html = '<ul>'
        for element in elements:
            as_html += '<li>{}</li>'.format(element)
        return as_html + '</ul>'
    else:
        raise RuntimeError('Unknown format {}'.format(output_format))
```

## <a name="tuples">Tuples</a>

1. Use `collections.namedtuple` to make `tuple`-heavy code more clear

**Harmful**
```python
# Assume the 'employees' table has the following columns:
# first_name, last_name, department, manager, salary, hire_date
def print_employee_information(db_connection):
    db_cursor = db_connection.cursor()
    results = db_cursor.execute('select * from employees').fetchall()
    for row in results:
        # It's basically impossible to follow what's getting printed
        print(row[1] + ', ' + row[0] + ' was hired '
        'on ' + row[5] + ' (for $' + row[4] + ' per annum)'
        ' into the ' + row[2] + ' department and reports to ' + row[3])
```

**Idiomatic**
```python
# Assume the 'employees' table has the following columns:
# first_name, last_name, department, manager, salary, hire_date
from collections import namedtuple

EmployeeRow = namedtuple('EmployeeRow', ['first_name',
'last_name', 'department', 'manager', 'salary', 'hire_date'])
EMPLOYEE_INFO_FMT = '{last_name}, {first_name} was hired on \
e_date} (for ${salary} per annum) into the {department} \
rtment and reports to {manager}'

def print_employee_information(db_connection):
    db_cursor = db_connection.cursor()
    results = db_cursor.execute('select * from employees').fetchall()
    for row in results:
        employee = EmployeeRow._make(row)

        # It's now almost impossible to print a field in the wrong place
        print(EMPLOYEE_INFO_FMT.format(**employee._asdict()))
```


2. Use `_` as a placeholder for data in a tuple that should be ignored

**Harmful**
```python
(name, age, temp, temp2) = get_user_info(user)
if age > 21:
    output = '{name} can drink!'.format(name=name)
# "Wait, where are temp and temp2 being used?"
```

**Idiomatic**
```python
(name, age, _, _) = get_user_info(user)
if age > 21:
    output = '{name} can drink!'.format(name=name)
# "Clearly, only name and age are interesting"
```

3. Use `tuples` to unpack data

**Harmful**
```python
list_from_comma_separated_value_file = ['dog', 'Fido', 10]
animal = list_from_comma_separated_value_file[0]
name = list_from_comma_separated_value_file[1]
age = list_from_comma_separated_value_file[2]
output = ('{name} the {animal} is {age} years old'.format(
    animal=animal, name=name, age=age))
```

**Idiomatic**
```python
list_from_comma_separated_value_file = ['dog', 'Fido', 10]
(animal, name, age) = list_from_comma_separated_value_file
output = ('{name} the {animal} is {age} years old'.format(
    animal=animal, name=name, age=age))
```

4. Use a `tuple` to return multiple values from a function

**Harmful**
```python
from collections import Counter

STATS_FORMAT = """Statistics:
Mean: {mean}
Median: {median}
Mode: {mode}"""

def calculate_mean(value_list):
    return float(sum(value_list) / len(value_list))

def calculate_median(value_list):
    return value_list[int(len(value_list) / 2)]

def calculate_mode(value_list):
    return Counter(value_list).most_common(1)[0][0]

values = [10, 20, 20, 30]
mean = calculate_mean(values)
median = calculate_median(values)
mode = calculate_mode(values)

print(STATS_FORMAT.format(mean=mean, median=median,
        mode=mode))
```

**Idiomatic**
```python
from collections import Counter

STATS_FORMAT = """Statistics:
Mean: {mean}
Median: {median}
Mode: {mode}"""

def calculate_staistics(value_list):
    mean = float(sum(value_list) / len(value_list))
    median = value_list[int(len(value_list) / 2)]
    mode = Counter(value_list).most_common(1)[0][0]
    return (mean, median, mode)

(mean, median, mode) = calculate_staistics([10, 20, 20, 30])
print(STATS_FORMAT.format(mean=mean, median=median, mode=mode))
```

## <a name="classes">Classes</a>

1. Always use `self` or a `@classmethod` when referring to a class’s attributes

**Harmful**
```python
class Blog():
    __tablename__ = 'blog'

    def table_name(self):
        return Blog.__tablename__

class DerivedBlog(Blog):
    __tablename__ = 'derived_blog'

b = DerivedBlog()
print(b.table_name()) # prints 'blog'
```

**Idiomatic**
```python
class Blog():
    __tablename__ = 'blog'
    def table_name(self):
        return self.__tablename__
    
    @classmethod
    def other_table_name(cls):
        return cls.__tablename__

class DerivedBlog(Blog):
    __tablename__ = 'derived_blog'

b = DerivedBlog()
print(b.table_name()) # prints 'derived_blog'
```

2. Don’t use classes solely as a form of encapsulation

**Harmful**
```python
class StringUtils():

    def reverse(self, string):
        return reversed(string)

    def count_occurrences(self, string, key):
        return sum([1 for c in string if c == key])

    def is_palindrome(self, string):
        for index in range(len(string)//2):
            if string[index] != string[-index-1]:
                return False
        return True

s = StringUtils()
```

**Idiomatic**
```python
def reverse(string):
    return reversed(string)

def count_occurrences(string, key):
    return sum([1 for c in string if c == key])

def is_palindrome(string):
    for index in range(len(string)//2):
        if string[index] != string[-index-1]:
            return False
    return True
```

3. Use the `isinstance` function to determine the type of an object

**Harmful**
```python
def get_size(some_object):
    """Return the "size" of *some_object*, where size = len(some_object) for
    sequences, size = some_object for integers and floats, and size = 1 for
    True, False, or None."""
    try:
        return len(some_object)
    except TypeError:
        if some_object in (True, False, type(None)):
            return 1
        else:
            return int(some_object)

print(get_size('hello'))
print(get_size([1, 2, 3, 4, 5]))
print(get_size(10.0))
```

**Idiomatic**
```python
def get_size(some_object):
    if isinstance(some_object, (list, dict, str, tuple)):
        return len(some_object)
    elif isinstance(some_object, (bool, type(None))):
        return 1
    elif isinstance(some_object, (int, float)):
        return int(some_object)

print(get_size('hello'))
print(get_size([1, 2, 3, 4, 5]))
print(get_size(10.0))
```

4. Use leading underscores in function and variable names to denote “private” data

**Harmful**
```python
class Foo():

    def __init__(self):
        self.id = 8
        self.value = self.get_value()
    
    def get_value(self):
        pass
    
    def should_destroy_earth(self):
        return self.id == 42

class Baz(Foo):

    def get_value(self, some_new_parameter):
        """Since 'get_value' is called from the base class's
        __init__ method and the base class definition doesn't
        take a parameter, trying to create a Baz instance will
        fail.

        """
        pass

class Qux(Foo):
    """We aren't aware of Foo's internals, and we innocently
    create an instance attribute named 'id' and set it to 42.
    This overwrites Foo's id attribute and we inadvertently
    blow up the earth.
    """

    def __init__(self):
        super(Qux, self).__init__()
        self.id = 42
        # No relation to Foo's id, purely coincidental

q = Qux()
b = Baz() # Raises 'TypeError'
q.should_destroy_earth() # returns True
q.id == 42 # returns True
```

**Idiomatic**
```python
class Foo():

    def __init__(self):
        """Since 'id' is of vital importance to us, we don't
        want a derived class accidentally overwriting it. We'll
        prepend with double underscores to introduce name
        mangling.
        """
        self.__id = 8
        self.value = self.__get_value() # Our 'private copy'

    def get_value(self):
        pass

    def should_destroy_earth(self):
        return self.__id == 42

    # Here, we're storing a 'private copy' of get_value,
    # and assigning it to '__get_value'. Even if a derived
    # class overrides get_value in a way incompatible with
    # ours, we're fine
    __get_value = get_value

class Baz(Foo):
    def get_value(self, some_new_parameter):
        pass

class Qux(Foo):
    def __init__(self):
        """Now when we set 'id' to 42, it's not the same 'id'
        that 'should_destroy_earth' is concerned with. In fact,
        if you inspect a Qux object, you'll find it doesn't
        have an __id attribute. So we can't mistakenly change
        Foo's __id attribute even if we wanted to.

        """
        self.id = 42
        # No relation to Foo's id, purely coincidental
        super(Qux, self).__init__()

q = Qux()
b = Baz() # Works fine now
q.should_destroy_earth() # returns False
q.id == 42 # returns True
with pytest.raises(AttributeError):
    getattr(q, '__id')
```

5. Use `properties` to “future-proof” your class implementation

**Harmful**
```python
class Product():
    def __init__(self, name, price):
        self.name = name
        # We could try to apply the tax rate here, but the object's price
        # may be modified later, which erases the tax
        self.price = price
```

**Idiomatic**
```python
class Product():
    def __init__(self, name, price):
        self.name = name
        self._price = price

    @property
    def price(self):
        # now if we need to change how price is calculated, we can do it
        # here (or in the "setter" and __init__)
        return self._price * TAX_RATE

    @price.setter
    def price(self, value):
        # The "setter" function must have the same name as the property
        self._price = value
```

6. Use `__repr__` for a machine-readable representation of a class

**Harmful**
```python
class Foo():
    def __init__(self, bar=10, baz=12, cache=None):
        self.bar = bar
        self.baz = baz
        self._cache = cache or {}

    def __str__(self):
        return 'Bar is {}, Baz is {}'.format(self.bar, self.baz)

def log_to_console(instance):
    print(instance)

log_to_console([Foo(), Foo(cache={'x': 'y'})])
```


**Idiomatic**
```python
class Foo():
    def __init__(self, bar=10, baz=12, cache=None):
        self.bar = bar
        self.baz = baz
        self._cache = cache or {}

    def __str__(self):
        return '{}, {}'.format(self.bar, self.baz)

    def __repr__(self):
        return 'Foo({}, {}, {})'.format(self.bar, self.baz, self._cache)

def log_to_console(instance):
    print(instance)
    
log_to_console([Foo(), Foo(cache={'x': 'y'})])
```

7. Define `__str__` in a class to show a human-readable representation

**Harmful**
```python
class Point():
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 2)
print(p)

# Prints '<__main__.Point object at 0x91ebd0>'
```

***Idiomatic**
```python
class Point():
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return '{0}, {1}'.format(self.x, self.y)

p = Point(1, 2)
print(p)

# Prints '1, 2'
```

## <a name="context_managers">Context Managers</a>

1. Use a `context manager` to ensure resources are properly managed

**Harmful**
```python
file_handle = open(path_to_file, 'r')
    for line in file_handle.readlines():
        if raise_exception(line):
            print('No! An Exception!')
```

**Idiomatic**
```python
with open(path_to_file, 'r') as file_handle:
    for line in file_handle:
        if raise_exception(line):
            print('No! An Exception!')
```

## <a name="generators">Generators</a>

1. Prefer a `generator expression` to a `list comprehension` for simple iteration

**Harmful**
```python
for uppercase_name in [name.upper() for name in get_all_usernames()]:
    process_normalized_username(uppercase_name)
```

**Idiomatic**
```python
for uppercase_name in (name.upper() for name in get_all_usernames()):
    process_normalized_username(uppercase_name)
```

2. Use a `generator` to lazily load infinite sequences

**Harmful**
```python
def get_twitter_stream_for_keyword(keyword):
    """Get's the 'live stream', but only at the moment
    the function is initially called. To get more entries,
    the client code needs to keep calling
    'get_twitter_livestream_for_user'. Not ideal.
    """

    imaginary_twitter_api = ImaginaryTwitterAPI()
    if imaginary_twitter_api.can_get_stream_data(keyword):
        return imaginary_twitter_api.get_stream(keyword)    

current_stream = get_twitter_stream_for_keyword('#jeffknupp')
for tweet in current_stream:
    process_tweet(tweet)

# Uh, I want to keep showing tweets until the program is quit.
# What do I do now? Just keep calling
# get_twitter_stream_for_keyword? That seems stupid.

def get_list_of_incredibly_complex_calculation_results(data):
    return [first_incredibly_long_calculation(data),
            second_incredibly_long_calculation(data),
            third_incredibly_long_calculation(data),
            ]
```

**Idiomatic**
```python
def get_twitter_stream_for_keyword(keyword):
    """Now, 'get_twitter_stream_for_keyword' is a generator
    and will continue to generate Iterable pieces of data
    one at a time until 'can_get_stream_data(user)' is
    False (which may be never).

    """

    imaginary_twitter_api = ImaginaryTwitterAPI()
    while imaginary_twitter_api.can_get_stream_data(keyword):
        yield imaginary_twitter_api.get_stream(keyword)

# Because it's a generator, I can sit in this loop until
# the client wants to break out
for tweet in get_twitter_stream_for_keyword('#jeffknupp'):
    if got_stop_signal:
        break
    process_tweet(tweet)

def get_list_of_incredibly_complex_calculation_results(data):
    """A simple example to be sure, but now when the client
    code iterates over the call to
    'get_list_of_incredibly_complex_calculation_results',
    we only do as much work as necessary to generate the
    current item.

    """

    yield first_incredibly_long_calculation(data)
    yield second_incredibly_long_calculation(data)
    yield third_incredibly_long_calculation(data)
```
