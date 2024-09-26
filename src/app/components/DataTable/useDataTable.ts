import { useState, useMemo } from "react";
import { type StockData } from "src/app/types/StockData";

function useStockData(data: StockData[]) {
  const [sortField, setSortField] = useState<keyof StockData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortField) return 0;
      const fieldA = a[sortField] as string | number | null;
      const fieldB = b[sortField] as string | number | null;

      if (fieldA === null || fieldB === null) return 0;

      if (sortOrder === "asc") {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });
  }, [data, sortField, sortOrder]);

  const handleSort = (field: keyof StockData) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getStockDataForChart = useMemo(() => {
    const totalQuantitiesByCenter: { [center: string]: number } = {};

    data.forEach((item) => {
      if (!item.fulfillmentCenter) return;
      totalQuantitiesByCenter[item.fulfillmentCenter] =
        (totalQuantitiesByCenter[item.fulfillmentCenter] || 0) + (item.quantity || 0);
    });

    return [
      { center: "fc1", quantity: totalQuantitiesByCenter["fc1"] || 0, fill: "rgb(255, 0, 0)" },
      { center: "fc2", quantity: totalQuantitiesByCenter["fc2"] || 0, fill: "rgb(0, 255, 0)" },
      { center: "fc3", quantity: totalQuantitiesByCenter["fc3"] || 0, fill: "rgb(0, 0, 255)" },
      { center: "fc4", quantity: totalQuantitiesByCenter["fc4"] || 0, fill: "rgb(200, 0, 255)" },
      { center: "fc5", quantity: totalQuantitiesByCenter["fc5"] || 0, fill: "rgb(140, 130, 255)" },
    ];
  }, [data]);

  const getCenterColor = (center: string) => {
    const stockItem = getStockDataForChart.find((item) => item.center === center);
    return stockItem ? stockItem.fill : "transparent";
  };


  const getStatusData = useMemo(() => {
    const statusCounts: { [key: string]: number } = data.reduce((acc, item) => {
      if (item.status) {
        acc[item.status] = (acc[item.status] || 0) + (item.quantity || 0);
      }
      return acc;
    }, {} as { [key: string]: number });

    return [
      { status: "Sellable", count: statusCounts["Sellable"] || 0, fill: "rgb(0, 255, 0)" },
      { status: "Unfulfillable", count: statusCounts["Unfulfillable"] || 0, fill: "rgb(255, 0, 0)" },
      { status: "Inbound", count: statusCounts["Inbound"] || 0, fill: "rgb(0, 0, 255)" },
    ];
  }, [data]);

  const totalValue = useMemo(
    () => data.reduce((acc, item) => acc + (item.value || 0), 0),
    [data]
  );

  const totalQuantity = useMemo(
    () => data.reduce((acc, item) => acc + (item.quantity || 0), 0),
    [data]
  );

  const averagePrice = totalQuantity ? (totalValue / totalQuantity).toFixed(2) : 0;


  return {
    sortedData,
    handleSort,
    getStockDataForChart,
    getStatusData,
    totalValue,
    totalQuantity,
    averagePrice,
    getCenterColor
  };
}

export default useStockData;
