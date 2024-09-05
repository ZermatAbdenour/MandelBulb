#version 330 core

uniform vec2 u_resolution;

out vec4 FragColor;

const float EPSILON = 1e-5;
const vec3 LightPos = vec3(2.0, -5.0, 3.0);
const vec3 cameraPosition = vec3(0.0, 0.0, -2.0);

float SphereSDF(in vec3 p, in vec3 c, float r)
{
	return length(p - c) - r;
}

// Mandelbulb distance function
float MandelBulbSDF(vec3 p) {
	p.xyz = p.xzy;
	vec3 z = p;
	float power = 8.0;
	float r = 0.0;
	float dr = 1.0;
	
	for(int i = 0; i < 7; ++i) {
		r = length(z);
		if (r > 2.0) break;

		float theta = atan(z.y, z.x);
		float phi = asin(z.z / r);
		
		dr = pow(r, power - 1.0) * dr * power + 1.0;

		r = pow(r, power);
		theta *= power;
		phi *= power;

		z = r * vec3(cos(theta) * cos(phi), sin(theta) * cos(phi), sin(phi)) + p;
	}
	return 0.5 * log(r) * r / dr;
}

// SceneSDF now includes both spheres and the Mandelbulb
float SceneSDF(in vec3 p)
{
    float mandelbulb = MandelBulbSDF(p);  // Mandelbulb distance

    // Return the minimum distance to the Mandelbulb or spheres
    return mandelbulb;
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
    const int StepsNumber = 64;  // Increase steps for Mandelbulb detail
    const float MinHitDistance = 0.001f;
    const float MaxTraceDistance = 1000.0f;
    
    float traveledDistance = 0.0f;

    for(int i = 0; i < StepsNumber; i++){
        // Calculate current position from ray origin and direction * traveled distance
        vec3 currentPos = ro + rd * traveledDistance;

        // Calculate distance to closest object
        float dist = SceneSDF(currentPos);

        // Return color if distance is less than minimum hit distance
        if(dist < MinHitDistance)
        {
            vec3 norm = CalculateNormal(currentPos);

            // Calculate the light direction
            vec3 LightDir = normalize(currentPos - LightPos);

            // Diffuse lighting
            float Diffuse = max(0.0, dot(norm, LightDir));

            // Mandelbulb color
            return vec3(0.2, 0.8, 1.0) * Diffuse;
        }

        // Break if traveled distance is greater than max trace distance
        if(traveledDistance > MaxTraceDistance)
        {
            break;
        }

        // Increment the traveled distance
        traveledDistance += dist;
    }

    // Return black if the ray hits nothing
    return vec3(0.0);
}

void main()
{
    vec2 normalizedUv = gl_FragCoord.xy / u_resolution;
    vec2 uv = normalizedUv.st * 2.0 - 1.0;

    vec3 ro = cameraPosition;
    vec3 rd = normalize(vec3(uv, 1.0));

    vec3 shadedColor = RayMarch(ro, rd);

    FragColor = vec4(shadedColor, 1.0);
}
