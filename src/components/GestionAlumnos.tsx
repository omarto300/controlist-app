import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Users, UserPlus, UserMinus, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAlumnos, createAlumno, deleteAlumno, Alumno } from '../services/api';

interface Grupo {
  id: number;
  nombre: string;
  alumnos: Alumno[];
}

const GestionAlumnos: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [alumnosPage, setAlumnosPage] = useState(1);
  const [gruposPage, setGruposPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    const alumnosData = await getAlumnos();
    setAlumnos(alumnosData);
  };

  const agregarAlumno = async () => {
    if (nombre && apellido) {
      const nuevoAlumno = await createAlumno({ nombre, apellido });
      setAlumnos([...alumnos, nuevoAlumno]);
      setNombre('');
      setApellido('');
    }
  };

  const eliminarAlumno = async (id: number) => {
    await deleteAlumno(id);
    setAlumnos(alumnos.filter(alumno => alumno.id !== id));
    setGrupos(grupos.map(grupo => ({
      ...grupo,
      alumnos: grupo.alumnos.filter(alumno => alumno.id !== id)
    })));
  };

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

  const paginatedAlumnos = alumnos.slice((alumnosPage - 1) * itemsPerPage, alumnosPage * itemsPerPage);
  const paginatedGrupos = grupos.slice((gruposPage - 1) * itemsPerPage, gruposPage * itemsPerPage);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">Gestión de Alumnos y Grupos</h2>
      
      {/* Sección para agregar alumnos */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Agregar Alumno</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input flex-grow"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="input flex-grow"
          />
          <button
            onClick={agregarAlumno}
            className="btn btn-primary flex items-center"
          >
            <Plus size={20} className="mr-1" /> Agregar
          </button>
        </div>
        
        {/* Lista de alumnos */}
        <ul className="space-y-2 mb-4">
          {paginatedAlumnos.map((alumno) => (
            <li key={alumno.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <span>{`${alumno.nombre} ${alumno.apellido}`}</span>
              <button
                onClick={() => eliminarAlumno(alumno.id)}
                className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
        
        {/* Paginación de alumnos */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setAlumnosPage(prev => Math.max(prev - 1, 1))}
            disabled={alumnosPage === 1}
            className="btn btn-secondary"
          >
            <ChevronLeft size={20} />
          </button>
          <span>Página {alumnosPage}</span>
          <button
            onClick={() => setAlumnosPage(prev => prev + 1)}
            disabled={alumnosPage * itemsPerPage >= alumnos.length}
            className="btn btn-secondary"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Sección para crear y gestionar grupos */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Gestionar Grupos</h3>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Nombre del Grupo"
            value={nombreGrupo}
            onChange={(e) => setNombreGrupo(e.target.value)}
            className="input flex-grow"
          />
          <button
            onClick={crearGrupo}
            className="btn btn-primary flex items-center"
          >
            <Users size={20} className="mr-1" /> Crear Grupo
          </button>
        </div>
        
        {/* Lista de grupos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {paginatedGrupos.map(grupo => (
            <div key={grupo.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">{grupo.nombre}</h4>
              <ul className="space-y-2 mb-4">
                {grupo.alumnos.map(alumno => (
                  <li key={alumno.id} className="flex justify-between items-center">
                    <span>{`${alumno.nombre} ${alumno.apellido}`}</span>
                    <button
                      onClick={() => removerAlumnoDeGrupo(grupo.id, alumno.id)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300"
                    >
                      <UserMinus size={20} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                <select
                  className="input mr-2"
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
                  className="btn btn-secondary flex items-center"
                >
                  <UserPlus size={20} className="mr-1" /> Agregar al Grupo
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Paginación de grupos */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setGruposPage(prev => Math.max(prev - 1, 1))}
            disabled={gruposPage === 1}
            className="btn btn-secondary"
          >
            <ChevronLeft size={20} />
          </button>
          <span>Página {gruposPage}</span>
          <button
            onClick={() => setGruposPage(prev => prev + 1)}
            disabled={gruposPage * itemsPerPage >= grupos.length}
            className="btn btn-secondary"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GestionAlumnos;