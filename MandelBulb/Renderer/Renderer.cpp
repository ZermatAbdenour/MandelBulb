#include "Renderer.h"

Renderer::Renderer()
{
	window = new Window();
}

Renderer::~Renderer()
{
}

void Renderer::Render()
{
	while (!window->ShouldClose()) {
		glClearColor(0.5f, 0.2f, 1, 1);
		glClear(GL_COLOR_BUFFER_BIT);
		//Render



		window->SwapBuffers();
		window->SwapBuffers();
		glfwPollEvents();
	}
}
