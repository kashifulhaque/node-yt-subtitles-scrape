const fs = require("fs");
const path = require("path");
const axios = require("axios");
const youtubedl = require("youtube-dl-exec");

// const optimumTechVideo = "https://www.youtube.com/watch?v=5dhuxRF2c_w";
// const adUrls = [
//   "https://www.youtube.com/watch?v=qdPXQLrueRg",
//   "https://www.youtube.com/watch?v=nkmxG8pxmiQ",
//   "https://www.youtube.com/watch?v=h2caT4q4Nbs",
//   "https://www.youtube.com/watch?v=h4s0llOpKrU",
//   "https://www.youtube.com/watch?v=ZFb01yTR9bA",
//   "https://www.youtube.com/watch?v=zv750BWrUhY",
//   "https://www.youtube.com/watch?v=yZ1XM9LwS64",
//   "https://www.youtube.com/watch?v=ngRuqEhCE0k",
//   "https://www.youtube.com/watch?v=K9vFWA1rnWc",
//   "https://www.youtube.com/watch?v=yT7XYeGemUw",
//   "https://www.youtube.com/watch?v=lmtM7tZ6ZIY",
//   "https://www.youtube.com/watch?v=xygSmiQtbds",
//   "https://www.youtube.com/watch?v=_H_6jyxH4-Y",
//   "https://www.youtube.com/watch?v=IG5RpXHRn1Y",
//   "https://www.youtube.com/watch?v=6PMS1EyoeBI",
//   "https://www.youtube.com/watch?v=lVssXTYWuGw",
//   "https://www.youtube.com/watch?v=FWVECQjPvgs",
//   "https://www.youtube.com/watch?v=gRHsgpfCsW0",
//   "https://www.youtube.com/watch?v=lDi9uFcD7XI",
//   "https://www.youtube.com/watch?v=LJJJNxzBqhk",
//   "https://www.youtube.com/watch?v=HNV3jHdUpy8",
//   "https://www.youtube.com/watch?v=3wrQ7ixzP-c",
//   "https://www.youtube.com/watch?v=lyOZ_HdBPCM",
//   "https://www.youtube.com/watch?v=F7eaYa1Au1k",
//   "https://www.youtube.com/watch?v=kjqn_rzgMWs",
//   "https://www.youtube.com/watch?v=9sVxTFveRZw",
//   "https://www.youtube.com/watch?v=R2UyB5Z7jKk",
//   "https://www.youtube.com/watch?v=E466ti4okTA",
//   "https://www.youtube.com/watch?v=nxF-eXlNAPQ",
//   "https://www.youtube.com/watch?v=1hByG29fne0",
//   "https://www.youtube.com/watch?v=iUnlB6Ontfw",
//   "https://www.youtube.com/watch?v=xD0e33sv5WU",
//   "https://www.youtube.com/watch?v=IbDyB68QQGg",
//   "https://www.youtube.com/watch?v=Shshho7eC3o",
//   "https://www.youtube.com/watch?v=t-pExvOmhzY",
//   "https://www.youtube.com/watch?v=rFrWODRzVgY",
//   "https://www.youtube.com/watch?v=llAwwmaI_T8",
//   "https://www.youtube.com/watch?v=J0Dv6DE8JT0",
//   "https://www.youtube.com/watch?v=yRODqCQqBjw",
//   "https://www.youtube.com/watch?v=PT9FOHcnP3g",
//   "https://www.youtube.com/watch?v=jwLC8x_8mb8",
//   "https://www.youtube.com/watch?v=5OsIzOpX2lQ",
//   "https://www.youtube.com/watch?v=cz_q34URLM0",
//   "https://www.youtube.com/watch?v=rKi6FtbPcsQ",
//   "https://www.youtube.com/watch?v=5f558iOePUk",
//   "https://www.youtube.com/watch?v=DQdhCv-ELIg",
//   "https://www.youtube.com/watch?v=N1CRJAySsqA",
//   "https://www.youtube.com/watch?v=kWqG4ANTOyY",
//   "https://www.youtube.com/watch?v=1yCeXm6VtgA",
//   "https://www.youtube.com/watch?v=Qb5vugTMu0o",
//   "https://www.youtube.com/watch?v=f9WQizl8whw",
//   "https://www.youtube.com/watch?v=VNtNRtzXhjg",
//   "https://www.youtube.com/watch?v=733cq1_O6gM",
//   "https://www.youtube.com/watch?v=gav2VvZx-fA",
//   "https://www.youtube.com/watch?v=0Zn3doW8qwI",
//   "https://www.youtube.com/watch?v=npNBBrgYcRA",
//   "https://www.youtube.com/watch?v=Txuu_mZ_i1c",
//   "https://www.youtube.com/watch?v=U_lnIktCTY0",
//   "https://www.youtube.com/watch?v=JcEIyxj0A44",
//   "https://www.youtube.com/watch?v=UK8XsyXQnwg",
//   "https://www.youtube.com/watch?v=GRI9C_L9kOA",
//   "https://www.youtube.com/watch?v=oQiH47XvT4o",
//   "https://www.youtube.com/watch?v=9xZgSCZ-XTk",
//   "https://www.youtube.com/watch?v=ox28I7mvrGM",
//   "https://www.youtube.com/watch?v=b_T_IIJECIU",
//   "https://www.youtube.com/watch?v=mZ05GBYZJZM",
//   "https://www.youtube.com/watch?v=YB_EXXNZFbA",
//   "https://www.youtube.com/watch?v=4s8tcQaM-cA",
//   "https://www.youtube.com/watch?v=q4oVyGjInvc",
//   "https://www.youtube.com/watch?v=7VL0CP4BrtA",
//   "https://www.youtube.com/watch?v=7-qYaIQa_ao",
//   "https://www.youtube.com/watch?v=KkSwPQ2vbSk",
//   "https://www.youtube.com/watch?v=q3dUsAcKrUw",
//   "https://www.youtube.com/watch?v=2tV1maIR1jo",
//   "https://www.youtube.com/watch?v=pT_p4IQ8dD8",
//   "https://www.youtube.com/watch?v=1E9Weor9N9g",
//   "https://www.youtube.com/watch?v=U5an6kSkorQ",
//   "https://www.youtube.com/watch?v=BhYnz0JQKUo",
// ];
// const adUrls = [
// "https://www.youtube.com/watch?v=Axy7RI0NI8g",
// "https://www.youtube.com/watch?v=4b8LgBRinxU",
// "https://www.youtube.com/watch?v=FukUWMZN_T0",
// "https://www.youtube.com/watch?v=_DewjBSEsr8",
// "https://www.youtube.com/watch?v=U26BrwUMfdA",
// "https://www.youtube.com/watch?v=kGCV2O-n9V8",
// "https://www.youtube.com/watch?v=o9yWm0g6l4g",
// "https://www.youtube.com/watch?v=fVWAy3dFWpU",
// "https://www.youtube.com/watch?v=3rWuP8o0isA",
// "https://www.youtube.com/watch?v=VojertmZ-5U",
// "https://www.youtube.com/watch?v=SEitIMlnR70",
// "https://www.youtube.com/watch?v=UBKbeNEx4UA",
// "https://www.youtube.com/watch?v=HTCISm4x0fI",
// "https://www.youtube.com/watch?v=8KZe2IXcof4",
// "https://www.youtube.com/watch?v=a8gsaOrXu_Y",
// "https://www.youtube.com/watch?v=dKGgKGS2VCQ",
// "https://www.youtube.com/watch?v=U8lrvbEeLv4",
// "https://www.youtube.com/watch?v=yHz3lJq1Vu0",
// "https://www.youtube.com/watch?v=KhLensmQfEQ",
// "https://www.youtube.com/watch?v=8mWtfZtTLfg",
// "https://www.youtube.com/watch?v=HRmxMUpynLs",
// "https://www.youtube.com/watch?v=6SjsJPJtT9A",
// "https://www.youtube.com/watch?v=XJW27OgQSsE",
// "https://www.youtube.com/watch?v=lIxdasBrDMI",
// "https://www.youtube.com/watch?v=-cuVTq76PIk",
// "https://www.youtube.com/watch?v=qiFdtv9DfXk",
// "https://www.youtube.com/watch?v=eoiZ2qYtrWw",
// "https://www.youtube.com/watch?v=pTVkVhEtLKk",
// "https://www.youtube.com/watch?v=Fo5jKB2jbqE",
// "https://www.youtube.com/watch?v=x6LhkEhWYfE",
// "https://www.youtube.com/watch?v=SEitIMlnR70",
// "https://www.youtube.com/watch?v=MKS8Q7AslKo",
// "https://www.youtube.com/watch?v=rsxmVQp_EhQ",
// "https://www.youtube.com/watch?v=Q9orV-sH5GE",
// "https://www.youtube.com/watch?v=12sQyiGLc0k",
// "https://www.youtube.com/watch?v=Z4H-RqkpS9I",
// "https://www.youtube.com/watch?v=-W2v4phkLUo"
// ];
const adUrls = [
  "https://www.youtube.com/watch?v=Jd2GK0qDtRg",
  "https://www.youtube.com/watch?v=5BfQ4_H1CLk",
  "https://www.youtube.com/watch?v=wYmTkgqbrDM",
  "https://www.youtube.com/watch?v=G9TdA8d5aaU",
  "https://www.youtube.com/watch?v=5FWwQW1AyRM",
  "https://www.youtube.com/watch?v=dq09rg0W1CI",
  "https://www.youtube.com/watch?v=wbnaHgSttVo",
  "https://www.youtube.com/watch?v=WYP9AGtLvRg",
  "https://www.youtube.com/watch?v=GlrxcuEDyF8",
  "https://www.youtube.com/watch?v=3ZDFMSX1Cz8",
  "https://www.youtube.com/watch?v=K9vFWA1rnWc",
  "https://www.youtube.com/watch?v=ZUG9qYTJMsI",
  "https://www.youtube.com/watch?v=1-XO5qZT0rE",
  "https://www.youtube.com/watch?v=PqxtwrUDDlA",
  "https://www.youtube.com/watch?v=pR2UOSYgXmw",
  "https://www.youtube.com/watch?v=HbxWGjQ2szQ",
  "https://www.youtube.com/watch?v=vPIN1SWCsuE",
  "https://www.youtube.com/watch?v=COiDyubnYOw",
  "https://www.youtube.com/watch?v=HoRiJb6qOjY",
  "https://www.youtube.com/watch?v=z0aXK2SAw7Y",
  "https://www.youtube.com/watch?v=nyDnQQSUfL0",
  "https://www.youtube.com/watch?v=7CO6PJ6IWFI",
  "https://www.youtube.com/watch?v=QMinLipeN3g",
  "https://www.youtube.com/watch?v=G1Bl_cy0svM",
  "https://www.youtube.com/watch?v=uayMUv9pq7k",
  "https://www.youtube.com/watch?v=8cOKg6-EWO8",
  "https://www.youtube.com/watch?v=DoirrCfhjf0",
  "https://www.youtube.com/watch?v=GGSKpJGpyuo",
  "https://www.youtube.com/watch?v=lL2-mDAun8U",
  "https://www.youtube.com/watch?v=2YBtspm8j8M",
  "https://www.youtube.com/watch?v=fu0grHSeDk8",
  "https://www.youtube.com/watch?v=Frs__V2E104",
  "https://www.youtube.com/watch?v=G-6ATMhCqO0",
  "https://www.youtube.com/watch?v=qHVd0Z9Wjxs",
  "https://www.youtube.com/watch?v=AT6oSIDbGkw",
  "https://www.youtube.com/watch?v=sNJZq4GbNfY",
  "https://www.youtube.com/watch?v=HU5rU2sB6bw",
  "https://www.youtube.com/watch?v=RDQoYnGMqJA",
  "https://www.youtube.com/watch?v=cXvp_PNTcBY",
  "https://www.youtube.com/watch?v=Bs5rw-QeuEU",
  "https://www.youtube.com/watch?v=8hiFDpD-p98",
  "https://www.youtube.com/watch?v=2T6MmAa3OhQ",
  "https://www.youtube.com/watch?v=PU_vZ88wTvo",
  "https://www.youtube.com/watch?v=k1Hfow0puuY",
  "https://www.youtube.com/watch?v=2AUbG7FgPSg",
  "https://www.youtube.com/watch?v=P7kX06Htz04",
  "https://www.youtube.com/watch?v=gvM_MmAxP5I",
  "https://www.youtube.com/watch?v=i1o3pksqUrU",
  "https://www.youtube.com/watch?v=RYBwhasr4E4",
  "https://www.youtube.com/watch?v=oKHov1z8tZo",
  "https://www.youtube.com/watch?v=LSzVjL4eoFM",
  "https://www.youtube.com/watch?v=3Lt7-nQfN9o",
  "https://www.youtube.com/watch?v=fBLcrqAwjIM",
  "https://www.youtube.com/watch?v=t7iL7U2K4kQ",
  "https://www.youtube.com/watch?v=Y1v8RIymwmU",
  "https://www.youtube.com/watch?v=kZYRDVdKlVY",
  "https://www.youtube.com/watch?v=IcXD3BNOxwM",
  "https://www.youtube.com/watch?v=4pjqKvyv7-o",
  "https://www.youtube.com/watch?v=eS_4QhsU_uo",
  "https://www.youtube.com/watch?v=p3OjMgfqPt0",
  "https://www.youtube.com/watch?v=fW2F5AVhb7E",
  "https://www.youtube.com/watch?v=DYmzHsnWiCw",
  "https://www.youtube.com/watch?v=qRdH-jZV3LQ",
  "https://www.youtube.com/watch?v=bDygQwMObvo",
  "https://www.youtube.com/watch?v=TIJavTGyaDg",
  "https://www.youtube.com/watch?v=jds1QZrJq1Y",
  "https://www.youtube.com/watch?v=kPmSyOlv5D4",
  "https://www.youtube.com/watch?v=Tzetq32VO_g",
  "https://www.youtube.com/watch?v=c5NQw_uHE9o",
  "https://www.youtube.com/watch?v=1UV3ZF8OvOA",
  "https://www.youtube.com/watch?v=L9mm_z0vNvU",
  "https://www.youtube.com/watch?v=wURwfmNRJck",
  "https://www.youtube.com/watch?v=XJd65DXZHAg",
  "https://www.youtube.com/watch?v=UfXhL00ytD8",
  "https://www.youtube.com/watch?v=0gfPFL9K62o",
  "https://www.youtube.com/watch?v=J2A_v5qDPTQ",
  "https://www.youtube.com/watch?v=0afFKHWn9wQ",
  "https://www.youtube.com/watch?v=cHSZaGLbPZw",
  "https://www.youtube.com/watch?v=3mdn_ZSODYk",
  "https://www.youtube.com/watch?v=mEtvk4cA4rk",
  "https://www.youtube.com/watch?v=NBAWTwxKIQ0",
  "https://www.youtube.com/watch?v=LD8EraxaEe0",
  "https://www.youtube.com/watch?v=NCPMjYH_AD0",
  "https://www.youtube.com/watch?v=SsjmwJO4ba8",
  "https://www.youtube.com/watch?v=MDqaBc7Z1Ho",
  "https://www.youtube.com/watch?v=QdTZKxulaSE",
  "https://www.youtube.com/watch?v=Qa2a1iDqOFQ",
  "https://www.youtube.com/watch?v=rPBYfTkkNZE",
  "https://www.youtube.com/watch?v=Ye0CtcQHAnQ",
  "https://www.youtube.com/watch?v=qhiMrLUXE38",
  "https://www.youtube.com/watch?v=_oWKezAeQQY",
  "https://www.youtube.com/watch?v=dddvamyOQbY",
  "https://www.youtube.com/watch?v=Ph-VLCz88SE",
];

for (let _ = 0; _ < adUrls.length; ++_) {
  const videoUrl = adUrls[_];

  youtubedl(videoUrl, {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  })
    .then(output => {
      const { automatic_captions } = output;
      const url = automatic_captions["en-orig"][0]["url"];

      axios
        .get(url)
        .then(function (response) {
          const { events } = response.data;
          const { segs } = events;
          let videoSubs = "";

          for (let i = 0; i < events.length; ++i) {
            const { segs } = events[i];

            if (segs) {
              for (let j = 0; j < segs.length; ++j) {
                const { utf8 } = segs[j];
                // process.stdout.write(utf8);

                videoSubs += utf8;
              }
            }
          }

          const filename = videoUrl.split("?v=")[1] + ".txt";
          fs.writeFileSync(path.join("data", filename), videoSubs, err => {
            if (err) {
              console.error(err);
            }
          });
        })
        .catch(err => console.error(err));
    })
    .catch(err => {
      console.error(err);
    });
}
