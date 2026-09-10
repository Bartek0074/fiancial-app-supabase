CREATE OR REPLACE FUNCTION fetch_transactions (
	range_arg VARCHAR DEFAULT 'last30days',
	limit_arg INT DEFAULT 20,
	offset_arg INT DEFAULT 0
)
RETURNS SETOF transactions AS $$
DECLARE
	startDate TIMESTAMP;
	endDate TIMESTAMP := now();
BEGIN
	CASE range_arg
		WHEN 'last24hours' THEN 
			startDate := endDate - INTERVAL '24 hours';
		WHEN 'last7days' THEN 
			startDate := endDate - INTERVAL '7 days';
		WHEN 'last30days' THEN 
			startDate := endDate - INTERVAL '30 days';
		WHEN 'last12months' THEN 
			startDate := endDate - INTERVAL '12 months';
		ELSE 
			startDate := endDate - INTERVAL '30 days';
	END CASE;

	RETURN QUERY
		SELECT *
		FROM transactions
		WHERE created_at BETWEEN startDate AND endDate
		ORDER BY created_at DESC, id DESC
		LIMIT limit_arg OFFSET offset_arg;
END;
$$ LANGUAGE plpgsql;