import axios from "axios";

export async function getServerSideProps({ req }: { req: any }) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

  let isFromIndia = false;

  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const data = response.data;

    if (data.country === "IN") {
      isFromIndia = true;
    }
  } catch (error) {
    console.error("Error fetching IP geolocation:", error);
  }

  return {
    props: {
      ip,
      isFromIndia,
    },
  };
}

export default function Home({ ip, isFromIndia }: any) {
  return (
    <div>
      <p>Your IP address is: {ip}</p>
      <p>{isFromIndia ? "You are from India!" : "You are not from India."}</p>
    </div>
  );
}
