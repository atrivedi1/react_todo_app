-- Group Table
-- +id
-- +name

-- Task Table
-- +id
-- +group id
-- +task

-- Dependency Table
-- +id
-- +task id
-- +Dependency Task id


CREATE SCHEMA TODO_APP;

CREATE TABLE GROUPS (ID INTEGER NOT NULL PRIMARY KEY,
                    GROUP_NAME VARCHAR(255));

CREATE TABLE TASKS (ID INTEGER NOT NULL PRIMARY KEY,
                   TASK_NAME VARCHAR(255),
                   GROUP_ID INTEGER NOT NULL,
                   COMPLETED_AT TIMESTAMP,
                   FOREIGN KEY (GROUP_ID) REFERENCES GROUPS(ID)
                   );

CREATE TABLE DEPENDENCIES (ID INTEGER NOT NULL PRIMARY KEY,
                         TASK_ID INTEGER NOT NULL,
                         DEPENDENCY_ID INTEGER NOT NULL,
                         FOREIGN KEY (TASK_ID) REFERENCES TASKS(ID)
                         );