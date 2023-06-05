create table users (
    id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar (1000) not null,
    first_name varchar(100) not null
)

create table weight (
    id int primary key auto_increment,
    user_id int,
    weigh_in date not null,
    weight_lbs int(5) not null,
    foreign key (user_id) references users(id)
)

create table habits (
    id int primary key auto_increment,
    user_id int,
    habit_name varchar(50) not null,
    last_logged date not null,
    streak int(5) not null,
    foreign key (user_id) references users(id)
)