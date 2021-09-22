import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Avatar from "../assets/imagenull.jpg";
import { API,Path } from "../config/api";


function DetailJourney() {
  const { id } = useParams();
  const [journeys, setJourneys] = useState([]);

  const fetchJourneys = async () => {
    try {
      const response = await API("/journey/" + id);
      console.log("journey", response);
      setJourneys(response.data.data.journeys);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function createMarkup(e) {
    return {__html: e};
  }

  const date=new Date(journeys.createdAt)
 let desc=  journeys.description;
  return (
    <div style={{ marginTop: "25px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3 className="textHeader">{journeys.title}</h3>
        <h5 className="textHeader">{journeys.Users?.fullname}</h5>
      </div>
      <p style={{ color: "blue" }}>{date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</p>

      <center>
        <img
          src={Path+journeys.image}
          alt={"avatar"}
          style={{ width: "100%", height: "550px" }}
          className="img-product"
        />
      </center>
        <div dangerouslySetInnerHTML={ createMarkup(desc)} />
<br/><br/>
    </div>
  );
}

export default DetailJourney;
