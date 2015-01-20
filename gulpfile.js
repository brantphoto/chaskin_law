var gulp = require('gulp');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'jshint'],
    lazy:false,
    scope: ['devDependencies']
});


// ============================================
//       Build Angular Application
// ============================================

// build-app is a task that runs sequentially and therefore
// the order is extremely important. First it annotates all
// angular files, and moves them to a staging area, then
// they are concatenated in the correct order, as to actually
// work. Then they are simultaneously minified. Then the staging
// area is destroyed. The index view is imported at the top level,
// then the templates are brought in.

// Master Task : Calls on the other 5
// ===================================
gulp.task('build-app', function(callback){
    runSequence('annotate','compile-angular',['clear-stage', 'copy-index'], 'copy-views', callback);
});


// annotates angular/moves to staging area
gulp.task('annotate', function(){

  return gulp.src(['./app/**/**/*.js', '!./app/assets/js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(plugins.ngAnnotate())
    .pipe(gulp.dest('./build/staging'));
});

// Puts Angular in a master minified file
gulp.task('compile-angular', function(){

  var src = {
    app: './build/staging/app.js',
    routes: './build/staging/app-routes.js',
    cntrl:  './build/staging/controllers/*.js',
    dir: './build/staging/directives/*.js',
    srvc: './build/staging/services/*.js'
  };   
 
  return gulp.src([src.app, src.routes, src.cntrl, src.dir, src.srvc])
    
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./build/app'));
});

// removes staging area
gulp.task('clear-stage', function () {
  return gulp.src('./build/staging', {read: false})
    .pipe(plugins.clean({force:true}));
});

// Moves index to build folder at top level
gulp.task('copy-index', function(){
  return gulp.src('./app/views/*.html')    
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-views', function(){
  return gulp.src('./app/views/templates/**/*.html')    
    .pipe(gulp.dest('./build/templates'));
});

// ======= End Build Sequence =================


// ============================================
//      Static Assets Compilation
// ============================================
// Task handling the rest of the basic build.
// > minify and concatenate the non-angular JS
// > copy jpeg, jpg, svg and gif imgs
// > compile, and minify the SASS in the 
// =============================================
gulp.task('sass', function () {
  gulp.src(['./app/assets/stylesheets/**/**/*.scss','./app/assets/stylesheets/**/**/*.css'])
    .pipe(plugins.sass({ 

      // minified no comments
      outputStyle: 'compressed',

      // Line numbers where errors occur will be output to console.
      errLogToConsole: true,

      sourceComments : 'normal',

      // User friendly read-out in the terminal upon success.
      onSuccess: function(){
        console.log('Successfully Compiled Stylesheet\n' + 'The stylesheet was saved to build/app/css/main.css.');
      } 

    }))

    .pipe(gulp.dest('./build/app/css'));
});


// Moves Image Assets to Build Directory
gulp.task('get-images', function() {
    return gulp.src(['./app/assets/img/**/*.jpg','./app/assets/img/**/*.svg', './app/assets/img/**/*.gif', './app/assets/img/**/*.jpeg'])    
      .pipe(gulp.dest('./build/app/img'));
});

// Minify and Compile non-ng Scripts
gulp.task('get-js', function(){
  gulp.src('./app/assets/js/**/**/*.js')
    .pipe(plugins.concat('allScripts.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./build/app/js'));
});
//======= END STATIC ASSETS TASKS =========


// ========================================
//            Watch Tasks
// ========================================
gulp.task('watch', function(){  
    // Watch for any updates to a CSS or SCSS file
    gulp.watch(['./app/assets/stylesheets/**/**/*.scss','./app/assets/stylesheets/**/**/*.css'],['sass']);

    // Watch all non-NG JS 
    gulp.watch(['./app/assets/js/*.js'],['get-js']);

    // Watch Index, Angular, or Templates
    gulp.watch([
        './app/**/**/*.js', 
        './app/views/*.html',
        './app/views/templates/**/*.html',
      ], ['build-app']);

    // Watch For New Images
    gulp.watch([
      './app/assets/img/**/*.jpg',
      './app/assets/img/**/*.svg', 
      './app/assets/img/**/*.gif', 
      './app/assets/img/**/*.jpeg'
      ],['get-images']);
});  

gulp.task('default',['get-images', 'build-app', 'watch']);

// ==========================================
//           Manual Tasks
// ==========================================

// Waypoints has no CDN
gulp.task('get-waypoints', function(){
  gulp.src('./bower_components/angular-waypoints/dist/angular-waypoints.min.js')    
    .pipe(gulp.dest('./build/app/vendor'));
});





















































































// Breathing Room