-- Activity Types
CREATE TABLE activity_type (
    type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(50) UNIQUE NOT NULL 
);
