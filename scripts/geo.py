"""Small geometry helpers shared by the build scripts (no third-party packages)."""


def polygons(geom):
    """A GeoJSON Polygon or MultiPolygon as a list of polygons (lists of rings)."""
    return [geom['coordinates']] if geom['type'] == 'Polygon' else geom['coordinates']


def _in_ring(x, y, ring):
    inside = False
    for i in range(len(ring)):
        x1, y1 = ring[i]
        x2, y2 = ring[i - 1]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1:
            inside = not inside
    return inside


def contains(geom, lng, lat):
    for poly in polygons(geom):
        if _in_ring(lng, lat, poly[0]) and not any(_in_ring(lng, lat, h) for h in poly[1:]):
            return True
    return False


def _ring_area(ring):
    return sum(ring[i - 1][0] * ring[i][1] - ring[i][0] * ring[i - 1][1] for i in range(len(ring))) / 2


def interior_point(geom):
    """A point guaranteed to be inside the shape: the centroid of its largest ring if that
    falls inside, otherwise the middle of the widest span on a horizontal line through it."""
    ring = max((p[0] for p in polygons(geom)), key=lambda r: abs(_ring_area(r)))
    a = _ring_area(ring)
    cx = sum((ring[i - 1][0] + ring[i][0]) * (ring[i - 1][0] * ring[i][1] - ring[i][0] * ring[i - 1][1]) for i in range(len(ring))) / (6 * a)
    cy = sum((ring[i - 1][1] + ring[i][1]) * (ring[i - 1][0] * ring[i][1] - ring[i][0] * ring[i - 1][1]) for i in range(len(ring))) / (6 * a)
    if contains(geom, cx, cy):
        return cx, cy
    xs = []
    for i in range(len(ring)):
        (x1, y1), (x2, y2) = ring[i - 1], ring[i]
        if (y1 > cy) != (y2 > cy):
            xs.append(x1 + (cy - y1) * (x2 - x1) / (y2 - y1))
    xs.sort()
    best = max(((xs[i], xs[i + 1]) for i in range(0, len(xs) - 1, 2)), key=lambda s: s[1] - s[0])
    return (best[0] + best[1]) / 2, cy


def rounded(geom, places=5):
    """Coordinates rounded to ~1 m, as [lng, lat] lists of rings."""
    return [[[[round(x, places), round(y, places)] for x, y in ring] for ring in poly] for poly in polygons(geom)]
