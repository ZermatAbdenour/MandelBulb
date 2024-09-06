#pragma once
#include "Window.h"
#include "Shader.h"
#include "ScreenQuad.h"
#include "../ScreenRecorder.hpp"

class Renderer
{
public:
	Window* window;
	Renderer();
	~Renderer();
	void Render();
	bool record = false;
private:
	ScreenQuad* m_fullScreenQuad;
	ScreenRecorder* m_screenRecorder;
};