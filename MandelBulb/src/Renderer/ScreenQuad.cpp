#include "ScreenQuad.h"
#include "Glad/glad.h"

ScreenQuad::ScreenQuad()
{
	//Generate Buffers
	glGenVertexArrays(1, &VAO);
	glGenBuffers(1, &VBO);
	glGenBuffers(1, &EBO);

	//Init Buffers
	glBindVertexArray(VAO);
	glBindBuffer(GL_ARRAY_BUFFER,VBO);
	glBufferData(GL_ARRAY_BUFFER, sizeof(m_vertices), m_vertices, GL_STATIC_DRAW);

	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);
	glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(m_indices), m_indices, GL_STATIC_DRAW);
	glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
	glEnableVertexAttribArray(0);
	
	glBindBuffer(GL_ARRAY_BUFFER, 0); 

	glBindVertexArray(0);

}

ScreenQuad::~ScreenQuad()
{
	glDeleteVertexArrays(1, &VAO);
	glDeleteBuffers(1, &VBO);
	glDeleteBuffers(1, &EBO);
	delete m_screenShader;
}

void ScreenQuad::SetShader(Shader* shader)
{
	m_screenShader = shader;
}

void ScreenQuad::Draw()
{
	//Use the full screen shader
	m_screenShader->Use();
	//Use the Vertex Array Object to draw
	glBindVertexArray(VAO);
	//Draw the full screen quad
	glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);
}