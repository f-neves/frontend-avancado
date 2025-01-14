type Props = {
  headers: Record<string, string>;
  data: Record<string, unknown>[];
  actions?: (item: Record<string, unknown>) => JSX.Element;
};

function GenericTable({ headers, data, actions }: Props) {
  return (
    <div className="generic-table">
      <table className="generic-table-style">
        <thead>
          <tr>
            {Object.values(headers).map((title, index) => (
              <th key={index} className="generic-table-header">
                {title}
              </th>
            ))}
            {actions && <th className="generic-table-header">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={Object.keys(headers).length + (actions ? 1 : 0)}>
                Nenhum registro encontrado.
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {Object.keys(headers).map((key, colIndex) => (
                  <td key={colIndex}>{item[key]}</td>
                ))}
                {actions && <td>{actions(item)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GenericTable;
