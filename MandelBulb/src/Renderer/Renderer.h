#pragma once
#include "Window.h"
#include "Shader.h"
#include "ScreenQuad.h"

class Renderer
{
public:
	Window* window;
	Renderer();
	~Renderer();
	void Render();
private:
	ScreenQuad* m_fullScreenQuad;

};