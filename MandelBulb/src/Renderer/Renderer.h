#pragma once
#include "Window.h"
#include "Shader.h"
class Renderer
{
public:
	Window* window;
	Shader* fullScreenShader;
	Renderer();
	~Renderer();
	void Render();
private:

};