create database if not exists mams;
use mams;

create table if not exists staff
(
    staff_id   int          not null auto_increment,
    first_name varchar(50)  not null,
    last_name  varchar(50)  not null,
    email      varchar(255) not null unique,
    password   binary(60)   not null,
    is_admin   bool         not null default 0,
    primary key (staff_id)
);

create table if not exists manager
(
    manager_id          int not null,
    meeting_hours_begin time,
    meeting_hours_end   time,
    primary key (manager_id),
    foreign key (manager_id) references staff (staff_id) on delete cascade
);

create table if not exists doctor
(
    doctor_id        int not null,
    room_number      int,
    employment_start date,
    manager_id       int,
    primary key (doctor_id),
    foreign key (doctor_id) references staff (staff_id) on delete cascade,
    foreign key (manager_id) references manager (manager_id) on delete set null
);

create table if not exists patient
(
    patient_id    int         not null auto_increment,
    first_name    varchar(50) not null,
    last_name     varchar(50) not null,
    contact_phone varchar(15),
    contact_email varchar(255),
    birthdate     date        not null,
    primary key (patient_id)
);

create table if not exists appointment
(
    appointment_id int      not null auto_increment,
    patient_id     int      not null,
    doctor_id      int,
    date_time      datetime not null,
    primary key (appointment_id),
    foreign key (patient_id) references patient (patient_id) on delete cascade,
    foreign key (doctor_id) references doctor (doctor_id) on delete set null
);

/*
 Create admin user with email: admin@mains.com, password: admin
 Passwords are stored after being hashed with bcrypt using 10 salt rounds
 If you wish to change the admin password you should hash it like so first
 */
insert into staff
    (first_name, last_name, email, password, is_admin)
values ('admin', 'admin', 'admin@mams.com', '$2a$10$aN5g6b6jyvAK/yaLQ.pJxeEK3Stt3fhkZQ/.Ho5piGW1bvXXsUdsC', true);
