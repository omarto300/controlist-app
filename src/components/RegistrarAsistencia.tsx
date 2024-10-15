import React, { useState, useEffect } from 'react';
import { Check, X, Clock, FileText } from 'lucide-react';
import { getAlumnos, getAsistencias, saveAsistencias, Alumno, Asistencia } from '../services/api';

const RegistrarAsistencia: React.FC = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [asistencias, setAsistencias] = useState<{ [key: number]: Asistencia }>({});

  useEffect(() => {
    const fetchData = async () => {
      const alumnosData = await getAlumnos();
      setAlumnos(alumnosData);
      const asistenciasData = await getAsistencias(fecha);
      const asistenciasMap = asistenciasData.reduce((acc, asistencia) => {
        acc[asistencia.alumnoId] = asistencia;
        return acc;
      }, {} as { [key: number]: Asistencia });
      setAsistencias(asistenciasMap);
    };
    fetchData();
  }, [fecha]);

  const toggleAsistencia = (alumnoId: number, estado: Asistencia['estado']) => {
    setAsistencias(prev => ({
      ...prev,
      [alumnoId]: {
        id: prev[alumnoId]?.id || Date.now(),
        alumnoId,
        fecha,
        estado,
      },
    }));
  };

  const guardarAsistencia = async () => {
    const asistenciasArray = Object.values(asistencias);
    await saveAsistencias(asistenciasArray);
    alert('Asistencia guardada exitosamente');
  };

  const getButtonClass = (estado: Asistencia['estado']) => {
    switch (estado) {
      case 'presente':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'ausente':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'tardanza':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case 'justificado':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      default:
        return 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">Registrar Asistencia</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="input mb-4 w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
        <ul className="space-y-2">
          {alumnos.map((alumno) => (
            <li key={alumno.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <span>{`${alumno.nombre} ${alumno.apellido}`}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleAsistencia(alumno.id, 'presente')}
                  className={`p-2 rounded-full transition-colors duration-300 ${getButtonClass(asistencias[alumno.id]?.estado === 'presente' ? 'presente' : '')}`}
                  title="Presente"
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={() => toggleAsistencia(alumno.id, 'ausente')}
                  className={`p-2 rounded-full transition-colors duration-300 ${getButtonClass(asistencias[alumno.id]?.estado === 'ausente' ? 'ausente' : '')}`}
                  title="Ausente"
                >
                  <X size={20} />
                </button>
                <button
                  onClick={() => toggleAsistencia(alumno.id, 'tardanza')}
                  className={`p-2 rounded-full transition-colors duration-300 ${getButtonClass(asistencias[alumno.id]?.estado === 'tardanza' ? 'tardanza' : '')}`}
                  title="Tardanza"
                >
                  <Clock size={20} />
                </button>
                <button
                  onClick={() => toggleAsistencia(alumno.id, 'justificado')}
                  className={`p-2 rounded-full transition-colors duration-300 ${getButtonClass(asistencias[alumno.id]?.estado === 'justificado' ? 'justificado' : '')}`}
                  title="Justificado"
                >
                  <FileText size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={guardarAsistencia}
          className="btn btn-primary mt-4 w-full"
        >
          Guardar Asistencia
        </button>
      </div>
    </div>
  );
};

export default RegistrarAsistencia;