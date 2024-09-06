/// This shader is inspired by evilryu https://www.shadertoy.com/view/MdXSWn

#version 330 core

uniform vec2 u_resolution;
uniform float u_time;

out vec4 FragColor;

float pixel_size; 


vec2 MundelBulbSDF(vec3 p) {
	p.xyz = p.xzy;
	vec3 z = p;
	float power = 8.0;
	float r, theta, phi;
	float dr = 1.0;
	float t0 = 1.0;

	for(int i = 0; i < 100; ++i) {
		r = length(z);
		if(r > 2.0) continue;
		theta = atan(z.y / z.x);
        phi = asin(z.z / r);
		
		dr = pow(r, power - 1.0) * dr * power + 1.0;
	
		r = pow(r, power);
		theta = theta * power;
		phi = phi * power;
		
		z = r * vec3(cos(theta)*cos(phi), sin(theta)*cos(phi), sin(phi)) + p;

        t0 = min(t0, r);
	}
	return vec2(0.5 * log(r) * r / dr,t0);
}
vec2 SceneSDF(vec3 p) {
    return MundelBulbSDF(p);
}

float SoftShadow(vec3 ro, vec3 rd, float k ){ 
    float akuma=1.0,h=0.0; 
    float t = 0.01;
    for(int i=0; i < 50; ++i){ 
        h=SceneSDF(ro+rd*t).x; 
        if(h<0.001)return 0.02; 
        akuma=min(akuma, k*h/t); 
 		t+=clamp(h,0.01,2.0); 
    } 
    return akuma; 
}

vec3 Normal(in vec3 pos) {
    vec3 eps = vec3(0.001, 0.0, 0.0);
    return normalize(vec3(
        SceneSDF(pos + eps.xyy).x - SceneSDF(pos - eps.xyy).x,
        SceneSDF(pos + eps.yxy).x - SceneSDF(pos - eps.yxy).x,
        SceneSDF(pos + eps.yyx).x - SceneSDF(pos - eps.yyx).x
    ));
}

//Intersection function 
vec2 intersect( in vec3 ro, in vec3 rd )
{
    float t = 0.0;
    float res_t = 0.0;
    vec2 c, res_c;
    float max_error = 1000.0;
	float d = 1.0;
    float pd = 100.0;
    float os = 0.0;
    float step = 0.0;
    float error = 1000.0;
    
    for( int i=0; i<600; i++ )
    {
        if( error < pixel_size*0.5 || t > 20.0 )
        {
        }
        else{  // avoid broken shader on windows
        
            c = SceneSDF(ro + rd*t);
            d = c.x;

            if(d > os)
            {
                os = 0.4 * d*d/pd;
                step = d + os;
                pd = d;
            }
            else
            {
                step =-os; os = 0.0; pd = 100.0; d = 1.0;
            }

            error = d / t;

            if(error < max_error) 
            {
                max_error = error;
                res_t = t;
                res_c = c;
            }
        
            t += step;
        }

    }
	if( t>20.0/* || max_error > pixel_size*/ ) res_t=-1.0;
    return vec2(res_t, res_c.y);
}

void main() {
    vec2 q=gl_FragCoord.xy/u_resolution.xy; 
    vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;

    pixel_size =  1.0 / u_resolution.y;
	// camera
 	float stime=0.8+0.3*sin(u_time*0.4); 
 	float ctime=0.8+0.3*cos(u_time*0.4); 

    float di = 2+0.4*cos(0.2+.29*u_time);
	vec3  ro = di*vec3( cos(0.2+.33*u_time), 1.2*sin(.37*u_time), sin(.31*u_time) );
	vec3  ta = vec3(0.0,0.1,0.0);


 	vec3 cf = normalize(ta-ro); 
    vec3 cs = normalize(cross(cf,vec3(0.0,1.0,0.0))); 
    vec3 cu = normalize(cross(cs,cf)); 
 	vec3 rd = normalize(uv.x*cs + uv.y*cu + 3.0*cf);  // transform from view to world



    vec3 col = vec3(0.5);
    
    vec3 sundir = normalize(vec3(0.1, 0.8, 0.6)); 
    vec3 sun = vec3(1.64, 1.27, 0.99); 
    vec3 skycolor = vec3(0.6, 1.5, 1.0); 

	vec3 bg = exp(uv.y-2.0)*vec3(0.4, 1.6, 1.0);

    float halo=clamp(dot(normalize(vec3(-ro.x, -ro.y, -ro.z)), rd), 0.0, 1.0); 
    col=bg+vec3(1.0,0.8,0.4)*pow(halo,17.0); 



    vec2 t = intersect(ro, rd);
    if (t.x > 0.0) {
            vec3 p = ro + t.x * rd;
           vec3 n=Normal(p); 
           float shadow = SoftShadow(p, sundir, 10.0 );

           float dif = max(0.0, dot(n, sundir)); 
           float sky = 0.6 + 0.4 * max(0.0, dot(n, vec3(0.0, 1.0, 0.0))); 
 		   float bac = max(0.3 + 0.7 * dot(vec3(-sundir.x, -1.0, -sundir.z), n), 0.0); 
           float spe = max(0.0, pow(clamp(dot(sundir, reflect(rd, n)), 0.0, 1.0), 10.0)); 

           vec3 lin = 4.5 * sun * dif * shadow; 
           lin += 0.8 * bac * sun; 
           lin += 0.6 * sky * skycolor*shadow; 
           lin += 3.0 * spe * shadow; 

		   vec3 tc0 = 0.5 + 0.5 * sin(3.0 + 4.2 * t.y + vec3(0.0, 0.5, 1.0));
           col = lin *vec3(0.9, 0.8, 0.6) *  0.2 * tc0;
 		   col=mix(col,bg, 1.0-exp(-0.001*t.x*t.x)); 
    }
    
    col=pow(clamp(col,0.0,1.0),vec3(0.45)); 
    col=col*0.6+0.4*col*col*(3.0-2.0*col);  // contrast
    col=mix(col, vec3(dot(col, vec3(0.33))), -0.5);  // satuation
    col*=0.5+0.5*pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),0.7);  // vigneting
    FragColor = vec4(col, 1.0);   
}
