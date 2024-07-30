import axios from "axios";

export async function getServerSideProps({ req }: { req: any }) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

  let isFromIndia = false;
  let countryName = "Unknown";
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const data = response.data;

    if (data.country_name) {
      countryName = data.country_name;
    }
    if (countryName === "India") {
      isFromIndia = true;
    }
  } catch (error) {
    console.error("Error fetching IP geolocation:", error);
  }

  return {
    props: {
      ip,
      isFromIndia,
      countryName,
    },
  };
}

export default function Home({ ip, isFromIndia, countryName }: any) {
  return (
    <div>
      <p>Your IP address is: {ip}</p>
      <p>Your country is: {countryName}</p>
      <p>{isFromIndia ? "You are from India!" : "You are not from India."}</p>
    </div>
  );
}
