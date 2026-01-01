"use client";

import { Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

interface ChartBarProps {
    data?: { name: string; posts: number }[];
}

const chartConfig = {
    posts: {
        label: "Posts",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export function ChartBar({ data = [] }: ChartBarProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Users</CardTitle>
                <CardDescription>Users with most posts</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={data} layout="vertical">
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            width={80}
                        />
                        <XAxis type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="posts"
                            fill="var(--color-posts)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    <Users className="w-4 h-4" /> Top 5 most active users
                </div>
            </CardFooter>
        </Card>
    );
}
