DELIMITER $$

CREATE PROCEDURE `filterTodo`(IN player VARCHAR(255))
BEGIN
    SELECT * FROM todo WHERE user = player;
END$$




