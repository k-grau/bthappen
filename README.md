# bthappen

Simple NodeJs-based server and client. Developed as part of course at Blekinge Institute of Technology (BIT), Sweden, 2019.

Allows user to list and search classrooms at BIT. All classrooms are contained in a JSON-file that has been dervied from an original CSV-file.

Command-line based, linux/unix only. To start the server open a terminal and navigate to bthappen/server and type "node index.js" (make sure node is installed). 
The server listens to port 1337 by default. To request it listening on another port type "node index.js --port &ltdesired port&gt".

To start the client, tmux another session or open a new terminal. Then navigate to bthappen/client and type "node index.js". Instructions on how to use the client will be displayed.
  
Application language is English and Swedish.

Also included in the project is a bash script that is used to convert the classrooms CSV-file to JSON-file. It's located in the root folder, named "salar2json.bash".
