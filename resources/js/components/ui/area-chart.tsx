"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartAreaProps {
    data?: { date: string; posts: number; likes: number }[];
}

const chartConfig = {
    posts: {
        label: "Posts",
        color: "hsl(var(--chart-1))",
    },
    likes: {
        label: "Likes",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function ChartArea({ data = [] }: ChartAreaProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Activity Trend</CardTitle>
                <CardDescription>
                    Posts and Likes in the last 7 days
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="likes"
                            type="natural"
                            fill="var(--color-likes)"
                            fillOpacity={0.4}
                            stroke="var(--color-likes)"
                            stackId="a"
                        />
                        <Area
                            dataKey="posts"
                            type="natural"
                            fill="var(--color-posts)"
                            fillOpacity={0.4}
                            stroke="var(--color-posts)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex items-start w-full gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Last 7 days activity{" "}
                            <TrendingUp className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
