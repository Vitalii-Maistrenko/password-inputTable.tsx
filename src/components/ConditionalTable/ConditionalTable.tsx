import React, { useEffect, useState } from "react";
import "./ConditionalTable.css";

import { DataItem } from "../types";

const ConditionalTable: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    fetch("https://technical-task-api.icapgroupgmbh.com/api/table/")
      .then((res) => res.json())
      .then(({ results }: { results: DataItem[] }) => {
        const modifiedResults = results.map((item: DataItem) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          phone_number: item.phone_number,
          address: item.address,
        }));
        setData(modifiedResults);
      })
      .catch((error) => {
        console.error("Помилка отримання даних:", error);
      });
  }, []);

  const handleEditAndSave = (id: number, field: string, value: string) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(updatedData);

    const updatedItem = updatedData.find((item) => item.id === id);
    if (updatedItem) {
      const requestData = {
        id: updatedItem.id,
        name: updatedItem.name,
        email: updatedItem.email,
        phone_number: updatedItem.phone_number,
        address: updatedItem.address,
      };

      fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Збережено дані:", data);
        })
        .catch((error) => {
          console.error("Помилка збереження даних:", error);
        });
    }
  };

  const renderEditableCell = (item: DataItem, field: string) => (
    <td
      contentEditable
      onBlur={(e) => {
        const value = e.target.textContent;
        if (value) {
          handleEditAndSave(item.id, field, value);
        }
      }}
    >
      {item[field]}
    </td>
  );

  return (
    <div className="section">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {renderEditableCell(item, "name")}
              {renderEditableCell(item, "email")}
              {renderEditableCell(item, "phone_number")}
              {renderEditableCell(item, "address")}
              <td>
                <button className="button" onClick={() => handleEditAndSave(item.id, "name", item.name)}>Зберегти</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConditionalTable;





