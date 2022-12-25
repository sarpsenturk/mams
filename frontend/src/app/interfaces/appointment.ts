export interface Appointment {
  appointment_id: number;
  patient_first_name: string;
  patient_last_name: string;
  doctor_first_name: string;
  doctor_last_name: string;
  room_number: number;
  date_time: Date;
}
