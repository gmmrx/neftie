import AdminHome from "./view";

export const fetchCache = "force-no-store";

export default async function Page() {
  return (
    <div className="h-[100vh] p-4">
      <AdminHome />
    </div>
  );
}
