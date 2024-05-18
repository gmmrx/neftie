import ListEggs from "./view";

export const fetchCache = "force-no-store";

export default async function EggsPage() {
  return (
    <div className="h-[100vh] p-4">
      <ListEggs />
    </div>
  );
}
