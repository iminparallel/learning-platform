// pages/index.js
import { useState } from "react";
import * as XLSX from "xlsx";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [currentRowIndex, setCurrentRowIndex] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Parse to array of arrays
      setRows(sheetData);
      setCurrentRowIndex(0); // Reset the row index
    };

    reader.readAsArrayBuffer(file);
  };

  const handleNextRow = async () => {
    if (currentRowIndex < rows.length - 1) {
      setCurrentRowIndex((prevIndex) => prevIndex + 1);
      const Project = String(rows[currentRowIndex][0]);
      const Assignment = rows[currentRowIndex][1];
      const Question = rows[currentRowIndex][2];
      const Answers = rows[currentRowIndex][3].split(",");
      const CorrectAnswer = rows[currentRowIndex][4];
      const res = await fetch("/api/loadQuestions", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          Project,
          Assignment,
          Question,
          Answers,
          CorrectAnswer,
        }),
      });
      console.log(res);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Next.js Excel Reader</h1>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />
      <div style={{ marginTop: "20px" }}>
        {rows.length > 0 ? (
          <div>
            <h2>Row {currentRowIndex + 1}:</h2>
            <pre>{JSON.stringify(rows[currentRowIndex], null, 2)}</pre>
            <button
              onClick={handleNextRow}
              disabled={currentRowIndex >= rows.length - 1}
            >
              Next Row
            </button>
          </div>
        ) : (
          <p>Upload an Excel file to start.</p>
        )}
      </div>
    </div>
  );
}
