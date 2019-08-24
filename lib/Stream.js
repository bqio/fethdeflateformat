module.exports = class Stream {
    constructor (buffer) {
        this.buffer = buffer;
        this.offset = 0;
    }

    readByte () {
        return this.buffer.readInt8(this.offset++);
    }

    readUByte () {
        return this.buffer.readUInt8(this.offset++);
    }

    seek (val) {
        while (this.offset % val != 0)
            this.offset++;
    }

    read16 () {
        return (this.readByte() | this.readByte() << 8);
    }

    readU16 () {
        return (this.readUByte() | this.readUByte() << 8);
    }

    read24 () {
        return (this.readByte() | this.readByte() << 8 | this.readByte() << 16);
    }

    readU24 () {
        return (this.readUByte() | this.readUByte() << 8 | this.readUByte() << 16);
    }

    read32 () {
        return (this.readByte() | this.readByte() << 8 | this.readByte() << 16 | this.readByte() << 24);
    }

    readU32 () {
        return (this.readUByte() | this.readUByte() << 8 | this.readUByte() << 16 | this.readUByte() << 24);
    }

    read64 () {
        let lo = (this.readByte() | this.readByte() << 8 | this.readByte() << 16 | this.readByte() << 24);
        let hi = (this.readByte() | this.readByte() << 8 | this.readByte() << 16 | this.readByte() << 24);
        return hi << 32 | lo;
    }

    readU64 () {
        let lo = (this.readUByte() | this.readUByte() << 8 | this.readUByte() << 16 | this.readUByte() << 24);
        let hi = (this.readUByte() | this.readUByte() << 8 | this.readUByte() << 16 | this.readUByte() << 24);
        return hi << 32 | lo;
    }

    readUTF8ToDelim (delim = 0x0) {
        let length = 0;
        let start = this.offset;
        while (this.readByte() != delim) length++;
        return this.buffer.slice(start, start + length).toString();
    }

    readFromPos (start, end) {
        return this.buffer.slice(start, end);
    }

    read (len) {
        let temp = this.buffer.slice(this.offset, this.offset + len);
        this.offset += len;
        return temp;
    }

    skip (count) {
        this.offset += count;
    }

    skip32 (count) {
        this.offset += count * 4;
    }
}