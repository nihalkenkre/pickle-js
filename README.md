# Pickle-JS

Node implementation to unpickle a pickled Python object into a actionable JSON string.

All opcodes are not currently implemented.

The Python functionality `__reduce__` is used to create an object during unpickling. Since the availabilty of the classes is not a guarantee on the JS side a dict is returned which has the keys `callable` and `reduce_args`. Similarly a `BUILD` opcode is used to 'build' a python object during unpickling. Since the availabilty of the classes is not a guarantee on the JS side a dict is returned which has the keys `callable` and `build_args`. These cases need to be investigated further.

## Usage
`example.js`
```
const processPickle = require('pickle');

...
const jsonString = processPickle('/path/to/pkl/file');
...
```