create database if not exists mams;
use mams;
create table if not exists staff
(
    staff_id   int          not null auto_increment primary key,
    first_name varchar(50)  not null,
    last_name  varchar(50)  not null,
    email      varchar(255) not null unique,
    password   binary(60)   not null
);
create table if not exists manager
(
    manager_id          int not null primary key,
    meeting_hours_begin time,
    meeting_hours_end   time,
    foreign key (manager_id) references staff (staff_id)
);
create table if not exists doctor
(
    doctor_id        int not null primary key,
    room_number      int,
    employment_start date,
    manager_id       int not null,
    foreign key (doctor_id) references staff (staff_id),
    foreign key (manager_id) references manager (manager_id)
);
create table if not exists patient
(
    patient_id    int         not null auto_increment primary key,
    first_name    varchar(50) not null,
    last_name     varchar(50) not null,
    contact_phone varchar(15),
    contact_email varchar(255),
    birthdate     date        not null
);
create table if not exists appointment
(
    appointment_id int      not null auto_increment primary key,
    patient_id     int      not null,
    doctor_id      int      not null,
    date_time      datetime not null,
    foreign key (patient_id) references patient (patient_id),
    foreign key (doctor_id) references doctor (doctor_id)
);
