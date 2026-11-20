import L from 'leaflet';
// leaflet.markercluster is a UMD plugin that attaches to a global `L`.
(window as unknown as { L: typeof L }).L = L;
export default L;
