\c nc_news_test

    SELECT articles.*,
    COUNT(comments.article_id)
    AS comment_count
    FROM articles
    LEFT JOIN comments
    ON comments.article_id = articles.article_id
    WHERE articles.article_id = 9
    group by articles.article_id;
      
