#include "Window.h"

int Window::Width = 1080;
int Window::Height = 1080;

Window::Window()
{
	glfwInit();
	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    glfwWindowHint(GLFW_SAMPLES, 4);

    m_window = glfwCreateWindow(Width, Height, "MandelBulb", NULL, NULL);
    if (m_window == NULL)
    {
        std::cout << "Failed to create GLFW window" << std::endl;
        glfwTerminate();
    }
    glfwMakeContextCurrent(m_window);
    if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress))
    {
        std::cout << "Failed to initialize GLAD" << std::endl;
    }

    glViewport(0, 0, Width, Height);

    glfwSetFramebufferSizeCallback(m_window, [](GLFWwindow* window, int width, int height)
        {
            glViewport(0, 0, width, height);
            Width = width;
            Height = height;
        });

    glEnable(GL_MULTISAMPLE);
}

Window::~Window()
{
	glfwTerminate();
}

bool Window::ShouldClose()
{
	return glfwWindowShouldClose(m_window);
}

void Window::SwapBuffers()
{
    glfwSwapBuffers(m_window);
}

