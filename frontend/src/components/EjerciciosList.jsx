export default function EjerciciosList({ ejercicios }) {
  return (
    <ul>
      {ejercicios.map((e) => (
        <li key={e.id}>
          {e.nombre} — {e.descripcion}
        </li>
      ))}
    </ul>
  );
}
