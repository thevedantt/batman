"use client";

import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ value: number; name?: string }>
  label?: string;
};

const Tooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label ?? payload[0]?.name}</p>
      {payload.map((entry, index) => (
        <p key={index} className="chart-tooltip-value">
          {entry.value}
        </p>
      ))}
    </div>
  );
};

const redPalette = [
  "#c1121f",
  "rgba(193,18,31,0.85)",
  "rgba(193,18,31,0.65)",
  "rgba(193,18,31,0.5)",
  "rgba(193,18,31,0.35)",
];

export const EngineeringRadar = ({ data }: { data: { label: string; value: number }[] }) => (
  <ResponsiveContainer width="100%" height={240}>
    <RadarChart data={data} outerRadius={90}>
      <PolarGrid stroke="rgba(255,255,255,0.08)" />
      <PolarAngleAxis dataKey="label" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
      <Radar
        dataKey="value"
        stroke="#c1121f"
        fill="rgba(193,18,31,0.3)"
        fillOpacity={0.5}
      />
    </RadarChart>
  </ResponsiveContainer>
);

export const EngineeringRadarDots = ({
  data,
}: {
  data: { label: string; value: number }[];
}) => (
  <ResponsiveContainer width="100%" height={320}>
    <RadarChart data={data} outerRadius={110}>
      <PolarGrid stroke="rgba(255,255,255,0.08)" />
      <PolarAngleAxis dataKey="label" tick={{ fill: "#c7c7d2", fontSize: 12 }} />
      <Radar
        dataKey="value"
        stroke="#c1121f"
        fill="rgba(193,18,31,0.3)"
        fillOpacity={0.6}
        dot={{ r: 3, fillOpacity: 1, fill: "#c1121f" }}
      />
      <RechartsTooltip content={<Tooltip />} />
    </RadarChart>
  </ResponsiveContainer>
);

export const DomainPie = ({ data }: { data: { name: string; value: number }[] }) => (
  <ResponsiveContainer width="100%" height={240}>
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
        {data.map((_, index) => (
          <Cell key={index} fill={redPalette[index % redPalette.length]} />
        ))}
      </Pie>
      <RechartsTooltip content={<Tooltip />} />
    </PieChart>
  </ResponsiveContainer>
);

export const ProficiencyRadial = ({ value }: { value: number }) => (
  <ResponsiveContainer width="100%" height={240}>
    <RadialBarChart
      innerRadius="65%"
      outerRadius="90%"
      data={[{ name: "Proficiency", value }]}
      startAngle={90}
      endAngle={-270}
    >
      <RadialBar dataKey="value" cornerRadius={8} fill="#c1121f" />
      <RechartsTooltip content={<Tooltip />} />
    </RadialBarChart>
  </ResponsiveContainer>
);


export const CoreStackBar = ({
  data,
  height = 320,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
      <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
      <XAxis type="number" domain={[0, 100]} tick={{ fill: "#a1a1aa", fontSize: 10 }} />
      <YAxis
        type="category"
        dataKey="label"
        tick={{ fill: "#a1a1aa", fontSize: 10 }}
        width={90}
      />
      <RechartsTooltip content={<Tooltip />} />
      <Bar dataKey="value" fill="#c1121f" radius={[0, 6, 6, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const AiArea = ({ data }: { data: { label: string; value: number }[] }) => (
  <ResponsiveContainer width="100%" height={240}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="aiFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c1121f" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#c1121f" stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
      <XAxis dataKey="label" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
      <YAxis domain={[0, 100]} tick={{ fill: "#a1a1aa", fontSize: 10 }} />
      <RechartsTooltip content={<Tooltip />} />
      <Area
        type="monotone"
        dataKey="value"
        stroke="#c1121f"
        fill="url(#aiFill)"
        strokeWidth={2}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export const EvolutionLine = ({
  data,
}: {
  data: { year: string; frontend: number; backend: number; aiSystems: number }[];
}) => (
  <ResponsiveContainer width="100%" height={240}>
    <LineChart data={data}>
      <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
      <XAxis dataKey="year" tick={{ fill: "#a1a1aa", fontSize: 10 }} />
      <YAxis domain={[0, 100]} tick={{ fill: "#a1a1aa", fontSize: 10 }} />
      <RechartsTooltip content={<Tooltip />} />
      <Line type="monotone" dataKey="frontend" stroke="#c1121f" strokeWidth={2} />
      <Line type="monotone" dataKey="backend" stroke="rgba(193,18,31,0.65)" strokeWidth={2} />
      <Line type="monotone" dataKey="aiSystems" stroke="rgba(193,18,31,0.4)" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export const AiHorizontalBar = ({
  data,
}: {
  data: { name: string; value: number; fill: string }[];
}) => (
  <ResponsiveContainer width="100%" height={320}>
    <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
      <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
      <XAxis type="number" domain={[0, 100]} hide />
      <YAxis
        type="category"
        dataKey="name"
        tick={{ fill: "#a1a1aa", fontSize: 10 }}
        width={130}
      />
      <RechartsTooltip content={<Tooltip />} />
      <Bar dataKey="value" radius={[0, 6, 6, 0]}>
        {data.map((entry) => (
          <Cell key={entry.name} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);
