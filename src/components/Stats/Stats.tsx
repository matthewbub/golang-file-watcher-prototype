import { FC } from "react"
import { StatsProps } from "./Stats.types"

const fbStats = [
  { name: 'Number of deploys', value: '405' },
  { name: 'Average deploy time', value: '3.65', unit: 'mins' },
  { name: 'Number of failures', value: '3' },
  { name: 'Success rate', value: '98.5%' },
]

const Stats: FC<StatsProps> = ({ stats = fbStats, loading = true }) => {
  return (
    <div className="bg1">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4 divide-x divide-white/20">
          {stats && stats.length > 0 && stats.map((stat) => (
            <div key={stat.name} className="bg1 px-4 py-6 lg:pt-6 lg:pb-24 sm:px-6 lg:px-8">
              <p className="text-sm font-medium leading-6 txt2">{stat.name}</p>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight txt1" >{loading ? '-' : stat.value}</span>
                {stat.unit ? <span className="text-sm txt2">{!loading && stat.unit}</span> : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stats;
