CREATE TABLE IF NOT EXISTS user (
    id int NOT NULL AUTO_INCREMENT,
    email     varchar(100) not null unique,
    username  varchar(100) not null,
    password  varchar(100) not null,
    confirmation_code varchar(100) not null,
    confirmed_email boolean not null default 0,
    created   timestamp not null default CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS project (
    id int not null AUTO_INCREMENT,
    title varchar(100) not null,
    info varchar(200) default null,
    status tinyint(1) default 0,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS worker (
    id int not null AUTO_INCREMENT,
    project_id int not null,
    user_id int not null,
    role tinyint(1) not null default 3,
    primary key (id),
    foreign key (user_id) references user(id) on delete cascade,
    foreign key (project_id) references project(id) on delete cascade
);

CREATE TABLE IF NOT EXISTS ticket (
    id int not null AUTO_INCREMENT,
    project_id int not null,
    task varchar(100) not null,
    description varchar(200) not null,
    severity tinyint(1) not null default 0,
    status tinyint(1) not null default 0,
    assigned_to int default null,
    submitted_by int not null,
    created timestamp not null default CURRENT_TIMESTAMP,
    primary key (id),
    foreign key (assigned_to) references worker(id) on delete set null,
    foreign key (project_id) references project(id) on delete cascade,
    foreign key (submitted_by) references worker(id)
);

CREATE TABLE IF NOT EXISTS ticket_comment (
    id int not null AUTO_INCREMENT,
    ticket_id int not null,
    commenter_id int not null,
    message varchar(200) not null,
    created timestamp not null default CURRENT_TIMESTAMP,
    primary key (id),
    foreign key (commenter_id) references worker(id),
    foreign key (ticket_id) references ticket(id) on delete cascade
);

CREATE TABLE IF NOT EXISTS ticket_history (
    id int not null AUTO_INCREMENT,
    ticket_id int not null,
    user_id int not null,
    field varchar(100) not null,
    from_value varchar(200) null,
    to_value varchar(200) null,
    created timestamp not null default CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    foreign key (ticket_id) references ticket(id) on delete cascade,
    foreign key (user_id) references worker(id)
);