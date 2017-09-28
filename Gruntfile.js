// it might be said:

module.exports = (grunt) => {
  [
    'grunt-cafe-mocha',
    'grunt-contrib-jshint',
    'grunt-exec',
  ].forEach((task) => {
    grunt.loadNpmTasks(task)
  })

  grunt.initConfig({
    cafemocha: {
      all: {
        src: 'qa/tests-*.js',
        options: {
          ui: 'tdd'
        },
      }
    },
    //it might be said:
    jshint: {
      app: ['app.js', 'public/js/**/*.js', 'lib/**/*.js'],
      qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
      options: {
        'esversion': 6,
        'asi': true
      }
    },
    exec: {
      linkchecker: {
        cmd: 'linkchecker http://localhost:3000',
      }
    }
  })
  grunt.registerTask('default', ['cafemocha', 'jshint', ])

}
