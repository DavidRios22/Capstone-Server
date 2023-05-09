create table users (
    id int primary key auto_increment,
    username varchar(50) not null,
    password_hash varchar (1000) not null,
    first_name varchar(100) not null
)

create table weight (
    id int primary key auto_increment,
    user_id int,
    weigh_in date,
    weight_lbs int(5),
    foreign key (user_id) references users(id)
)

create table habits (
    id int primary key auto_increment,
    user_id int,
    habit_name varchar(50) not null,
    completed bit(1) default 0,
    foreign key (user_id) references users(id)
)