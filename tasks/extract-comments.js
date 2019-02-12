'use strict';

module.exports = (grunt) => {

    const extract = require('extract-comments');

    grunt.registerMultiTask('extract-comments', 'Get all comments from files and save them to separate file.', function() {
        this.files.forEach((file) => {
            const src = file.src.filter((filepath) => {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map((filepath) => {
                const content = grunt.file.read(filepath);
                const commentsAst = extract(content);

                return commentsAst.map((comment) => `/*${comment.raw}*/`).join('\n');
            });

            grunt.file.write(file.dest, src.join(''), {encoding: 'utf-8'});

            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    });

};
