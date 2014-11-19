docker run -p 1337:1337 --link es:es --name node --volumes-from logdata -d quintenk/node_log
