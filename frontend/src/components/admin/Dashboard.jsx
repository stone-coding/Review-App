import AppInfoBox from "../AppInfoBox";
import LatestUpLoads from "../LatestUpLoads";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      <AppInfoBox title="Total Uploads" subtitle="100" />
      <AppInfoBox title="Total Reviews" subtitle="1,500" />
      <AppInfoBox title="Total Users" subtitle="200" />

      <LatestUpLoads/>
    </div>
  );
}
