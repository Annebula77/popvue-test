'use client';
import { useState } from "react";
import FileUploader from "./components/FileUploader/FileUploader";
import DataTable from "./components/DataTable/DataTable";
import { type StockData } from "./types/StockData";

export default function Home() {
  const [data, setData] = useState<StockData[]>([]);

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-500">Fulfillment Center Stock Data</h1>
      <FileUploader onDataParsed={setData} />
      {data.length > 0 && <DataTable data={data} />}
    </section>

  );
}
