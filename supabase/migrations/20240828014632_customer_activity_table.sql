-- Customer Activity
CREATE TABLE customer_activity (
    activity_id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique activity ID
    customer_id UUID REFERENCES customer(customer_id) ON DELETE CASCADE, -- Foreign key to customer table
    activity_type_id INT REFERENCES activity_type(type_id) ON DELETE CASCADE, -- Foreign key to activity_type table
    activity_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of the activity
);