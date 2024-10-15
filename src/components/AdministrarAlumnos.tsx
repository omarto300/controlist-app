import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
}

const AdministrarAlumnos: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  const agregarAlumno = () => {
    if (nombre && apellido) {
      setAlumnos([...alumnos, { id: Date.now(), nombre, apellido }]);
      setNombre('');
      setApellido('');
    }
  };

  const eliminarAlumno = (id: number) => {
    setAlumnos(alumnos.filter(alumno => alumno.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Administrar Alumnos</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={agregarAlumno}
          className="bg-green-500 text-white p-2 rounded flex items-center"
        >
          <Plus size={20} className="mr-1" /> Agregar
        </button>
      </div>
      <ul className="space-y-2">
        {alumnos.map((alumno) => (
          <li key={alumno.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
            <span>{`${alumno.nombre} ${alumno.apellido}`}</span>
            <button
              onClick={() => eliminarAlumno(alumno.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdministrarAlumnos;