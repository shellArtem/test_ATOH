import { useState } from 'react';

export default function Status({ client }) {
  const [selectedStatus, setSelectedStatus] = useState(client.status);

  const statuses = ['Не в работе', 'В работе', 'Отказ', 'Сделка закрыта'];

  const handleStatusChange = async (clientId: number, newStatus: string) => {
    try {
      await fetch('http://localhost:3003/client', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, newStatus }),
        credentials: 'include',
      });
    } catch (error) {
      console.log('login error', error);
    }
  };

  return (
    <select
      value={selectedStatus}
      onChange={(e) => {
        setSelectedStatus(e.target.value);
        handleStatusChange(client.id, e.target.value);
      }}
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
