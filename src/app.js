const express = require("express");
var app = express();
var path = require("path");
const fs = require("fs");
const hls = require("hls-server");

app.get("/", (req, res) => {
  // res.send(path.join(__dirname, "videos"));
  //   return res.status(200).sendFile(`${__dirname}/client.html`);
  req.params; // { userId: '42', bookId: '101' }

  const url = req.query.url;
  // res.send({
  //   url: url
  // });

  const ffmpeg = require("fluent-ffmpeg");
  const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
  const lastSegment = url.split("/").pop();
  const outpur_url = "public/videos" + lastSegment + ".m3u8";
  const fullUrl = req.protocol + "://" + req.get("host");

  ffmpeg.setFfmpegPath(ffmpegInstaller.path);

  ffmpeg(url, {
    timeout: 432000
  })
    .addOptions([
      "-profile:v baseline",
      "-level 3.0",
      "-start_number 0",
      "-hls_time 1",
      "-hls_list_size 0",
      "-f hls"
    ])
    .output(outpur_url)
    .on("end", () => {
      console.log("end");
      res.send({
        // url_out: fullUrl + "" + outpur_url,
        test: path.join(__dirname, "public/videos")
      });
    })
    .run();
});

const server = app.listen(3000);
app.use(express.static("/public"));

// new hls(server, {
//     provider: {
//         exists: (req, cb) => {
//             const ext = req.url.split('.').pop();

//             if (ext !== 'm3u8' && ext !== 'ts') {
//                 return cb(null, true);
//             }

//             fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
//                 if (err) {
//                     console.log('File not exist');
//                     return cb(null, false);
//                 }
//                 cb(null, true);
//             });
//         },
//         getManifestStream: (req, cb) => {
//             const stream = fs.createReadStream(__dirname + req.url);
//             cb(null, stream);
//         },
//         getSegmentStream: (req, cb) => {
//             const stream = fs.createReadStream(__dirname + req.url);
//             cb(null, stream);
//         }
//     }
// });
