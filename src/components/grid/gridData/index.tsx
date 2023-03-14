import data from "./near-earth-asteroids.json";

interface IData {
  designation: string;
  discovery_date: Date;
  h_mag: number;
  moid_au: number;
  q_au_1: number;
  q_au_2: number;
  period_yr: number;
  i_deg: number;
  pha: string;
  orbit_class: string;
}

const formattingData = (data: any): IData[] => {
  return data.map((e: IData) => ({
    designation: e.designation,
    discovery_date: new Date(e.discovery_date).toLocaleDateString(["en-US"], {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    h_mag: Number(e.h_mag),
    moid_au: Number(e.moid_au),
    q_au_1: Number(e.q_au_1),
    q_au_2: Number(e.q_au_2),
    period_yr: Number(e.period_yr),
    i_deg: Number(e.i_deg),
    pha: e.pha === "Y" ? "Yes" : e.pha === "N" ? "No" : "",
    orbit_class: e.orbit_class,
  }));
};

const dataFormated = formattingData(data);

export default dataFormated;
