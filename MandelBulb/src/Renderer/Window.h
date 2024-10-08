#pragma once
#include <Glad/glad.h>
#include <GLFW/glfw3.h>
#include <iostream>

class Window
{
public:
	char* Title;
	static int Width, Height;

	Window();
	~Window();
	bool ShouldClose();
	void SwapBuffers();
private:
	GLFWwindow* m_window;
};