import {
    LineChart,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

interface Props {
    data: {
        month: string;
        revenue: number;
    }[];
}

export default function RevenueLineChart({ data }: Props) {
    return (
        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-lg font-semibold mb-4">
                Revenue Trend
            </h2>

            <div className="h-72">

                <ResponsiveContainer>

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="month"/>

                        <YAxis/>

                        <Tooltip/>

                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#2563eb"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}