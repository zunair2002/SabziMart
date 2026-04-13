"use client";
import { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  MapPin,
  User,
  Phone,
  Home,
  Search,
  CreditCard,
  Truck,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

function MapMover({ center }: { center: any }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 13);
  }, [center]);
  return null;
}

const CheckoutPage = () => {
  const { subtotal, dileveryfee, totalammount } = useSelector(
    (state: RootState) => state.cart,
  );
  const userData = useSelector((state: RootState) => state.user.userData);
  const [postion, setposition] = useState<[number, number] | null>(null);
  const [mounted, setMounted] = useState(false);

  const lastFetchedPos = useRef("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [payment, setpayment] = useState<"cod" | "online">("cod");

  const [fullinformation, setfullinformation] = useState({
    name: "",
    mobileno: "",
    city: "",
    state: "",
    zipcode: "",
    fulllocation: "",
  });

  // Client side check
  useEffect(() => {
    setMounted(true);
  }, []);

  // User data aur Initial Geolocation
  useEffect(() => {
    const data = (userData as any)?.user;
    if (data) {
      setfullinformation((prev) => ({
        ...prev,
        name: data.name || "",
        mobileno: data.mobile || "",
      }));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setposition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, [userData]);

  // Address Fetching Logic (Loop-Safe & Debounced)
  useEffect(() => {
    if (postion) {
      const lat = postion[0];
      const lon = postion[1];
      const currentKey = `${lat.toFixed(5)},${lon.toFixed(5)}`;

      if (lastFetchedPos.current === currentKey) return;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(async () => {
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
          );
          lastFetchedPos.current = currentKey;
          const a = res.data.address;
          if (a) {
            setfullinformation((prev) => ({
              ...prev,
              city: a.city || "",
              state: a.state || "",
              zipcode: a.postcode || "",
              fulllocation: res.data.display_name || "",
            }));
          }
        } catch (error) {
          console.error(error);
        }
      }, 1000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [postion]);

  const handlercurrentpos = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setposition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  };

  const customIcon = mounted
    ? new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      })
    : null;

  return (
    <div className="min-h-screen lg:h-screen p-2 md:p-6 font-sans lg:overflow-hidden flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <Link
            href="/user/cart"
            className="top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600 text-white text-sm font-bold shadow-lg hover:bg-orange-700 transition-all z-50 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:flex-1 lg:overflow-hidden mt-10">
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 lg:overflow-y-auto">
            <div className="flex items-center text-gray-900 font-bold text-lg border-b pb-3">
              <MapPin size={20} className="mr-2 text-orange-600" /> Delivery
              Address
            </div>

            <div className="space-y-3">
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  value={fullinformation.name || ""}
                  onChange={(e) =>
                    setfullinformation({
                      ...fullinformation,
                      name: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 border rounded-xl focus:outline-none focus:border-gray-700"
                  placeholder="Full Name"
                />
              </div>

              <div className="relative">
                <Phone
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  value={fullinformation.mobileno || ""}
                  onChange={(e) =>
                    setfullinformation({
                      ...fullinformation,
                      mobileno: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:border-gray-700"
                  placeholder="Mobile Number"
                />
              </div>

              <div className="relative">
                <Home
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={fullinformation.fulllocation || ""}
                  placeholder="Full Address"
                  onChange={(e) =>
                    setfullinformation({
                      ...fullinformation,
                      fulllocation: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:border-gray-700"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50 text-sm">
                  <input
                    type="text"
                    placeholder="city"
                    value={fullinformation.city || ""}
                    onChange={(e) =>
                      setfullinformation({
                        ...fullinformation,
                        city: e.target.value,
                      })
                    }
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50 text-sm">
                  <input
                    type="text"
                    placeholder="state"
                    value={fullinformation.state || ""}
                    onChange={(e) =>
                      setfullinformation({
                        ...fullinformation,
                        state: e.target.value,
                      })
                    }
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50 text-sm">
                  <input
                    type="text"
                    placeholder="zip"
                    value={fullinformation.zipcode || ""}
                    onChange={(e) =>
                      setfullinformation({
                        ...fullinformation,
                        zipcode: e.target.value,
                      })
                    }
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>
              <div className="relative w-full h-72 bg-gray-200 rounded-2xl overflow-hidden border border-gray-200 mt-5">
                {mounted && postion && (
                  <MapContainer
                    center={postion}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapMover center={postion} />
                    <Marker
                      draggable={true}
                      icon={customIcon!}
                      position={postion}
                      eventHandlers={{
                        dragend: (e) => {
                          const { lat, lng } = e.target.getLatLng();
                          setposition([lat, lng]);
                        },
                      }}
                    />
                  </MapContainer>
                )}

                <button
                  type="button"
                  onClick={handlercurrentpos}
                  className="absolute bottom-4 right-4 z-[1000] bg-white p-2 rounded-full shadow-lg active:scale-90 hover:scale-110 transition-all cursor-pointer"
                >
                  <Target size={22} className="text-orange-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col lg:h-[90%] h-auto pb-10 lg:pb-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center text-gray-800 font-bold text-base mb-4">
                  <CreditCard size={18} className="mr-2 text-orange-600" />{" "}
                  Payment Method
                </div>
                <div className="space-y-3 font-semibold">
                  <div className="space-y-3 font-semibold flex flex-col">
                    <button
                      type="button"
                      onClick={() => setpayment("online")}
                      className={`flex items-center p-3 border rounded-xl transition-all text-sm cursor-pointer w-full ${
                        payment === "online"
                          ? "border-orange-600 bg-orange-50 ring-1 ring-orange-600"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <CreditCard
                        className={`${payment === "online" ? "text-orange-600" : "text-gray-400"} mr-3`}
                        size={20}
                      />
                      <span
                        className={
                          payment === "online"
                            ? "text-orange-700"
                            : "text-gray-600"
                        }
                      >
                        Pay Online
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setpayment("cod")}
                      className={`flex items-center p-3 border rounded-xl transition-all text-sm cursor-pointer w-full ${
                        payment === "cod"
                          ? "border-orange-600 bg-orange-50 ring-1 ring-orange-600"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <Truck
                        className={`${payment === "cod" ? "text-orange-600" : "text-gray-400"} mr-3`}
                        size={20}
                      />
                      <span
                        className={
                          payment === "cod"
                            ? "text-orange-600"
                            : "text-gray-600"
                        }
                      >
                        Cash on Delivery
                      </span>
                    </button>
                  </div>
                  <div className="mt-8 border-t pt-6">
                    <div className="flex items-center text-gray-800 font-bold text-base mb-4">
                      <Search size={18} className="mr-2 text-orange-600" />{" "}
                      Order Summary
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-500 text-sm font-semibold">
                        <span>Subtotal</span>
                        <span className="text-gray-800">
                          {Number(subtotal).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-500 text-sm font-semibold">
                        <span>Delivery Fee</span>
                        <span className="text-green-600 font-bold italic text-xs bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                          {dileveryfee}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-400 text-xs font-medium italic">
                        <span>(Prices are inclusive of all taxes)</span>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-gray-900 font-bold text-base">
                          Grand Total
                        </span>
                        <span className="text-gray-900 text-2xl font-black">
                          {Number(totalammount).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-1 space-y-3 border-t pt-5">
                <button className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold mt-4 hover:bg-orange-700 transition-transform active:scale-95 shadow-md hover: cursor-pointer">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
