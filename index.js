'use strict';

/**
 * Library to format different data / object types into a buffer
 * (that can be sent later to a MQTT client through the broker)
 * 
 * Because it is based on Buffer, and it size if fixed after creation,
 * we will store each data as an array of buffers and we will create
 * the final one at the end
 */
class HubDataFormatter {

    /**
     * Creates a formatter
     */
    constructor() {
        this.bfs = [];
    }

    /**
     * Writes a string inside the buffer
     * @param {String} s the string to insert
     */
    putString(s) {
        this.bfs.push(Buffer.from(s)); // <-- do not use new String()!
    }

    /**
     * Writes a 4-bytes float inside the buffer
     * @param {Float} f the float to write (Little Endian)
     */
    putFloat(f) {
        var b = Buffer.alloc(4); // Float is 4 bytes
        b.writeFloatLE(f, 0);
        this.bfs.push(b);
    }

    /**
     * Writes a 2-bytes signed integer inside the buffer
     * @param {any} i the integer to write (Little Endian)
     */
    putInteger(i) {
        var b = Buffer.alloc(2); // Int16 is 2 bytes
        b.writeInt16LE(i, 0);
        this.bfs.push(b);
    }

    /**
     * Writes a byte inside the buffer
     * @param {any} by the byte to write, if more than 0xFF, extra upper bytes will be removed
     */
    putByte(by) {
        var b = Buffer.alloc(1); // Just one byte my friend
        b[0] = by;
        this.bfs.push(b);
    }

    /**
     * Creates the buffer from all of the data sets previously added
     * @returns the buffer you are waiting for
     */
    finalise() {

        // Calc the size
        var size = 0;
        this.bfs.forEach(function (b) {
            size += b.length;
        }, this);

        // Create and fill
        var bf = Buffer.alloc(size);
        var i = 0;
        this.bfs.forEach(function (b) {
            b.copy(bf, i, 0);
            i += b.length;
        }, this);

        return bf;
    }
}
module.exports = HubDataFormatter