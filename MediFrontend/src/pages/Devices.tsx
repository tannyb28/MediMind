import { useDevices } from "../hooks/useDevices";

export default function Devices() {
  const { data, isLoading, error } = useDevices();
  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Error fetching devices</p>;

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2">
      {data.map((d: any) => (
        <div key={d.id} className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold">{d.name}</h2>
          <p>{d.care_instructions}</p>
        </div>
      ))}
    </div>
  );
}