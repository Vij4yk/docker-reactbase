CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT,
    unique_name_tag VARCHAR(64) NOT NULL, 
    display_name VARCHAR(64) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(256),
    description VARCHAR(512),
    avatar LONGBLOB,
    password VARCHAR(512),

	PRIMARY KEY (id),
    UNIQUE KEY (unique_name_tag)
);

CREATE TABLE IF NOT EXISTS post (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL, 
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message VARCHAR(512) NOT NULL,
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,

	FOREIGN KEY (user_id) REFERENCES user(id),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS comment (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL, 
    post_id INT NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message VARCHAR(512) NOT NULL,
    likes INT,

	FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (post_id) REFERENCES post(id),
	PRIMARY KEY (id)
);
