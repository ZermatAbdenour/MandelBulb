# MandelBulb

This project is a recreation of the 2009 Mandelbulb using C++ and OpenGL.

## Description

The Mandelbulb is a three-dimensional fractal that was discovered in 2009. This project aims to recreate the Mandelbulb using modern programming techniques and graphics rendering with the help of C++ and OpenGL.
The project also utilizes a GPU ray marcher using the sphere tracing technique. This technique allows for efficient rendering of the Mandelbulb fractal by tracing rays through the 3D space and marching along the ray until it intersects with the fractal surface. This GPU-based approach leverages the parallel processing power of modern graphics cards to achieve real-time rendering of the Mandelbulb.


## Features

- Real-time rendering of the Mandelbulb fractal.
- Interactive camera controls for exploring the fractal.
- Screen recorder functionality to capture the rendered fractal as a video.
- Requires FFmpeg to enable the screen recorder.
- To enable the screen recorder, set the `record` boolean in the renderer to `true`.

## Prerequisites

If you want to record your rendered MandelBulb. You need to have:
- FFmpeg (for screen recording)

To download FFmpeg, follow these steps:

1. Visit the FFmpeg website at [https://ffmpeg.org/](https://ffmpeg.org/).
2. Navigate to the "Download" section of the website.
3. Choose the appropriate version of FFmpeg for your operating system.
4. Download the FFmpeg binary or installer package.
5. Once the download is complete, install FFmpeg by following the installation instructions provided for your operating system.
6. After installation, make sure to add FFmpeg to your system's PATH environment variable, so that it can be accessed from the command line.

Once FFmpeg is installed and added to your system's PATH, you will be able to enable the screen recorder functionality in the MandelBulb project.

## Usage

1. Clone this repository to your local machine.
2. Open the `MandelBulb.sln` solution file in Visual Studio (CMake comming soon).
3. Set the build configuration to `x64`.
4. Build the MandelBulb project.
5. Run the compiled executable.
5. To start recording, set the `record` boolean in the renderer to `true`(The record Start and Stop with the application).
## Contributing

Contributions are welcome! If you have any ideas or improvements for this project, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
