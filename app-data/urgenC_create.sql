-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-10-25 22:30:55.282

-- tables
-- Table: Goal
CREATE TABLE Goal (
    id serial  NOT NULL,
    title varchar(32)  NOT NULL,
    body text  NOT NULL,
    dueDate date  NOT NULL,
    priority int  NOT NULL,
    ownerUserId int  NOT NULL,
    dateCreated date  NOT NULL,
    CONSTRAINT Goal_pk PRIMARY KEY (id)
);

-- Table: GoalAssignment
CREATE TABLE GoalAssignment (
    id int  NOT NULL,
    userId int  NOT NULL,
    goalId int  NOT NULL,
    status varchar(32)  NOT NULL,
    CONSTRAINT GoalAssignment_pk PRIMARY KEY (id)
);

-- Table: Message
CREATE TABLE Message (
    id int  NOT NULL,
    body text  NOT NULL,
    userId int  NOT NULL,
    goalId int  NOT NULL,
    dateCreated date  NOT NULL,
    CONSTRAINT Message_pk PRIMARY KEY (id)
);

-- Table: User
CREATE TABLE "User" (
    id serial  NOT NULL,
    username varchar(32)  NOT NULL,
    hashedPassword varchar(100)  NOT NULL,
    displayName varchar(32)  NOT NULL,
    statusMessage text  NOT NULL,
    email varchar(100)  NOT NULL,
    profileColor varchar(7)  NOT NULL,
    dateCreated date  NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Messages_goal (table: Message)
ALTER TABLE Message ADD CONSTRAINT Messages_goal
    FOREIGN KEY (goalId)
    REFERENCES Goal (id)
    ON DELETE  CASCADE  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Messages_user (table: Message)
ALTER TABLE Message ADD CONSTRAINT Messages_user
    FOREIGN KEY (userId)
    REFERENCES "User" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: goal_user (table: Goal)
ALTER TABLE Goal ADD CONSTRAINT goal_user
    FOREIGN KEY (ownerUserId)
    REFERENCES "User" (id)
    ON DELETE  CASCADE  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: usersGoals_goal (table: GoalAssignment)
ALTER TABLE GoalAssignment ADD CONSTRAINT usersGoals_goal
    FOREIGN KEY (goalId)
    REFERENCES Goal (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: usersGoals_user (table: GoalAssignment)
ALTER TABLE GoalAssignment ADD CONSTRAINT usersGoals_user
    FOREIGN KEY (userId)
    REFERENCES "User" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

