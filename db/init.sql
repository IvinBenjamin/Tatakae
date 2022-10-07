DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS comment;

CREATE TABLE  IF NOT EXISTS user(
    id int(10) NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(150) NOT NULL,
    dateOfJoining VARCHAR(100),
    CONSTRAINT usernameUnique UNIQUE (username),
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS feedback(
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    title VARCHAR(50),
    content VARCHAR(9000),
    anime varchar(50),
    rate VARCHAR(2),
    genre VARCHAR(100),
    date VARCHAR(1000),
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

    
CREATE TABLE IF NOT EXISTS comment(
    id INT NOT NULL AUTO_INCREMENT,
    feedbackId INT NOT NULL,
    userId INT NOT NULL,
    content VARCHAR(9000),
    PRIMARY KEY (id),
    FOREIGN KEY (feedbackId) REFERENCES feedback(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);
