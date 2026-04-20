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
    <div className="min-h-screen font-sans py-7 px-4 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6">
          <Link
            href="/user/cart"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0d4e46] text-white text-[13px] font-bold shadow-md hover:bg-[#083631] transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>
        </div>

        <div className="mb-7">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-none uppercase">
            Order <span className="text-[#0d4e46]">Checkout</span>
          </h1>
          <p className="text-gray-400 text-xs mt-1 font-medium uppercase tracking-tighter">
            Enter delivery and payment details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] shadow-xl border border-white p-6 md:p-8">
            <div className="flex items-center gap-2 text-base font-black text-gray-800 uppercase tracking-tighter mb-6 border-b border-gray-50 pb-3">
              <MapPin size={18} className="text-[#0d4e46]" />
              Delivery{" "}
              <span className="text-gray-400 font-bold ml-1">Information</span>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700"
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
                    className="w-full pl-11 pr-4 py-2.5 text-xs font-bold border border-gray-50 rounded-2xl focus:outline-none focus:border-[#0d4e46] bg-gray-200"
                    placeholder="Recipient Name"
                  />
                </div>

                <div className="relative">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700"
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
                    className="w-full pl-11 pr-4 py-2.5 text-xs font-bold border border-gray-50 rounded-2xl focus:outline-none focus:border-[#0d4e46] bg-gray-200"
                    placeholder="Contact Number"
                  />
                </div>
              </div>

              <div className="relative">
                <Home
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700"
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
                  className="w-full pl-11 pr-4 py-2.5 text-xs font-bold border border-gray-50 rounded-2xl focus:outline-none focus:border-[#0d4e46] bg-gray-200"
                  placeholder="Street Address / Landmark"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
                    size={14}
                  />
                  <input
                    value={fullinformation.city || ""}
                    onChange={(e) =>
                      setfullinformation({
                        ...fullinformation,
                        city: e.target.value,
                      })
                    }
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-bold border border-gray-50 rounded-2xl bg-gray-200"
                    placeholder="City"
                  />
                </div>

                <div className="relative">
                  <Map
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
                    size={14}
                  />
                  <input
                    value={fullinformation.state || ""}
                    onChange={(e) =>
                      setfullinformation({
                        ...fullinformation,
                        state: e.target.value,
                      })
                    }
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-bold border border-gray-50 rounded-2xl bg-gray-200"
                    placeholder="State"
                  />
                </div>

                <div className="relative">
                  <Hash
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
                    size={14}
                  />
                  <input
                    value={fullinformation.zipcode || ""}
                    onChange={(e) =>
                      setfullinformation({
                        ...fullinformation,
                        zipcode: e.target.value,
                      })
                    }
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-bold border border-gray-50 rounded-2xl bg-gray-200"
                    placeholder="Zip"
                  />
                </div>
              </div>
              <div className="relative w-full h-48 md:h-56 bg-[#F1F3F4] rounded-[2rem] overflow-hidden border border-gray-50 mt-1">
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
                  className="absolute bottom-4 right-4 z-[1000] bg-white p-3 rounded-2xl text-[#0d4e46] shadow-md hover:bg-[#0d4e46] hover:text-white transition-all active:scale-90"
                >
                  <Target size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
  <div className="bg-white rounded-[2.5rem] shadow-xl border border-white p-6 md:p-7">
    
    <h2 className="text-lg font-black text-[#0d4e46] uppercase tracking-tighter mb-5">
      Order <span className="text-gray-400 font-bold">Summary</span>
    </h2>

    <div className="space-y-3">
      <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
        <span>Subtotal</span>
        <span className="text-gray-800">
          Rs {Number(subtotal).toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
        <span>Delivery Fee</span>
        <span className="text-[#147a44]">Rs {dileveryfee}</span>
      </div>
      <div className="pt-3 space-y-2">
        <button
          onClick={() => setpayment("online")}
          className={`flex items-center w-full p-3 rounded-xl border-2 transition-all ${
            payment === "online"
              ? "border-[#0d4e46] bg-gray-50"
              : "border-gray-100"
          }`}
        >
          <CreditCard
            size={16}
            className={
              payment === "online" ? "text-[#0d4e46]" : "text-gray-300"
            }
          />
          <span
            className={`ml-3 text-[10px] font-black uppercase ${
              payment === "online"
                ? "text-[#0d4e46]"
                : "text-gray-400"
            }`}
          >
            Online Payment
          </span>
        </button>

        <button
          onClick={() => setpayment("cod")}
          className={`flex items-center w-full p-3 rounded-xl border-2 transition-all ${
            payment === "cod"
              ? "border-[#0d4e46] bg-gray-50"
              : "border-gray-100"
          }`}
        >
          <Truck
            size={16}
            className={
              payment === "cod" ? "text-[#0d4e46]" : "text-gray-300"
            }
          />
          <span
            className={`ml-3 text-[10px] font-black uppercase ${
              payment === "cod"
                ? "text-[#0d4e46]"
                : "text-gray-400"
            }`}
          >
            Cash on Delivery
          </span>
        </button>
      </div>

      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-gray-900">
            {totalammount}
          </span>
          <span className="text-xs font-black text-gray-900 uppercase">
            RS
          </span>
        </div>
      </div>
    </div>

    <button
      disabled={!payment}
      onClick={() => {
        if (payment === "cod") handlecod();
        if (payment === "online") handleonline();
      }}
      className={`flex items-center justify-center w-full mt-6 py-3 rounded-2xl font-black text-sm shadow-md transition-all active:scale-95 ${
        payment
          ? "bg-[#0d4e46] text-white hover:bg-[#083631]"
          : "bg-gray-100 text-gray-300 cursor-not-allowed"
      }`}
    >
      Place Order Now
    </button>

  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
