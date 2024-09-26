"use client"

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../s/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../s/components/ui/chart";
import { statusChartConfig } from "src/app/utils/statusChartConfig";

interface StatusBarChartProps {
  data: {
    status: string;
    count: number;
    fill: string;
  }[];
}

export function StatusBarChart({ data }: StatusBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Status Bar Chart</CardTitle>
        <CardDescription className="text-center">Showing the distribution of statuses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={statusChartConfig} className="w-full h-[300px]">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              strokeWidth={2}
              radius={8}
              activeIndex={1}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Distribution of product statuses for recent data
        </div>
      </CardFooter>
    </Card>
  );
}