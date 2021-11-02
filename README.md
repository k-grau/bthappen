# bthappen

NodeJs-based server and client. Developed as part of course at Blekinge Institute of Technology (BIT), Sweden, 2019.

Allows user to list and search classrooms at BIT. All classrooms are contained in a JSON-file that has been dervied from original CSV-file.

Command-line based. To test (in Linux), open terminal and navigate to bthappen/server and typ "node index.js" (make sure node is installed). Then tmux another session or open a new terminal. Navigate to bthappen/client and type "node index.js" again.

The server is listening to port 1337 by default. To request it listening on another port type "node index.js --port <desired port>"

Also included in the project is a bash script that is used to convert the classrooms CSV-file to JSON-file. It's located in the root folder, named "salar2json.bash"
