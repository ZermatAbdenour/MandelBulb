#include "Renderer.h"

Renderer::Renderer()
{
	window = new Window();

	m_fullScreenQuad = new ScreenQuad();
	
	Shader* fullScreenShader = new Shader("vertexShader.vert","fragmentShader.frag");

	m_fullScreenQuad->SetShader(fullScreenShader);
}

Renderer::~Renderer()
{
}

void Renderer::Render()
{
	while (!window->ShouldClose()) {
		glClearColor(0.5f, 0.2f, 1, 1);
		glClear(GL_COLOR_BUFFER_BIT);
		
		//Render screen quad
		m_fullScreenQuad->Draw();

		window->SwapBuffers();
		glfwPollEvents();
	}
}
