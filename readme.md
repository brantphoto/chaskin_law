#Chaskin Law

##Directory Structure

This is a pretty basic component based structure. Building should really
be done strictly inside of the app folder. The changes should propogate to the build directory, which we really should not edit. Some exceptions occur when a file is expressly deleted. The deleted file will remain in the
build folder. This will be fixed soon but be cognizant of it.


##Getting Started
This assumes that you have node, installed and are familiar with how a package.json file works. You will need these to execute the build system with gulp. Also you will need nodemon to run the server. You could simply run it with node, but that would be unwise. During development you have to repeatedly restart the server, and nodemon will abstract that away so the build cycle is fully automated.

  $ npm install

This will pull in all of the dependencies for the project. They will be inside the node_modules file, which has been ignored. 

  $ nodemon server.js

This will run the server, it will restart when something is added to relevant files, so that the user does not need to manually restart it.
It serves on p:8080.

  $ gulp

This will start the task runner/build system which will do the heavy lifting. More about that below.


##Working with Code
###Abstract
Basically on save your code should be propagated to the build file, and if you are running nodemon, instantly changed in the browser. When you save a stylesheet it should compile, when you save js, it should compile, when you save an angular file it should be automatically annotated, compiled and uglified. You should not need to manually annotate, or move any files. The build directory shoudl reflect the most current state of the app directory on save.


###StyleSheets
In the stylesheets directory stylesheets will be auto compiled. I think it would make sense to try and keep them modular, and have a folder for each view. This can be further abstracted by section or by component (e.g typography, figures, etc.) The build system will compile all of the sass into the master and minify it for inclusion. **The main.scss if where you link stylesheets. No one should actually put styling in that file**

##Vanilla JS
This is where non-ng-javascripts go. They will also be added to the build on save. Feel free to make numerous folders here. The build system is set up to handle 2 or 3 folder levels deep, but this can be changed trivially.

##Angular App
The angular application is split up in a component based structure. You can put your **un-annotated** angular code in the appropriate directory and it will propogate to the build. The system will basically take the app.js, then the app-routes.js then the controllers, then the rest of the folders, and concat them in that order. They will be annotated properly, and then minified. They are then included in via a single script tag, in the index. 

##imgs
images put in the app/assets/img directory will be copied to the build system. Try to put them in there first, but frankly, if you want you can put them directly in the build.

##Server.js
This is just a super simple node server that serves the main application index file. Then, angular-ui-router routes the pages to the various views/templates included. As mentioned earlier, running it via 
  
  $ nodemon server.js

Will make your development the most hassle free. Nodemon watches the entire directory and will notify you if you make a breaking change, or reset the server to accomodate the change. Server runs on 8080.


##TL;DR
Run these

  $ npm install
  $ gulp
  $ nodemon server.js

Then make all of your edits in the app folder, changes will propogate to the build folder. Server runs on p 8080.



