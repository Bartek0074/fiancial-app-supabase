CREATE OR REPLACE FUNCTION calculate_total (
	range_arg VARCHAR DEFAULT 'last30days',
	type_arg VARCHAR DEFAULT null
) RETURNS TABLE(current_amount NUMERIC, previous_amount NUMERIC) as $$ 
DECLARE
	currentStart TIMESTAMP;
	currentEnd TIMESTAMP;
	previousStart TIMESTAMP;
	previousEnd TIMESTAMP;
BEGIN
	currentEnd := now();
	CASE range_arg
		WHEN 'last24hours' THEN
            currentStart := currentEnd - INTERVAL '24 hours';
		WHEN 'last7days' THEN
            currentStart := currentEnd - INTERVAL '7 days';
		WHEN 'last30days' THEN 
            currentStart := currentEnd - INTERVAL '30 days';
		WHEN 'last12months' THEN 
            currentStart := currentEnd - INTERVAL '12 months';
		ELSE 
            currentStart := currentEnd - INTERVAL '30 days';    
	END CASE;

	previousEnd := currentStart - INTERVAL '1 second';
	previousStart := currentStart - (currentEnd - currentStart);

	current_amount := (
		SELECT COALESCE(SUM(amount), 0)
		FROM transactions 
		WHERE
			(type = type_arg OR type_arg IS NULL)
			AND (created_at BETWEEN currentStart AND currentEnd)
	);
	previous_amount := (
		SELECT COALESCE(SUM(amount), 0)
		FROM transactions
		WHERE
			(type = type_arg OR type_arg IS NULL)
			AND (created_at BETWEEN previousStart AND previousEnd)
	);
	RETURN NEXT;
END;
$$ LANGUAGE plpgsql