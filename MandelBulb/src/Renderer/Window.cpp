#include "Window.h"

void framebuffer_size_callback(GLFWwindow* window, int width, int height)
{
    glViewport(0, 0, width, height);
}

Window::Window()
{
	glfwInit();
	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

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

    glfwSetFramebufferSizeCallback(m_window, framebuffer_size_callback);
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