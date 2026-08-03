import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
    data: {
        name: string;
        value: number;
    }[];
}

const COLORS = ["#2563eb", "#22c55e"];

export default function OccupancyPieChart({ data }: Props) {
    return (
        <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold mb-4">Parking Occupancy</h2>

            <div className="h-72">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            outerRadius={95}
                            label
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}