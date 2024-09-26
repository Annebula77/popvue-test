import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../../s/components/ui/table";
import { StockPieChart } from "../SortingCenterChart/SortingCenterChart";
import { StatusBarChart } from "../StatusChart/StatusChart";
import { type StockData } from "src/app/types/StockData";
import useStockData from "./useDataTable";

interface DataTableProps {
  data: StockData[];
}

function DataTable({ data }: DataTableProps) {
  const {
    sortedData,
    handleSort,
    getStockDataForChart,
    getStatusData,
    totalValue,
    totalQuantity,
    averagePrice,
    getCenterColor
  } = useStockData(data);

  const stockData = getStockDataForChart;
  const statusData = getStatusData;

  return (
    <section className="flex gap-4">
      <Table className="w-full">
        <TableCaption className="text-lg text-left font-semibold text-slate-500 my-12">
          List of Stock data
        </TableCaption>
        <TableHeader>
          <TableRow className="border-4 border-slate-400 text-lg text-left font-bold text-slate-700">
            <TableHead
              className="text-center border-r-2 border-slate-400 cursor-pointer"
              onClick={() => handleSort("product")}
            >
              Product
            </TableHead>
            <TableHead className="text-center border-r-2 border-slate-400">Status</TableHead>
            <TableHead
              className="text-center border-r-2 border-slate-400 cursor-pointer"
              onClick={() => handleSort("fulfillmentCenter")}
            >
              Fulfillment Center
            </TableHead>
            <TableHead className="text-center border-r-2 border-slate-400">Quantity</TableHead>
            <TableHead className="text-center border-r-2 border-slate-400">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-4 border-slate-400">
          {sortedData.map((row, index) => (
            <TableRow key={index} className="p-2 border-2 border-slate-400">
              <TableCell className="text-center border-r-2 border-slate-400">{row.product}</TableCell>
              <TableCell className="text-center border-r-2 border-slate-400">{row.status}</TableCell>
              <TableCell
                className="text-center border-r-2 border-slate-400"
                style={{ backgroundColor: getCenterColor(row.fulfillmentCenter as string) }}
              >{row.fulfillmentCenter}</TableCell>
              <TableCell className="text-center border-r-2 border-slate-400">{row.quantity}</TableCell>
              <TableCell className="text-center border-r-2 border-slate-400">${row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="border-4 border-slate-400">
          <TableRow className="border-4 border-slate-400 text-lg text-left font-semibold text-slate-700">
            <TableCell colSpan={4} className="text-lg text-right font-semibold text-slate-800">
              Total Quantity:
            </TableCell>
            <TableCell className="text-lg text-right font-semibold text-slate-800">
              {totalQuantity} pax
            </TableCell>
          </TableRow>
          <TableRow className="border-4 border-slate-400 text-lg text-left font-semibold text-slate-700">
            <TableCell colSpan={4} className="text-lg text-right font-semibold text-slate-800">
              Total Value:
            </TableCell>
            <TableCell className="text-lg text-right font-semibold text-slate-800">
              ${totalValue.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow className="border-4 border-slate-400 text-lg text-left font-semibold text-slate-700">
            <TableCell colSpan={4} className="text-lg text-right font-semibold text-slate-800">
              Average Price per Item:
            </TableCell>
            <TableCell className="text-lg text-right font-semibold text-slate-800">
              ${averagePrice}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex w-1/2 flex-col gap-10 mt-24 h-min">
        <StockPieChart data={stockData} description="Current stock distribution" />
        <StatusBarChart data={statusData} />
      </div>
    </section>
  );
}

export default DataTable;