\c nc_news_test

  SELECT articles.*,
    COUNT(comments.article_id)
    AS comment_count
    FROM articles
    LEFT JOIN comments
    ON comments.article_id = articles.article_id
    WHERE topic_slug = '${topic}'
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC
    RETURNING*;
