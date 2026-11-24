interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchFilter({ value, onChange }: Props) {
  return (
    <label style={{ display: 'block', marginBottom: '1rem' }}>
      <span style={{ marginRight: 8 }}>Buscar:</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filtrar por nombre…"
        aria-label="Filtrar criptomonedas por nombre"
      />
    </label>
  );
}