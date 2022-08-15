import WorldIcon from "./world-icon";

function MapLoadingHolder({ className = "" }: {className?: string}) {
  return (
    <div className="loading-holder">
      <WorldIcon className="icon" />
      <h1>Initializing the map</h1>
    </div>
  );
}

export default MapLoadingHolder;