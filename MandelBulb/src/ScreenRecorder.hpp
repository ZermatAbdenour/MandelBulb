#include <Glad/glad.h>
#include <GLFW/glfw3.h>
#include <iostream>
#include <vector>
#include <fstream>
#include <cstdio> // For _popen, _pclose on Windows
#include <string>

class ScreenRecorder {
public:
    ScreenRecorder(const std::string& filename, int width, int height, int fps)
        : width(width), height(height), fps(fps) {
        int result = system("ffmpeg -version");
        if (result != 0) {
            std::cout << "FFmpeg is not installed or not in the system PATH." << std::endl;
            return;
        }


        const std::string ffmpegCommand = "ffmpeg -y -f rawvideo -pix_fmt bgr24 -s "
            + std::to_string(width) + "x" + std::to_string(height)
            + " -r " + std::to_string(fps)
            + " -i - -vf vflip -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p "
            + filename;
        ffmpegPipe = _popen(ffmpegCommand.c_str(), "wb");

        if (!ffmpegPipe) {
            std::cerr << "Failed to open FFmpeg pipe!" << std::endl;
        }

        // Set the alignment to 1 byte to avoid issues
        glPixelStorei(GL_PACK_ALIGNMENT, 1);
    }

    ~ScreenRecorder() {
        if (ffmpegPipe) {
            _pclose(ffmpegPipe);
        }
    }

    void captureFrame() {
        std::vector<unsigned char> pixels(3 * width * height);

        // Capture the framebuffer using GL_BGR to avoid color channel issues
        glReadPixels(0, 0, width, height, GL_BGR, GL_UNSIGNED_BYTE, pixels.data());

        // Write the pixel data to the FFmpeg pipe
        fwrite(reinterpret_cast<const char*>(pixels.data()), sizeof(unsigned char), pixels.size(), ffmpegPipe);
    }

private:
    FILE* ffmpegPipe;
    int width;
    int height;
    int fps;

};
