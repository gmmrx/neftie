import ListNefties from "./view";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function NeftiesPage() {
  return (
    <div className=" p-4">
      <ListNefties />
    </div>
  );
}
