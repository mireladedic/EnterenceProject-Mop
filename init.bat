CALL npm install
CALL npm install bower -g
CALL bower install
CALL npm install gulp -g
CALL gulp --env=production
CALL docker run --name mop_twitter -p 27017:27017 -d mongo
CALL docker build . -t m_twitter
CALL docker run -p 8080:8080 m_twitter