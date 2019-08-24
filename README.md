# FETH Zlib Format
4:uncompressed chunk size;

4:chunk count;

4:uncompressed file size;

For I to [chunk count]

* 4:chunk size with meta

0x80 ofs start deflate data;
