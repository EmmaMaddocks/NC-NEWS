\c nc_news_test

SELECT attname
FROM pg_attribute
WHERE attrelid = (SELECT oid FROM pg_class WHERE relname = 'articles') 
AND attname = 'title'; 