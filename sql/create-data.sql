use mams;

/*
 Random data generated with https://www.mockaroo.com/
 */

-- Create managers
INSERT INTO staff (first_name, last_name, email, password) VALUES ('Sergeant', 'Daber', 'sdaber0@wunderground.com', '$2a$10$KJp8PHIb6OMXWQr/l3QHWejNbsONdkhMj.ewFYPn/TTyi7A1iSuIi');
INSERT INTO manager(manager_id, meeting_hours_begin, meeting_hours_end) VALUES (LAST_INSERT_ID(), '09:30:00', '16:30:00');

INSERT INTO staff (first_name, last_name, email, password) VALUES ('Ruttger', 'Steadman', 'rsteadman1@github.io', '$2a$10$KJp8PHIb6OMXWQr/l3QHWejNbsONdkhMj.ewFYPn/TTyi7A1iSuIi');
INSERT INTO manager(manager_id, meeting_hours_begin, meeting_hours_end) VALUES (LAST_INSERT_ID(), '16:30:00', '02:00:00');

INSERT INTO staff (first_name, last_name, email, password) VALUES ('Tina', 'Aloshkin', 'taloshkin2@behance.net', '$2a$10$KJp8PHIb6OMXWQr/l3QHWejNbsONdkhMj.ewFYPn/TTyi7A1iSuIi');
INSERT INTO manager(manager_id, meeting_hours_begin, meeting_hours_end) VALUES (LAST_INSERT_ID(), '02:00:00', '09:30:00');

-- Create doctors
INSERT INTO staff (first_name, last_name, email, password) VALUES ('Gregory', 'House', 'house@mams.com', '$2a$10$KJp8PHIb6OMXWQr/l3QHWejNbsONdkhMj.ewFYPn/TTyi7A1iSuIi');
INSERT INTO doctor (doctor_id, room_number, employment_start, manager_id) VALUES (LAST_INSERT_ID(), 1001, '2004-11-16', 2);

INSERT INTO staff (first_name, last_name, email, password) VALUES ('James', 'Wilson', 'james@mams.com', '$2a$10$KJp8PHIb6OMXWQr/l3QHWejNbsONdkhMj.ewFYPn/TTyi7A1iSuIi');
INSERT INTO doctor (doctor_id, room_number, employment_start, manager_id) VALUES (LAST_INSERT_ID(), 1001, '2004-11-16', 3);

INSERT INTO staff (first_name, last_name, email, password) VALUES ('Allison', 'Cameron', 'allison@mams.com', '$2a$10$KJp8PHIb6OMXWQr/l3QHWejNbsONdkhMj.ewFYPn/TTyi7A1iSuIi');
INSERT INTO doctor (doctor_id, room_number, employment_start, manager_id) VALUES (LAST_INSERT_ID(), 1001, '2004-11-16', 4);

-- Create patients
INSERT INTO patient (first_name, last_name, contact_email, contact_phone, birthdate) VALUES ('Tymon', 'Brompton', 'tbrompton0@usatoday.com', '977-850-9100', '1995/08/20');
INSERT INTO patient (first_name, last_name, contact_email, contact_phone, birthdate) VALUES ('Jenine', 'Crebbin', 'jcrebbin1@ow.ly', '574-626-7891', '2001/10/03');
INSERT INTO patient (first_name, last_name, contact_email, contact_phone, birthdate) VALUES ('Tybi', 'Fenne', 'tfenne2@webnode.com', '505-735-3467', '1991/07/06');
INSERT INTO patient (first_name, last_name, contact_email, contact_phone, birthdate) VALUES ('Hinda', 'Tibalt', 'htibalt3@google.ca', '290-461-0586', '2007/08/03');
INSERT INTO patient (first_name, last_name, contact_email, contact_phone, birthdate) VALUES ('Rriocard', 'Asman', 'rasman4@sina.com.cn', '325-406-4928', '1990/09/23');
INSERT INTO patient (first_name, last_name, contact_email, contact_phone, birthdate) VALUES ('Redford', 'Zavattiero', 'rzavattiero5@unicef.org', '453-521-5929', '1996/02/01');
INSERT INTO patient (first_name, last_name, contact_email, contact_phone, birthdate) VALUES ('Anne', 'Biever', 'abiever6@hhs.gov', '542-598-8062', '2010/07/17');
INSERT INTO patient (first_name, last_name, contact_email, contact_phone, birthdate) VALUES ('Jori', 'Bonnette', 'jbonnette7@soundcloud.com', '134-612-3031', '2007/04/03');
INSERT INTO patient (first_name, last_name, contact_email, contact_phone, birthdate) VALUES ('Jamaal', 'Creffeild', 'jcreffeild8@wsj.com', '154-842-3966', '2004/03/28');
INSERT INTO patient (first_name, last_name, contact_email, contact_phone, birthdate) VALUES ('Elfreda', 'Clacson', 'eclacson9@opera.com', '514-222-8434', '1994/10/30');

-- Create appointments
insert into appointment (patient_id, doctor_id, date_time) values (6, 7, '2023-07-25 04:51:49');
insert into appointment (patient_id, doctor_id, date_time) values (2, 5, '2023-02-26 17:30:29');
insert into appointment (patient_id, doctor_id, date_time) values (1, 6, '2023-09-15 23:00:09');
insert into appointment (patient_id, doctor_id, date_time) values (5, 5, '2023-05-31 20:26:23');
insert into appointment (patient_id, doctor_id, date_time) values (8, 5, '2023-09-15 19:29:51');
insert into appointment (patient_id, doctor_id, date_time) values (6, 7, '2023-02-27 21:58:13');
insert into appointment (patient_id, doctor_id, date_time) values (1, 7, '2023-04-02 09:33:15');
insert into appointment (patient_id, doctor_id, date_time) values (6, 7, '2023-03-12 01:08:24');
insert into appointment (patient_id, doctor_id, date_time) values (9, 5, '2023-10-01 13:26:07');
insert into appointment (patient_id, doctor_id, date_time) values (8, 5, '2023-08-13 09:42:12');