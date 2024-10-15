import React, { useState } from 'react';
import { Users, UserPlus, UserMinus } from 'lucide-react';

interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
}

interface Grupo {
  id: number;
  nombre: string;
  alumnos: Alumno[];
}

const AgruparAlumnos: React.FC = () => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [alumnos] = useState<Alumno[]>([
    { id: 1, nombre: 'Juan', apellido: 'Pérez' },
    { id: 2, nombre: 'María', apellido: 'González' },
    { id: 3, nombre: 'Carlos', apellido: 'Rodríguez' },
  ]);

  const crearGrupo = () => {
    if (nombreGrupo) {
      setGrupos([...grupos, { id: Date.now(), nombre: nombreGrupo, alumnos: [] }]);
      setNombreGrupo('');
    }
  };

  const agregarAlumnoAGrupo = (grupoId: number, alumno: Alumno) => {
    setGrupos(grupos.map(grupo => {
      if (grupo.id === grupoId) {
        return { ...grupo, alumnos: [...grupo.alumnos, alumno] };
      }
      return grupo;
    }));
  };

  const removerAlumnoDeGrupo = (grupoId: number, alumnoId: number) => {
    setGrupos(grupos.map(grupo => {
      if (grupo.id === grupoId) {
        return { ...grupo, alumnos: grupo.alumnos.filter(a => a.id !== alumnoId) };
      }
      return grupo;
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Agrupar Alumnos</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Nombre del Grupo"
          value={nombreGrupo}
          onChange={(e) => setNombreGrupo(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={crearGrupo}
          className="bg-blue-500 text-white p-2 rounded flex items-center"
        >
          <Users size={20} className="mr-1" /> Crear Grupo
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {grupos.map(grupo => (
          <div key={grupo.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-2">{grupo.nombre}</h3>
            <ul className="space-y-2">
              {grupo.alumnos.map(alumno => (
                <li key={alumno.id} className="flex justify-between items-center">
                  <span>{`${alumno.nombre} ${alumno.apellido}`}</span>
                  <button
                    onClick={() => removerAlumnoDeGrupo(grupo.id, alumno.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <UserMinus size={20} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <select
                className="border p-2 rounded mr-2"
                onChange={(e) => {
                  const alumnoId = parseInt(e.target.value);
                  const alumno = alumnos.find(a => a.id === alumnoId);
                  if (alumno) agregarAlumnoAGrupo(grupo.id, alumno);
                }}
              >
                <option value="">Seleccionar alumno</option>
                {alumnos.filter(a => !grupo.alumnos.some(ga => ga.id === a.id)).map(alumno => (
                  <option key={alumno.id} value={alumno.id}>
                    {`${alumno.nombre} ${alumno.apellido}`}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  const select = document.querySelector(`select`) as HTMLSelectElement;
                  const alumnoId = parseInt(select.value);
                  const alumno = alumnos.find(a => a.id === alumnoId);
                  if (alumno) agregarAlumnoAGrupo(grupo.id, alumno);
                  select.value = '';
                }}
                className="bg-green-500 text-white p-2 rounded flex items-center"
              >
                <UserPlus size={20} className="mr-1" /> Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgruparAlumnos;