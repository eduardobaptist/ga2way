const Field = ({ label, value }) => (
  <div className="space-y-1.5">
    <div className="text-sm font-semibold text-gray-900">{label}</div>
    <div className="text-sm text-gray-600">{value}</div>
  </div>
);

export default Field;
