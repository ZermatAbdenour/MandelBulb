#pragma once
#include <Glad/glad.h>
#include <GLFW/glfw3.h>
#include <iostream>

class Window
{
public:
	char* Title;
	int Width = 1000, Height=800;

	Window();
	~Window();
	bool ShouldClose();
	void SwapBuffers();
private:
	GLFWwindow* m_window;
};