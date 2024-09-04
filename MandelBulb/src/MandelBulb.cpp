#include <iostream>
#include <glm/glm.hpp>
#include "Renderer/Renderer.h"
#include "Renderer/Util.h"
int main()
{
    Renderer rayMarcher = Renderer();
    rayMarcher.Render();
    return 0;
}