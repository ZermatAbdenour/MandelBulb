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
	delete m_screenRecorder;
}


void Renderer::Render()
{

	
	// Initialize the screen recorder

	if (record)
		m_screenRecorder = new ScreenRecorder("out/newoutput_vid.mp4", Window::Width, Window::Height, 60);

	while (!window->ShouldClose()) {
		glClearColor(0.5f, 0.2f, 1, 1);
		glClear(GL_COLOR_BUFFER_BIT);

		//Render screen quad
		m_fullScreenQuad->Draw();
		if (record)
			m_screenRecorder->captureFrame();

		window->SwapBuffers();
		glfwPollEvents();
	}
}
