'use strict';

module.exports = (grunt) => {

    const parser = require('@babel/parser');

    grunt.registerMultiTask('extract-comments', 'Get all comments from files and save them to separate file.', function () {
        this.files.forEach((file) => {
            let src = file.src.filter((filepath) => {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            });

            src = src.map((filepath) => {
                const content = grunt.file.read(filepath);

                const commentsAst = parser.parse(content, {
                    sourceType: 'module',
                    plugins: [
                        'typescript',
                        'asyncGenerators',
                        'bigInt',
                        'classProperties',
                        'classPrivateProperties',
                        'classPrivateMethods',
                        'decorators-legacy',
                        'doExpressions',
                        'dynamicImport',
                        'exportDefaultFrom',
                        'exportNamespaceFrom',
                        'functionBind',
                        'functionSent',
                        'importMeta',
                        'logicalAssignment',
                        'nullishCoalescingOperator',
                        'numericSeparator',
                        'objectRestSpread',
                        'optionalCatchBinding',
                        'optionalChaining',
                        'partialApplication',
                        'throwExpressions'
                    ]
                });

                return commentsAst.comments.map((c) => `/*${c.value}*/`).join('\n');
            });

            grunt.file.write(file.dest, src.join(''), {encoding: 'utf-8'});

            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    });

};
