import { useState } from 'react';
import Papa from 'papaparse';
import ExcelJS from 'exceljs';
import { Input } from '../../../../s/components/ui/input';
import { Button } from '../../../../s/components/ui/button';
import { type StockData } from 'src/app/types/StockData';




interface FileUploaderProps {
  onDataParsed: (data: StockData[]) => void;
}

function FileUploader({ onDataParsed }: FileUploaderProps) {
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const fileExtension = file.name.split(".").pop();

    if (fileExtension === "csv") {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          onDataParsed(result.data as StockData[]);
        },
      });
    } else if (fileExtension === "xlsx") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result;
        if (!arrayBuffer) return;

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer as ArrayBuffer);

        const worksheet = workbook.worksheets[0];
        const data: StockData[] = [];

        worksheet.eachRow((row, rowIndex) => {
          if (rowIndex > 1) {
            data.push({
              product: row.getCell(1).value as string | null,
              status: row.getCell(2).value as string | null,
              fulfillmentCenter: row.getCell(3).value as string | null,
              quantity: row.getCell(4).value as number | null,
              value: row.getCell(5).value as number | null,
            });
          }
        });

        onDataParsed(data);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Unsupported file format. Please upload CSV or XLSX.");
    }
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  return (
    <div className="flex w-full justify-center gap-1.5 m-12">
      <Input
        id="fileInput"
        type="file"
        accept=".csv,.xlsx"
        onChange={handleFileUpload}
        className="hidden"
      />

      <Button
        onClick={handleButtonClick}
        className="w-1/2 px-12 h-12 rounded-lg bg-slate-500 text-white"
      >
        {fileName ? `Selected: ${fileName}` : "Press me to upload a file"}
      </Button>
    </div>
  );
}

export default FileUploader;