# FETH Deflate Format
4:uncompressed chunk size;

4:chunk count;

4:uncompressed file size;

For I to [chunk count]

* 4:chunk size with meta

For I to [chunk count]

* align to 0x80

* 4:chunk size

* [chunk size]:deflate data;
