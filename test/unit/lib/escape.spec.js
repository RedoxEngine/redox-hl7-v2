describe('module: escape', function () {
    var generator = new v2.Generator();
    describe('function: escapeString', function () {

        it('should escape an RTF examples', function () {
            expect(escape.escapeString(generator._delimiters, '{\\rtf1\\sste1...')).to.equal('{\\E\\rtf1\\E\\sste1...');
        });
        it('should escape everything...', function () {
            expect(escape.escapeString(generator._delimiters, 'MSH|^~\\&|')).to.equal('MSH\\F\\\\S\\\\R\\\\E\\\\T\\\\F\\');
        });

        it('should handle special delimiters', function () {
            var delims = {
                field: 'f', // |
                component: 'a', // ^
                repetition: 'd', // ~
                escape: 'e', // \
                subComponent: 's' // &
            }
            expect(escape.escapeString(delims, 'nicks cool fade')).to.equal('nick\\T\\ cool \\F\\\\S\\\\R\\\\E\\');

        });


    });
    describe('function: unEscapeString', function () {

        it('should unescape an RTF examples', function () {
            expect(escape.unEscapeString(generator._delimiters, '{\\E\\rtf1\\E\\sste1...')).to.equal('{\\rtf1\\sste1...');
        });
        it('should unescape everything...', function () {
            expect(escape.unEscapeString(generator._delimiters, 'MSH\\F\\\\S\\\\R\\\\E\\\\T\\\\F\\')).to.equal('MSH|^~\\&|');
        });

        it('should unescape custom delimiters', function () {
            var delims = {
                field: 'f', // |
                component: 'a', // ^
                repetition: 'd', // ~
                escape: 'e', // \
                subComponent: 's' // &
            }
            expect(escape.unEscapeString(delims, 'nick\\T\\ cool \\F\\\\S\\\\R\\\\E\\')).to.equal('nicks cool fade');

        });
    });
});