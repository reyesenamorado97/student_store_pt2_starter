\echo 'Delete and recreate auth_starter db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE auth_starter;
CREATE DATABASE auth_starter;
\connect auth_starter

\i student-store-schema.sql
\i student-store-seed.sql


\echo 'Delete and recreate auth_starter_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE auth_starter_test;
CREATE DATABASE auth_starter_test;
\connect auth_starter_test

\i student-store-schema.sql
\i student-store-seed.sql

