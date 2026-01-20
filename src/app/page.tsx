import { auth } from "@/auth";
import connectDB from "@/config/db";
import User from "@/models/usermodel";
import { redirect } from "next/navigation";
import Roleselection from "./components/Roleselection";
import Navbar from "./components/Navbar";
import { json } from "stream/consumers";
import Userdashboard from "./components/Userdashboard";
import Admindashboard from "./components/Admindashboard";
import Riderdashboard from "./components/Riderdashboard";

async function Home() {
  await connectDB();
  const session = await auth();
  const user = await User.findById(session?.user.id);
  if (!user) {
    redirect("/login");
  }
  const incompleteinfo = !user.mobile || !user.role;
  if (incompleteinfo) {
    return <Roleselection />;
  }
  const plaintext = JSON.parse(JSON.stringify(user));
  console.log(plaintext);
  console.log(user);
  return (
    <>
      <Navbar user={plaintext} />
      {user.role === "user" ? (
        <Userdashboard />
      ) : user.role === "admin" ? (
        <Admindashboard />
      ) : (
        <Riderdashboard />
      )}
    </>
  );
}
export default Home;
