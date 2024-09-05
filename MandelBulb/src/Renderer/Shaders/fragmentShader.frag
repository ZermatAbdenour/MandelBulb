#version 330 core

uniform vec2 u_resolution;

out vec4 FragColor;

const float EPSILON = 1e-5;
const vec3 LightPos = vec3(2.0, -5.0, 3.0);
const vec3 cameraPosition = vec3(0.0, 0.0, -5.0);

float SphereSDF(in vec3 p, in vec3 c, float r)
{
	return length(p - c) - r;
}

float SceneSDF(in vec3 p)
{
    float sphere = SphereSDF(p, vec3(0.0), 1.0);
    return sphere;
}

vec3 CalculateNormal(in vec3 p){
    const vec2 eps = vec2(EPSILON, 0.0);
    return normalize(vec3(
        SceneSDF(p + eps.xyy) - SceneSDF(p - eps.xyy),
        SceneSDF(p + eps.yxy) - SceneSDF(p - eps.yxy),
        SceneSDF(p + eps.yyx) - SceneSDF(p - eps.yyx)
    ));
}

vec3 RayMarch(in vec3 ro, in vec3 rd){
    const int StepsNumber = 32;
    const float MinHitDistance = 0.001f;
    const float MaxTraceDistance = 1000.0f;
    
    float traveledDistance = 0.0f;

    for(int i = 0; i < StepsNumber; i++){
        //Calculate current position from ray origin and direction * traveled distance
        vec3 currentPos = ro + rd * traveledDistance;

        //Calculate distance to closest object
        float dist = SceneSDF(currentPos);

        //return Color if distance is less than minimum hit distance Means the ray is hitting something
        if(dist < MinHitDistance)
        {
            vec3 norm = CalculateNormal(currentPos);

            // Calculate the unit direction vector that points from
            // the point of intersection to the light source
            vec3 LightDir = normalize(currentPos - LightPos);

            float Diffuse = max(0.0, dot(norm, LightDir));

            return vec3(1.0, 0.0, 0.0) * Diffuse;
        }

        //Break if traveled distance is greater than max trace distance Means the ray is not hitting anything
        if(traveledDistance > MaxTraceDistance)
        {
            break;
        }

        traveledDistance += dist;
    }

    //The ray doesn't hit anything so we return black
    return vec3(0.0);
}


void main()
{
    vec2 normalizedUv = gl_FragCoord.xy / u_resolution;
    vec2 uv = normalizedUv.st * 2.0 - 1.0;

    vec3 ro = cameraPosition;
    vec3 rd = vec3(uv, 1.0);

    vec3 shadedColor = RayMarch(ro, rd);

    FragColor = vec4(shadedColor, 1.0);
}