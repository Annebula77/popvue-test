"use client"
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../s/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../s/components/ui/chart";

interface StockChartProps {
  data: { center: string; quantity: number; fill: string }[];
  description?: string;
}

export function StockPieChart({ data, description }: StockChartProps) {
  const totalStock = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [data]);

  const chartConfig = data.reduce((config, item) => {
    config[item.center] = { label: item.center, color: item.fill };
    return config;
  }, {} as ChartConfig);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stock Distribution by Center</CardTitle>
        <CardDescription>{description || "Current stock distribution"}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="quantity"
              nameKey="center"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStock.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Stock
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="w-full flex-col gap-2 text-sm">
        <div className="flex justify-center gap-2 font-medium leading-none w-full">
          Showing total stock quantities for all centers
        </div>
      </CardFooter>
    </Card>
  );
}
