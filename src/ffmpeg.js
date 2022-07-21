const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

ffmpeg(
  "https://dev-lat-gatorade-umbrella.pepmx.com/co/wp-content/media/sites/2/2021/05/video-9_1.mp4",
  {
    timeout: 432000
  }
)
  .addOptions([
    "-profile:v baseline",
    "-level 3.0",
    "-start_number 0",
    "-hls_time 1",
    "-hls_list_size 0",
    "-f hls"
  ])
  .output("videos/test.m3u8")
  .on("end", () => {
    console.log("end");
  })
  .run();
