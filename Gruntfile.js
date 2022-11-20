module.exports = function( grunt ) {

    grunt.loadNpmTasks( "grunt-babel" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-banner" );

    var LICENSE = "/****\n * " +
                  grunt.file.read( "./LICENSE", {encoding: "utf-8"} ).replace( /\n/ig, "\n * " ) +
                  "\n ****/";

    grunt.initConfig( {
        babel:     {
            options: {
                presets: [
                    [
                      "@babel/preset-env",
                      {
                        modules: "umd"
                      }
                    ]
                  ],
                plugins: ["add-module-exports"],
                moduleId: "Toposort"
            },
            build:   {
                files:   [{
                    expand: true,
                    cwd:    "./src/",
                    src:    "./**/*.js",
                    dest:   "./build/"
                }]
            }
        },
        usebanner: {
            license: {
                options: {
                    banner:    LICENSE
                },
                files:   {
                    src: ["./build/**/*.js"]
                }
            }
        },
        clean:     {
            build: {
                src: ["./build"]
            }
        },
        uglify:    {
            build: {
                files: {
                    "build/toposort.min.js": "build/toposort.js"
                }
            }
        }
    } );

    grunt.registerTask( "build", ["clean:build", "babel:build", "usebanner:license", "uglify:build"] );

    grunt.registerTask( "default", ["build"] );
};
