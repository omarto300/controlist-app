// This file simulates API calls

interface User {
  id: number;
  username: string;
  password: string;
}

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
}

export interface Asistencia {
  id: number;
  alumnoId: number;
  fecha: string;
  estado: 'presente' | 'ausente' | 'tardanza' | 'justificado';
}

const users: User[] = [
  { id: 1, username: 'admin', password: 'password123' },
];

let alumnos: Alumno[] = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez' },
  { id: 2, nombre: 'María', apellido: 'González' },
  { id: 3, nombre: 'Carlos', apellido: 'Rodríguez' },
];

let asistencias: Asistencia[] = [];

export const login = async (username: string, password: string): Promise<string | null> => {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return 'fake-jwt-token';
  }
  return null;
};

export const getAlumnos = async (): Promise<Alumno[]> => {
  return alumnos;
};

export const createAlumno = async (alumno: Omit<Alumno, 'id'>): Promise<Alumno> => {
  const newAlumno = { ...alumno, id: Date.now() };
  alumnos.push(newAlumno);
  return newAlumno;
};

export const deleteAlumno = async (id: number): Promise<void> => {
  alumnos = alumnos.filter(a => a.id !== id);
};

export const getAsistencias = async (fecha: string): Promise<Asistencia[]> => {
  return asistencias.filter(a => a.fecha === fecha);
};

export const saveAsistencias = async (nuevasAsistencias: Asistencia[]): Promise<void> => {
  asistencias = asistencias.filter(a => a.fecha !== nuevasAsistencias[0].fecha);
  asistencias.push(...nuevasAsistencias);
};