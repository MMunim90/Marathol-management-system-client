import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import logo from "../assets/logo-bg.png";

const marathonIcon = new L.Icon({
  iconUrl: logo,
  iconSize: [30, 35],
  iconAnchor: [15, 30],
  popupAnchor: [0, -25],
});

const MapMover = ({ target }) => {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.latitude, target.longitude], 13, {
        animate: true,
        duration: 2,
      });
    }
  }, [target, map]);
  return null;
};

const MarathonMap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [targetLocation, setTargetLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const marathonLocations = [
    {
      region: "Dhaka",
      district: "Gazipur",
      city: "Gazipur",
      covered_area: ["Tongi", "Kaliakair", "Sreepur"],
      status: "active",
      flowchart: "https://example.com/gazipur-flowchart.png",
      longitude: 90.4203,
      latitude: 23.9999,
    },
    {
      region: "Dhaka",
      district: "Dhaka",
      city: "Dhaka",
      covered_area: ["Uttara", "Dhanmondi", "Mirpur"],
      status: "active",
      flowchart: "https://example.com/dhaka.png",
      longitude: 90.4125,
      latitude: 23.8103,
    },
    {
      region: "Chittagong",
      district: "Cox's Bazar",
      city: "Cox's Bazar",
      covered_area: ["Laboni Beach", "Kolatoli"],
      status: "active",
      flowchart: "https://example.com/coxbazar.png",
      longitude: 91.9798,
      latitude: 21.4272,
    },
    {
      region: "Sylhet",
      district: "Sylhet",
      city: "Sylhet",
      covered_area: ["Zindabazar", "Ambarkhana"],
      status: "active",
      flowchart: "https://example.com/sylhet.png",
      longitude: 91.8687,
      latitude: 24.8949,
    },
    {
      region: "Khulna",
      district: "Khulna",
      city: "Khulna",
      covered_area: ["Sonadanga", "Daulatpur"],
      status: "active",
      flowchart: "https://example.com/khulna.png",
      longitude: 89.565,
      latitude: 22.8456,
    },
    {
      region: "Rajshahi",
      district: "Rajshahi",
      city: "Rajshahi",
      covered_area: ["Boalia", "Motihar"],
      status: "active",
      flowchart: "https://example.com/rajshahi.png",
      longitude: 88.6042,
      latitude: 24.3636,
    },
    {
      region: "Barisal",
      district: "Barisal",
      city: "Barisal",
      covered_area: ["Nobogram", "Rupatoli"],
      status: "active",
      flowchart: "https://example.com/barisal.png",
      longitude: 90.3667,
      latitude: 22.7,
    },
    {
      region: "Rangpur",
      district: "Rangpur",
      city: "Rangpur",
      covered_area: ["Modern", "Carmichael"],
      status: "active",
      flowchart: "https://example.com/rangpur.png",
      longitude: 89.2752,
      latitude: 25.7439,
    },
    {
      region: "Mymensingh",
      district: "Mymensingh",
      city: "Mymensingh",
      covered_area: ["Town Hall", "Kachijhuli"],
      status: "active",
      flowchart: "https://example.com/mymensingh.png",
      longitude: 90.4073,
      latitude: 24.7471,
    },
    {
      region: "Comilla",
      district: "Comilla",
      city: "Comilla",
      covered_area: ["Kandirpar", "Kotbari"],
      status: "active",
      flowchart: "https://example.com/comilla.png",
      longitude: 91.1789,
      latitude: 23.4607,
    },
    {
      region: "Narayanganj",
      district: "Narayanganj",
      city: "Narayanganj",
      covered_area: ["Fatullah", "Siddhirganj"],
      status: "active",
      flowchart: "https://example.com/narayanganj.png",
      longitude: 90.498,
      latitude: 23.6238,
    },
    {
      region: "Jessore",
      district: "Jessore",
      city: "Jessore",
      covered_area: ["Monihar", "Ghop"],
      status: "active",
      flowchart: "https://example.com/jessore.png",
      longitude: 89.2167,
      latitude: 23.1667,
    },
    {
      region: "Bogura",
      district: "Bogura",
      city: "Bogura",
      covered_area: ["Shatmatha", "Rajapur"],
      status: "active",
      flowchart: "https://example.com/bogura.png",
      longitude: 89.37,
      latitude: 24.85,
    },
    {
      region: "Tangail",
      district: "Tangail",
      city: "Tangail",
      covered_area: ["Korotia", "Elenga"],
      status: "active",
      flowchart: "https://example.com/tangail.png",
      longitude: 89.92,
      latitude: 24.25,
    },
    {
      region: "Faridpur",
      district: "Faridpur",
      city: "Faridpur",
      covered_area: ["Goalchamot", "Rajbari Road"],
      status: "active",
      flowchart: "https://example.com/faridpur.png",
      longitude: 89.84,
      latitude: 23.6,
    },
    {
      region: "Kushtia",
      district: "Kushtia",
      city: "Kushtia",
      covered_area: ["Majampur", "Chourhash"],
      status: "active",
      flowchart: "https://example.com/kushtia.png",
      longitude: 89.1233,
      latitude: 23.9013,
    },
    {
      region: "Pabna",
      district: "Pabna",
      city: "Pabna",
      covered_area: ["Ishwardi", "Edward College"],
      status: "active",
      flowchart: "https://example.com/pabna.png",
      longitude: 89.2333,
      latitude: 24.0,
    },
    {
      region: "Noakhali",
      district: "Noakhali",
      city: "Noakhali",
      covered_area: ["Maijdee", "Begumganj"],
      status: "active",
      flowchart: "https://example.com/noakhali.png",
      longitude: 91.1,
      latitude: 22.8333,
    },
    {
      region: "Feni",
      district: "Feni",
      city: "Feni",
      covered_area: ["Mohipal", "Trunk Road"],
      status: "active",
      flowchart: "https://example.com/feni.png",
      longitude: 91.4167,
      latitude: 23.0167,
    },
    {
      region: "Dinajpur",
      district: "Dinajpur",
      city: "Dinajpur",
      covered_area: ["Kotchandpur", "Railway Bazar"],
      status: "active",
      flowchart: "https://example.com/dinajpur.png",
      longitude: 88.6333,
      latitude: 25.6333,
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = marathonLocations.filter((loc) =>
      loc.district.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(value ? filtered.slice(0, 5) : []);
  };

  const handleSelect = (district) => {
    const found = marathonLocations.find(
      (loc) => loc.district.toLowerCase() === district.toLowerCase()
    );
    if (found) {
      setTargetLocation(found);
      setSearchTerm(found.district);
      setSuggestions([]);
    }
  };

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl md:text-5xl font-bold mb-6  text-center">
        Marathon Locations Across Bangladesh
      </h1>

      <div className="max-w-md mx-auto mb-6 relative z-[1000]">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search district..."
          className="w-full border border-gray-400 rounded-full px-4 py-2 focus:outline-none"
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white text-black w-full border border-gray-200 mt-2 rounded-lg shadow-lg z-[1001]">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSelect(s.district)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {s.district}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="h-[600px] rounded-lg shadow-lg overflow-hidden">
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={7}
        scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {marathonLocations.map((loc, i) => (
            <Marker
              key={i}
              position={[loc.latitude, loc.longitude]}
              icon={marathonIcon}
            >
              <Popup>
                <strong>{loc.district}</strong>
                <br />
                {loc.covered_area.join(", ")}
                <br />
                <a
                  href={loc.flowchart}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  View Route
                </a>
              </Popup>
            </Marker>
          ))}
          <MapMover target={targetLocation} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MarathonMap;
