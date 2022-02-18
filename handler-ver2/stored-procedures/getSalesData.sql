DELIMITER $$

CREATE PROCEDURE `getSales`(IN custType VARCHAR(255))
BEGIN
	SELECT * FROM sales WHERE customer_type = cust_type;
END$$
