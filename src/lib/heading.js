// utils/headingUtils.js
export const getHeading = (prev, curr) => {
    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLon = toRad(curr.lng - prev.lng);
    const y = Math.sin(dLon) * Math.cos(toRad(curr.lat));
    const x =
        Math.cos(toRad(prev.lat)) * Math.sin(toRad(curr.lat)) -
        Math.sin(toRad(prev.lat)) * Math.cos(toRad(curr.lat)) * Math.cos(dLon);

    let brng = Math.atan2(y, x);
    brng = (brng * 180) / Math.PI;
    return (brng + 360) % 360;
};
