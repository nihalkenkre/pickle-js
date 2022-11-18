const fs = require('fs');

var memo = []
var stack = []

opCodes = {
    // Integers
    INT: 0x49,
    BININT: 0x4a,
    BININT1: 0x4b,
    BININT2: 0x4d,
    LONG: 0x4c,
    LONG1: 0x8a,
    LONG4: 0x8b,

    // Strings
    STRING: 0x53,
    BINSTRING: 0x54,
    SHORT_BINSTRING: 0x55,

    // Bytes
    BINBYTES: 0x42,
    SHORT_BINBYTES: 0x43,
    BINBYTES8: 0x8e,

    // Byte Array
    BYTEARRAY8: 0x96,

    // Out of band buffer
    NEXT_BUFFER: 0x97,
    READONLY_BUFFER: 0x98,

    // None
    NONE: 0x4e,

    // Booleans
    NEWTRUE: 0x88,
    NEWFALSE: 0x89,

    // Unicode strings
    UNICODE: 0x56,
    SHORT_BINUNICODE: 0x8c,
    BINUNICODE: 0x58,
    BINUNICODE8: 0x8d,

    // Floats
    FLOAT: 0x46,
    BINFLOAT: 0x47,

    // Lists
    EMPTY_LIST: 0x5d,
    APPEND: 0x61,
    APPENDS: 0x65,
    LIST: 0x6c,

    // Tuples
    EMPTY_TUPLE: 0x29,
    TUPLE: 0x74,
    TUPLE1: 0x85,
    TUPLE2: 0x86,
    TUPLE3: 0x87,

    // Dicts
    EMPTY_DICT: 0x7d,
    DICT: 0x64,
    SETITEM: 0x73,
    SETITEMS: 0x75,

    // Sets
    EMPTY_SET: 0x8f,
    ADDITEMS: 0x90,

    // Frozen Sets
    FROZENSET: 0x91,

    // Stack manipulation
    POP: 0x30,
    DUP: 0x32,
    MARK: 0x28,
    POP_MARK: 0x31,

    // Memo manipulation
    GET: 0x67,
    BINGET: 0x68,
    LONG_BINGET: 0x6A,
    PUT: 0x70,
    BINPUT: 0x71,
    LONG_BINPUT: 0x72,
    MEMOIZE: 0x94,

    // Extension registry. Like the GET family.
    EXT1: 0x82,
    EXT2: 0x83,
    EXT4: 0x84,

    // Push a Class Object, Module function on the stack, via its module and name.
    GLOBAL: 0x63,
    STACK_GLOBAL: 0x93,

    // Objects pickle does not know about directly.
    REDUCE: 0x52,
    BUILD: 0x62,
    INST: 0x69,
    OBJ: 0x6f,
    NEWOBJ: 0x81,
    NEWOBJ_EX: 0x92,

    // Machine Control
    PROTO: 0x80,
    STOP: 0x2e,
    FRAME: 0x95,

    // Persistent IDs
    PERSID: 0x50,
    BINPERSID: 0x51
};

function findMark(stackString) {
    return stackString == 'mark';
}

function processOpcode(opCode, data) {
    switch (opCode) {

        // Integers
        case opCodes.INT:
            console.log('\n===== opcode INT Not yet implemented =====\n');
            break;

        case opCodes.BININT:
            const intBuffer = Buffer.alloc(4);

            intBuffer[0] = data.next().value;
            intBuffer[1] = data.next().value;
            intBuffer[2] = data.next().value;
            intBuffer[3] = data.next().value;

            stack.push(intBuffer.readInt32LE());

            break;

        case opCodes.BININT1:
            stack.push(data.next().value);
            break;

        case opCodes.BININT2:
            {
                const dataBuffer = Buffer.alloc(2);
                dataBuffer[0] = data.next().value;
                dataBuffer[1] = data.next().value;
                stack.push(dataBuffer.readUint16LE());
            }
            break;

        case opCodes.LONG:
            console.log('\n===== opcode LONG Not yet implemented =====\n');
            break;

        case opCodes.LONG1:
            console.log('\n===== opcode LONG1 Not yet implemented =====\n');
            break;

        case opCodes.LONG4:
            console.log('\n===== opcode LONG4 Not yet implemented =====\n');
            break;


        // Strings

        case opCodes.STRING:
            console.log('\n===== opcode STRING Not yet implemented =====\n');
            break;

        case opCodes.BINSTRING:
            console.log('\n===== opcode BINSTRING Not yet implemented =====\n');
            break;

        case opCodes.SHORT_BINSTRING:
            console.log('\n===== opcode SHORT_BINSTRING Not yet implemented =====\n');
            break;


        // Bytes

        case opCodes.BINBYTES:
            console.log('\n===== opcode BINBYTES Not yet implemented =====\n');
            break;

        case opCodes.SHORT_BINBYTES:
            console.log('\n===== opcode SHORT_BINBYTES Not yet implemented =====\n');
            break;

        case opCodes.BINBYTES8:
            console.log('\n===== opcode BINBYTES8 Not yet implemented =====\n');
            break;


        // Byte Array

        case opCodes.BYTEARRAY8:
            {
                const numBytesBuffer = Buffer.alloc(8);

                numBytesBuffer[0] = data.next().value;
                numBytesBuffer[1] = data.next().value;
                numBytesBuffer[2] = data.next().value;
                numBytesBuffer[3] = data.next().value;
                numBytesBuffer[4] = data.next().value;
                numBytesBuffer[5] = data.next().value;
                numBytesBuffer[6] = data.next().value;
                numBytesBuffer[7] = data.next().value;

                const numContentBytes = Number(numBytesBuffer.readBigUInt64LE());

                const contentBuffer = Buffer.alloc(numContentBytes);

                for (var i = 0; i < numContentBytes; ++i) {
                    contentBuffer[i] = data.next().value;
                }

                stack.push(contentBuffer);
            }

            break;


        // Out of band buffer

        case opCodes.NEXT_BUFFER:
            console.log('\n===== opcode NEXT_BUFFER Not yet implemented =====\n');
            break;

        case opCodes.READONLY_BUFFER:
            console.log('\n===== opcode READONLY_BUFFER Not yet implemented =====\n');
            break;


        // None

        case opCodes.NONE:
            stack.push(null);
            break;


        // Booleans

        case opCodes.NEWTRUE:
            stack.push(true);
            break;

        case opCodes.NEWFALSE:
            stack.push(false);
            break;


        // Unicode strings

        case opCodes.UNICODE:
            console.log('\n===== opcode UNICODE Not yet implemented =====\n');
            break;

        case opCodes.SHORT_BINUNICODE:
            {
                const byteCount = data.next().value;
                const byteBuffer = Buffer.allocUnsafe(byteCount);

                for (var i = 0; i < byteCount; ++i) {
                    byteBuffer.writeUint8(data.next().value, i);
                }

                stack.push(byteBuffer.toString());
            }
            break;

        case opCodes.BINUNICODE:
            console.log('\n===== opcode BINUNICODE Not yet implemented =====\n');
            break;

        case opCodes.BINUNICODE8:
            console.log('\n===== opcode BINUNICODE8 Not yet implemented =====\n');
            break;


        // Floats

        case opCodes.FLOAT:
            console.log('\n===== opcode FLOAT Not yet implemented =====\n');
            break;

        case opCodes.BINFLOAT:
            {
                const dataBuffer = Buffer.alloc(8);
                dataBuffer[0] = data.next().value;
                dataBuffer[1] = data.next().value;
                dataBuffer[2] = data.next().value;
                dataBuffer[3] = data.next().value;
                dataBuffer[4] = data.next().value;
                dataBuffer[5] = data.next().value;
                dataBuffer[6] = data.next().value;
                dataBuffer[7] = data.next().value;

                stack.push(dataBuffer.readDoubleBE());
            }

            break;


        // Lists

        case opCodes.EMPTY_LIST:
            stack.push([]);
            break;

        case opCodes.APPEND:
            {
                const list = stack[stack.length - 2];
                list.push(stack.pop());
            }
            break;

        case opCodes.APPENDS:
            {
                const markIndex = stack.findLastIndex(findMark);
                var list = stack[markIndex - 1];

                for (var i = markIndex + 1; i < stack.length; ++i) {
                    list.push(stack[i]);
                }

                stack.splice(markIndex, stack.length - markIndex);
            }
            break;

        case opCodes.LIST:
            console.log('\n===== opcode LIST Not yet implemented =====\n');
            break;


        // Tuples

        case opCodes.EMPTY_TUPLE:
            stack.push([]);
            break;

        case opCodes.TUPLE:
            {
                const markIndex = stack.findLastIndex(findMark);
                const list = [];

                for (var i = markIndex + 1; i < stack.length; ++i) {
                    list.push(stack[i]);
                }

                stack.splice(markIndex, stack.length - markIndex);
                stack.push(list);
            }
            break;

        case opCodes.TUPLE1:
            stack.push([stack.pop()]);
            break;

        case opCodes.TUPLE2:
            {
                const t1 = stack.pop();
                const t2 = stack.pop();

                stack.push([t2, t1]);
            }
            break;

        case opCodes.TUPLE3:
            {
                const t1 = stack.pop();
                const t2 = stack.pop();
                const t3 = stack.pop();

                stack.push([t3, t2, t1])
            }
            break;


        // Dicts 

        case opCodes.EMPTY_DICT:
            stack.push({});
            break;

        case opCodes.DICT:
            console.log('\n===== opcode DICT Not yet implemented =====\n');
            break;

        case opCodes.SETITEM:
            console.log('\n===== opcode SETITEM Not yet implemented =====\n');
            break;

        case opCodes.SETITEMS:
            {
                const markIndex = stack.findLastIndex(findMark);
                var dict = stack[markIndex - 1];

                for (var i = markIndex + 1; i < stack.length - 1; i += 2) {
                    dict[stack[i]] = stack[i + 1];
                }

                stack.splice(markIndex, stack.length - markIndex);
            }

            break;


        // Sets

        case opCodes.EMPTY_SET:
            console.log('\n===== opcode EMPTY_SET Not yet implemented =====\n');
            break;

        case opCodes.ADDITEMS:
            console.log('\n===== opcode ADDITEMS Not yet implemented =====\n');
            break;


        // Frozen Sets    

        case opCodes.FROZENSET:
            console.log('\n===== opcode FROZENSET Not yet implemented =====\n');
            break;


        // Stack manipulation

        case opCodes.POP:
            console.log('\n===== opcode POP Not yet implemented =====\n');
            break;

        case opCodes.DUP:
            console.log('\n===== opcode DUP Not yet implemented =====\n');
            break;

        case opCodes.MARK:
            stack.push('mark');
            break;

        case opCodes.POP_MARK:
            console.log('\n===== opcode POP_MARK Not yet implemented =====\n');
            break;


        // Memo manipulation

        case opCodes.GET:
            console.log('\n===== opcode GET Not yet implemented =====\n');
            break;

        case opCodes.BINGET:
            {
                const memoIndex = data.next().value;
                stack.push(memo[memoIndex]);
            }
            break;

        case opCodes.LONG_BINGET:
            console.log('\n===== opcode LONG_BINGET Not yet implemented =====\n');
            break;

        case opCodes.PUT:
            console.log('\n===== opcode PUT Not yet implemented =====\n');
            break;

        case opCodes.BINPUT:
            console.log('\n===== opcode BINPUT Not yet implemented =====\n');
            break;

        case opCodes.LONG_BINPUT:
            console.log('\n===== opcode LONG_BINPUT Not yet implemented =====\n');
            break;

        case opCodes.MEMOIZE:
            memo[memo.length] = stack[stack.length - 1];
            break;


        // Extension registry. Like the GET family.

        case opCodes.EXT1:
            console.log('\n===== opcode EXT1 Not yet implemented =====\n');
            break;

        case opCodes.EXT2:
            console.log('\n===== opcode EXT2 Not yet implemented =====\n');
            break;

        case opCodes.EXT4:
            console.log('\n===== opcode EXT4 Not yet implemented =====\n');
            break;


        // Push a Class Object, Module function on the stack, via its module and name.

        case opCodes.GLOBAL:
            console.log('\n===== opcode GLOBAL Not yet implemented =====\n');
            break;

        case opCodes.STACK_GLOBAL:
            {
                const cls = stack.pop();
                const mod = stack.pop();

                const obj = { 'module': mod, 'class': cls }

                stack.push(obj);
            }
            break;


        // Objects pickle does not know about directly.

        case opCodes.REDUCE:
            const args = stack.pop();
            const callable = stack.pop();

            stack.push({ 'callable': callable, 'reduce_args': args });

            break;

        case opCodes.BUILD:
            stack[stack.length - 2]['build_args'] = stack[stack.length - 1];
            stack.pop();
            break;

        case opCodes.INST:
            console.log('\n===== opcode INST Not yet implemented =====\n');
            break;

        case opCodes.OBJ:
            console.log('\n===== opcode OBJ Not yet implemented =====\n');
            break;

        case opCodes.NEWOBJ:
            stack[0]['attrs'] = stack.pop();
            break;

        case opCodes.NEWOBJ_EX:
            console.log('\n===== opcode NEWOBJ_EX Not yet implemented =====\n');
            break;


        // Machine Control
        case opCodes.PROTO:
            console.log('\n===== opcode PROTO Not yet implemented =====\n');
            break;

        case opCodes.STOP:
            console.log('\n===== opcode STOP Not yet implemented =====\n');
            break;

        case opCodes.FRAME:
            console.log('\n===== opcode FRAME Not yet implemented =====\n');
            break;

        // Persistent IDs
        case opCodes.PERSID:
            console.log('\n===== opcode PERSID Not yet implemented =====\n');
            break;

        case opCodes.BINPERSID:
            console.log('\n===== opcode BINPERSID Not yet implemented =====\n');
            break;

        default:
            break;
    }
}

function processData(data) {
    var next = data.next()

    while (!next.done) {
        processOpcode(next.value, data);
        next = data.next();
    }

    return JSON.stringify(stack.pop());
}

function processPickle(pklFilename) {
    const fd = fs.openSync(pklFilename, 'r');

    const headerBuffer = Buffer.allocUnsafe(11);
    fs.readSync(fd, headerBuffer, 0, 11, null);

    const frameBuffer = Buffer.alloc(8);
    frameBuffer[0] = headerBuffer[3];
    frameBuffer[1] = headerBuffer[4];
    frameBuffer[2] = headerBuffer[5];
    frameBuffer[3] = headerBuffer[6];
    frameBuffer[4] = headerBuffer[7];
    frameBuffer[5] = headerBuffer[8];
    frameBuffer[6] = headerBuffer[9];
    frameBuffer[7] = headerBuffer[10];

    const dataBuffer = Buffer.allocUnsafe(Number(frameBuffer.readBigUInt64LE()));
    if (fs.readSync(fd, dataBuffer, 0, dataBuffer.length, null) != dataBuffer.length) {
        throw "File could not be read correctly";
    }

    fs.closeSync(fd);

    return processData(dataBuffer.values());
}

module.exports = processPickle;