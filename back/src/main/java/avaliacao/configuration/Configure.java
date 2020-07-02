package avaliacao.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class Configure implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(final CorsRegistry registry) {
//		registry.addMapping("/**")
//		.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT");
//	
        registry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "DELETE")
        .allowedOrigins("*")
        .allowedHeaders("*");
	
	}
}