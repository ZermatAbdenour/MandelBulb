#pragma once
#include "Shader.h"

class ScreenQuad {
public:
	ScreenQuad();
	~ScreenQuad();

    /// <summary>
    /// Draw the full screen quad
    /// </summary>
    void Draw();

    /// <summary>
    /// Set the full screen shader
    /// </summary>
    /// <param name="shader"></param>
    void SetShader(Shader* shader);
private:
    //Vertex buffer Object, Index Buffer Object ,Vertex Array Object
	unsigned int VBO,EBO,VAO;
    //Full Screen Shader
    Shader* m_screenShader;

    float m_vertices[4*3] = {
     1.0f,  1.0f, 0.0f,  // top right
     1.0f, -1.0f, 0.0f,  // bottom right
    -1.0f, -1.0f, 0.0f,  // bottom left
    -1.0f,  1.0f, 0.0f   // top left 
    };
    unsigned int m_indices[3*2] = {
        0, 1, 3,  // first Triangle
        1, 2, 3   // second Triangle
    };
};