import { FleetShowroom } from './FleetShowroom';

/**
 * The showroom renders on the server. Only its WebGL layer is deferred, and
 * that boundary lives inside FleetShowroom itself.
 *
 * This file used to wrap the whole showroom in `dynamic(..., { ssr: false })`,
 * which kept the panel, the controls and every aircraft name out of the server
 * response entirely. That was found by grepping the built HTML, not by any
 * automated gate.
 */
export function FleetShowroomMount() {
  return <FleetShowroom />;
}
