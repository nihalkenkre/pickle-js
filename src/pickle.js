const fs = require('fs');

class Pickle {
    constructor(pklFilename) {
        this.pklFilename = pklFilename;

        this.memo = [];
        this.stack = [];

        this.opCodes = {
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
        }

        this.object;
        this.processPickle();
    }

    findMark(stackString) {
        return stackString == 'mark';
    }

    processOpcode(opCode, fd) {

        switch (opCode) {

            // Integers
            case this.opCodes.INT:
                console.log('\n===== opcode INT Not yet implemented =====\n');
                break;

            case this.opCodes.BININT:
                const intBuffer = Buffer.alloc(4);

                fs.readSync(fd, intBuffer, 0, intBuffer.length);

                this.stack.push(intBuffer.readInt32LE());

                break;

            case this.opCodes.BININT1:
                {
                    const intBuffer = Buffer.allocUnsafe(1);
                    fs.readSync(fd, intBuffer, 0, intBuffer.length);

                    this.stack.push(intBuffer.readInt8());
                }
                break;

            case this.opCodes.BININT2:
                {
                    const dataBuffer = Buffer.alloc(2);
                    fs.readSync(fd, dataBuffer, 0, dataBuffer.length);

                    this.stack.push(dataBuffer.readUint16LE());
                }
                break;

            case this.opCodes.LONG:
                console.log('\n===== opcode LONG Not yet implemented =====\n');
                break;

            case this.opCodes.LONG1:
                {
                    const longBuffer = Buffer.allocUnsafe(1);
                    fs.readSync(fd, longBuffer, 0, longBuffer.length);

                    this.stack.push(longBuffer.readInt8());
                }
                break;

            case this.opCodes.LONG4:
                console.log('\n===== opcode LONG4 Not yet implemented =====\n');
                break;


            // Strings

            case this.opCodes.STRING:
                console.log('\n===== opcode STRING Not yet implemented =====\n');
                break;

            case this.opCodes.BINSTRING:
                console.log('\n===== opcode BINSTRING Not yet implemented =====\n');
                break;

            case this.opCodes.SHORT_BINSTRING:
                console.log('\n===== opcode SHORT_BINSTRING Not yet implemented =====\n');
                break;


            // Bytes

            case this.opCodes.BINBYTES:
                console.log('\n===== opcode BINBYTES Not yet implemented =====\n');
                break;

            case this.opCodes.SHORT_BINBYTES:
                console.log('\n===== opcode SHORT_BINBYTES Not yet implemented =====\n');
                break;

            case this.opCodes.BINBYTES8:
                console.log('\n===== opcode BINBYTES8 Not yet implemented =====\n');
                break;


            // Byte Array

            case this.opCodes.BYTEARRAY8:
                {
                    const numBytesBuffer = Buffer.alloc(8);
                    fs.readSync(fd, numBytesBuffer, 0, numBytesBuffer.length);

                    const numContentBytes = Number(numBytesBuffer.readBigUInt64LE());

                    const contentBuffer = Buffer.alloc(numContentBytes);

                    fs.readSync(fd, contentBuffer, 0, contentBuffer.length);

                    this.stack.push(contentBuffer);
                }

                break;


            // Out of band buffer

            case this.opCodes.NEXT_BUFFER:
                console.log('\n===== opcode NEXT_BUFFER Not yet implemented =====\n');
                break;

            case this.opCodes.READONLY_BUFFER:
                console.log('\n===== opcode READONLY_BUFFER Not yet implemented =====\n');
                break;


            // None

            case this.opCodes.NONE:
                this.stack.push(null);
                break;


            // Booleans

            case this.opCodes.NEWTRUE:
                this.stack.push(true);
                break;

            case this.opCodes.NEWFALSE:
                this.stack.push(false);
                break;


            // Unicode strings

            case this.opCodes.UNICODE:
                console.log('\n===== opcode UNICODE Not yet implemented =====\n');
                break;

            case this.opCodes.SHORT_BINUNICODE:
                {
                    const byteCountBuffer = Buffer.allocUnsafe(1);
                    fs.readSync(fd, byteCountBuffer, 0, byteCountBuffer.length);

                    const byteBuffer = Buffer.allocUnsafe(byteCountBuffer.readUint8());

                    fs.readSync(fd, byteBuffer, 0, byteBuffer.length);
                    this.stack.push(byteBuffer.toString());
                }
                break;

            case this.opCodes.BINUNICODE:
                console.log('\n===== opcode BINUNICODE Not yet implemented =====\n');
                break;

            case this.opCodes.BINUNICODE8:
                console.log('\n===== opcode BINUNICODE8 Not yet implemented =====\n');
                break;


            // Floats

            case this.opCodes.FLOAT:
                console.log('\n===== opcode FLOAT Not yet implemented =====\n');
                break;

            case this.opCodes.BINFLOAT:
                {
                    const dataBuffer = Buffer.alloc(8);

                    fs.readSync(fd, dataBuffer, 0, dataBuffer.length);

                    this.stack.push(dataBuffer.readDoubleBE());
                }

                break;


            // Lists

            case this.opCodes.EMPTY_LIST:
                this.stack.push([]);
                break;

            case this.opCodes.APPEND:
                {
                    const list = this.stack[this.stack.length - 2];
                    list.push(this.stack.pop());
                }
                break;

            case this.opCodes.APPENDS:
                {
                    const markIndex = this.stack.findLastIndex(this.findMark);
                    var list = this.stack[markIndex - 1];

                    for (var i = markIndex + 1; i < this.stack.length; ++i) {
                        list.push(this.stack[i]);
                    }

                    this.stack.splice(markIndex, this.stack.length - markIndex);
                }
                break;

            case this.opCodes.LIST:
                console.log('\n===== opcode LIST Not yet implemented =====\n');
                break;


            // Tuples

            case this.opCodes.EMPTY_TUPLE:
                this.stack.push([]);
                break;

            case this.opCodes.TUPLE:
                {
                    const markIndex = this.stack.findLastIndex(this.findMark);
                    const list = [];

                    for (var i = markIndex + 1; i < this.stack.length; ++i) {
                        list.push(this.stack[i]);
                    }

                    this.stack.splice(markIndex, this.stack.length - markIndex);
                    this.stack.push(list);
                }
                break;

            case this.opCodes.TUPLE1:
                this.stack.push([this.stack.pop()]);
                break;

            case this.opCodes.TUPLE2:
                {
                    const t1 = this.stack.pop();
                    const t2 = this.stack.pop();

                    this.stack.push([t2, t1]);
                }
                break;

            case this.opCodes.TUPLE3:
                {
                    const t1 = this.stack.pop();
                    const t2 = this.stack.pop();
                    const t3 = this.stack.pop();

                    this.stack.push([t3, t2, t1])
                }
                break;


            // Dicts 

            case this.opCodes.EMPTY_DICT:
                this.stack.push({});
                break;

            case this.opCodes.DICT:
                console.log('\n===== opcode DICT Not yet implemented =====\n');
                break;

            case this.opCodes.SETITEM:
                console.log('\n===== opcode SETITEM Not yet implemented =====\n');
                break;

            case this.opCodes.SETITEMS:
                {
                    const markIndex = this.stack.findLastIndex(this.findMark);
                    var dict = this.stack[markIndex - 1];

                    for (var i = markIndex + 1; i < this.stack.length - 1; i += 2) {
                        dict[this.stack[i]] = this.stack[i + 1];
                    }

                    this.stack.splice(markIndex, this.stack.length - markIndex);
                }

                break;


            // Sets

            case this.opCodes.EMPTY_SET:
                this.stack.push([]);

                break;

            case this.opCodes.ADDITEMS:
                console.log('\n===== opcode ADDITEMS Not yet implemented =====\n');
                break;


            // Frozen Sets    

            case this.opCodes.FROZENSET:
                console.log('\n===== opcode FROZENSET Not yet implemented =====\n');
                break;


            // Stack manipulation

            case this.opCodes.POP:
                console.log('\n===== opcode POP Not yet implemented =====\n');
                break;

            case this.opCodes.DUP:
                console.log('\n===== opcode DUP Not yet implemented =====\n');
                break;

            case this.opCodes.MARK:
                this.stack.push('mark');
                break;

            case this.opCodes.POP_MARK:
                console.log('\n===== opcode POP_MARK Not yet implemented =====\n');
                break;


            // memo manipulation

            case this.opCodes.GET:
                console.log('\n===== opcode GET Not yet implemented =====\n');
                break;

            case this.opCodes.BINGET:
                {
                    const memoIndexBuffer = Buffer.allocUnsafe(1);
                    fs.readSync(fd, memoIndexBuffer, 0, memoIndexBuffer.length);
                    this.stack.push(this.memo[memoIndexBuffer.readUint8()]);
                }
                break;

            case this.opCodes.LONG_BINGET:
                console.log('\n===== opcode LONG_BINGET Not yet implemented =====\n');
                break;

            case this.opCodes.PUT:
                console.log('\n===== opcode PUT Not yet implemented =====\n');
                break;

            case this.opCodes.BINPUT:
                console.log('\n===== opcode BINPUT Not yet implemented =====\n');
                break;

            case this.opCodes.LONG_BINPUT:
                console.log('\n===== opcode LONG_BINPUT Not yet implemented =====\n');
                break;

            case this.opCodes.MEMOIZE:
                this.memo[this.memo.length] = this.stack[this.stack.length - 1];
                break;


            // Extension registry. Like the GET family.

            case this.opCodes.EXT1:
                console.log('\n===== opcode EXT1 Not yet implemented =====\n');
                break;

            case this.opCodes.EXT2:
                console.log('\n===== opcode EXT2 Not yet implemented =====\n');
                break;

            case this.opCodes.EXT4:
                console.log('\n===== opcode EXT4 Not yet implemented =====\n');
                break;


            // Push a Class Object, Module function on the this.stack, via its module and name.

            case this.opCodes.GLOBAL:
                console.log('\n===== opcode GLOBAL Not yet implemented =====\n');
                break;

            case this.opCodes.STACK_GLOBAL:
                {
                    const cls = this.stack.pop();
                    const mod = this.stack.pop();

                    const obj = { 'module': mod, 'class': cls }

                    this.stack.push(obj);
                }
                break;


            // Objects pickle does not know about directly.

            case this.opCodes.REDUCE:
                const args = this.stack.pop();
                const callable = this.stack.pop();

                this.stack.push({ 'callable': callable, 'reduce_args': args });

                break;

            case this.opCodes.BUILD:
                this.stack[this.stack.length - 2]['build_args'] = this.stack[this.stack.length - 1];
                this.stack.pop();
                break;

            case this.opCodes.INST:
                console.log('\n===== opcode INST Not yet implemented =====\n');
                break;

            case this.opCodes.OBJ:
                console.log('\n===== opcode OBJ Not yet implemented =====\n');
                break;

            case this.opCodes.NEWOBJ:
                this.stack[0]['attrs'] = this.stack.pop();
                break;

            case this.opCodes.NEWOBJ_EX:
                console.log('\n===== opcode NEWOBJ_EX Not yet implemented =====\n');
                break;


            // Machine Control
            case this.opCodes.PROTO:
                console.log('\n===== opcode PROTO Not yet implemented =====\n');
                break;

            case this.opCodes.STOP:
                this.object = this.stack.pop();
                break;

            case this.opCodes.FRAME:
                console.log('\n===== opcode FRAME Not yet implemented =====\n');
                break;

            // Persistent IDs
            case this.opCodes.PERSID:
                console.log('\n===== opcode PERSID Not yet implemented =====\n');
                break;

            case this.opCodes.BINPERSID:
                console.log('\n===== opcode BINPERSID Not yet implemented =====\n');
                break;

            default:
                break;
        }
    }

    processData(fd) {
        const opCodeBuffer = Buffer.allocUnsafe(1);
        var bytesRead = fs.readSync(fd, opCodeBuffer);

        while (bytesRead > 0) {
            this.processOpcode(opCodeBuffer.readUint8(), fd);
            bytesRead = fs.readSync(fd, opCodeBuffer);
        }
    }

    processPickle() {
        const fd = fs.openSync(this.pklFilename, 'r');

        const headerBuffer = Buffer.allocUnsafe(11);
        fs.readSync(fd, headerBuffer, 0, 11, null);

        this.processData(fd);

        fs.closeSync(fd);
    }
}

module.exports = Pickle;