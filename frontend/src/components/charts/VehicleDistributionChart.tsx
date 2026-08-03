import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: {
        type: string;
        count: number;
    }[];
}

export default function VehicleDistributionChart({ data }: Props) {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-lg font-semibold mb-4">
                Vehicle Distribution
            </h2>

            <div className="h-72">

                <ResponsiveContainer>

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="type"/>

                        <YAxis/>

                        <Tooltip/>

                        <Bar
                            dataKey="count"
                            fill="#2563eb"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );
}