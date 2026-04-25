"use client";
import { useEffect, useState } from "react";
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
  Map,
  Hash,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useMap } from "react-leaflet";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);

function MapMover({ center }: { center: any }) {
  const map = useMap();
  useEffect(() => {
    if (center && map) map.setView(center, 13);
  }, [center, map]);
  return null;
}

const CheckoutPage = () => {
  const { subtotal, dileveryfee, totalammount, cartdata } = useSelector(
    (state: RootState) => state.cart,
  );
  const userData = useSelector((state: RootState) => state.user.userData);
  const [postion, setposition] = useState<[number, number] | null>(null);
  const [mounted, setMounted] = useState(false);
  const [payment, setpayment] = useState<"cod" | "online">("cod");

  const [fullinformation, setfullinformation] = useState({
    name: "",
    mobileno: "",
    city: "",
    state: "",
    zipcode: "",
    fulllocation: "",
  });

  const handlercurrentpos = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setposition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  };

  useEffect(() => {
    setMounted(true);
    const data = (userData as any)?.user;
    if (data) {
      setfullinformation((prev) => ({
        ...prev,
        name: data.name || "",
        mobileno: data.mobile || "",
      }));
    }
    handlercurrentpos();
  }, [userData]);

  useEffect(() => {
    if (!postion) return;
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${postion[0]}&lon=${postion[1]}&format=json`,
        );
        const a = res.data.address;
        if (a) {
          setfullinformation((prev) => ({
            ...prev,
            city: a.city || a.town || "",
            state: a.state || "",
            zipcode: a.postcode || "",
            fulllocation: res.data.display_name || "",
          }));
        }
      } catch (error) {
        console.error(error);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [postion]);

  const handlecod = async () => {
    if (!postion) return;
    try {
      await axios.post("/api/user/order", {
        userid: (userData as any)?.user?._id,
        items: cartdata.map((item: any) => ({
          gerocery: item._id,
          name: item.name,
          category: item.category,
          price: String(item.price),
          unit: item.unit,
          image: item.image,
          quantity: item.quantity,
        })),
        paymentmethod: payment,
        totalammount: totalammount,
        adress: {
          ...fullinformation,
          latitude: postion[0],
          longitude: postion[1],
        },
      });
      window.location.replace("/user/ordersuccess");
    } catch (error) {
      console.log("frontend sy COD error: ", error);
    }
  };
  const handleonline = async () => {
    if (!postion) return;
    try {
      const result = await axios.post("/api/user/online", {
        userid: (userData as any)?.user?._id,
        items: cartdata.map((item: any) => ({
          gerocery: item._id,
          name: item.name,
          category: item.category,
          price: String(item.price),
          unit: item.unit,
          image: item.image,
          quantity: item.quantity,
        })),
        paymentmethod: payment,
        totalammount: totalammount,
        adress: {
          ...fullinformation,
          latitude: postion[0],
          longitude: postion[1],
        },
      });
      window.location.href = result.data.url;
    } catch (error) {
      console.log("frontend sy Online error: ", error);
    }
  };

  let L: any;
  if (typeof window !== "undefined") {
    L = require("leaflet");
  }

  const customIcon =
    mounted && typeof window !== "undefined"
      ? new L.Icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        })
      : null;

  return (
    <div className="min-h-screen bg-white font-sans py-6 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6">
          <Link
            href="/user/cart"
            className="flex items-center gap-1 py-2.5 text-gray-900 text-sm font-bold hover:text-gray-600 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">
            My Order<span className="text-yellow-500"> Checkout</span>
          </h1>
          <p className="text-gray-500 font-sm mt-1">
            shipping and payment details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-xl border border-gray-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
                  <MapPin size={18} />
                </div>
                <h2 className="text-base font-black text-gray-900 uppercase">
                  Shipping Information
                </h2>
              </div>

              <div className="space-y-3.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="relative group">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-yellow-500 transition-colors"
                      size={14}
                    />
                    <input
                      value={fullinformation.name || ""}
                      onChange={(e) =>
                        setfullinformation({
                          ...fullinformation,
                          name: e.target.value,
                        })
                      }
                      className="w-full pl-11 pr-4 py-3.5 text-xs font-bold bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                      placeholder="Recipient Name"
                    />
                  </div>

                  <div className="relative group">
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-yellow-500 transition-colors"
                      size={14}
                    />
                    <input
                      value={fullinformation.mobileno || ""}
                      onChange={(e) =>
                        setfullinformation({
                          ...fullinformation,
                          mobileno: e.target.value,
                        })
                      }
                      className="w-full pl-11 pr-4 py-3.5 text-xs font-bold bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <Home
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-yellow-500 transition-colors"
                    size={14}
                  />
                  <input
                    value={fullinformation.fulllocation || ""}
                    onChange={(e) =>
                      setfullinformation({
                        ...fullinformation,
                        fulllocation: e.target.value,
                      })
                    }
                    className="w-full pl-11 pr-4 py-3.5 text-xs font-bold bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                    placeholder="Delivery Address"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <input
                    value={fullinformation.city || ""}
                    onChange={(e) =>
                      setfullinformation({
                        ...fullinformation,
                        city: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3.5 text-xs font-bold bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="City"
                  />
                  <input
                    value={fullinformation.state || ""}
                    onChange={(e) =>
                      setfullinformation({
                        ...fullinformation,
                        state: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3.5 text-xs font-bold bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="State"
                  />
                  <input
                    value={fullinformation.zipcode || ""}
                    onChange={(e) =>
                      setfullinformation({
                        ...fullinformation,
                        zipcode: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3.5 text-xs font-bold bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="Zip"
                  />
                </div>

                <div className="relative w-full h-56 bg-gray-100 rounded-[20px] overflow-hidden border-2 border-white mt-2">
                  {mounted && postion && (
                    <MapContainer
                      center={postion}
                      zoom={13}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <MapMover center={postion} />
                      {customIcon && (
                        <Marker
                          draggable
                          icon={customIcon}
                          position={postion}
                          eventHandlers={{
                            dragend: (e) =>
                              setposition([
                                e.target.getLatLng().lat,
                                e.target.getLatLng().lng,
                              ]),
                          }}
                        />
                      )}
                    </MapContainer>
                  )}
                  <button
                    type="button"
                    onClick={handlercurrentpos}
                    className="absolute bottom-4 right-4 z-[1000] bg-yellow-500 text-white p-3 rounded-xl shadow-lg hover:bg-yellow-400 transition-all active:scale-90"
                  >
                    <Target size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-xl border border-gray-300">
              <h4 className="text-[18px] font-bold text-gray-800 tracking-tight mb-4">
                Payment Selection
              </h4>
              <div className="space-y-3">
                <button
                  onClick={() => setpayment("online")}
                  className={`flex items-center w-full p-4 rounded-xl border-2 transition-all ${
                    payment === "online"
                      ? "border-gray-300 bg-gray-300"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <CreditCard
                    size={18}
                    className={
                      payment === "online" ? "text-gray-900" : "text-gray-500"
                    }
                  />
                  <div className="ml-4 text-left">
                    <p
                      className={`text-[10px] font-black uppercase tracking-wider ${
                        payment === "online" ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      Card / Online
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setpayment("cod")}
                  className={`flex items-center w-full p-4 rounded-xl border-2 transition-all ${
                    payment === "cod"
                      ? "border-gray-300 bg-gray-300"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <Truck
                    size={18}
                    className={
                      payment === "cod" ? "text-gray-900" : "text-gray-500"
                    }
                  />
                  <div className="ml-4 text-left">
                    <p
                      className={`text-[10px] font-black uppercase tracking-wider ${
                        payment === "cod" ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      Cash on Delivery
                    </p>
                  </div>
                </button>
              </div>

              <div className="mt-8 space-y-3 pt-6 border-t border-gray-50">
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-gray-800">Rs {subtotal}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>Shipping</span>
                  <span className="text-gray-800">Rs {dileveryfee}</span>
                </div>
                <div className="flex justify-between items-baseline pt-4">
                  <span className="text-xs font-black text-gray-900 uppercase">
                    Total
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-gray-900 tracking-tighter">
                      {totalammount}
                    </span>
                    <span className="text-[10px] font-black text-yellow-500 uppercase">
                      pkr
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={!payment}
                onClick={() =>
                  payment === "cod" ? handlecod() : handleonline()
                }
                className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm hover:bg-gray-600 transition-all active:scale-[0.98] transition-all active:scale-[0.98] mt-6 ${
                  payment
                    ? "bg-gray-900 text-white hover:bg-black"
                    : "bg-gray-100 text-gray-300 cursor-not-allowed"
                }`}
              >
                Confirm Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
